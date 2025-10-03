import { useEffect, useMemo, useState } from 'react';
import DatePicker from 'react-date-picker';
import { useForm, useSgahAhorroStore } from '../../hooks';
import { toast } from 'react-toastify';

const formData = {
    cdGasto: '',
    descripcion: '',
    fechaCreacion: new Date(),
};

export const SavingForm = () => {
    const [error, setError] = useState('');
    const { editingSavingId, ahorros, startUpdatingSaving, closeSavingModal } =
        useSgahAhorroStore();

    const currentSaving = useMemo(() => {
        return ahorros.find((ahorro) => ahorro.id === editingSavingId);
    }, [editingSavingId, ahorros]);

    const {
        formState,
        monto,
        descripcion,
        fechaCreacion,
        onInputChange,
        onResetForm,
    } = useForm(
        formData,
        currentSaving && {
            monto: currentSaving.monto,
            descripcion: currentSaving.descripcion,
            fechaCreacion: new Date(currentSaving.fechaCreacion),
        }
    );

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (Object.values(formState).includes('')) {
            setError('Todos los campos son obligatorios');
            return;
        }

		console.log({ currentSaving });
        if (currentSaving) {
            const { code, message } = await startUpdatingSaving({
                ...currentSaving,
                monto,
                descripcion,
                fechaCreacion,
            });

			console.log({ code, message });

            printMessage(code, message);
        }
    };

    const printMessage = (code, message) => {
        if (code === 200 || code === 201) {
            onResetForm();
            closeSavingModal(false);
            toast.success(message);
        } else {
            toast.error(message);
        }
    };

    return (
        <form className="space-y-5" onSubmit={handleSubmit}>
            <legend className="uppercase text-center text-2xl font-black border-b-4 border-blue-500 py-2 opacity-60">
                Editar Ahorro
            </legend>

            {error && <ErrorMessage>{error}</ErrorMessage>}

            <div className="flex flex-col gap-2">
                <label
                    htmlFor="amount"
                    className="text-xl font-medium opacity-80"
                >
                    Monto:
                </label>
                <input
                    type="text"
                    id="monto"
                    placeholder="Añade el monto del ahorro: ej. 300"
                    className="bg-slate-50 p-2"
                    name="monto"
                    value={monto}
                    onChange={onInputChange}
                />
            </div>

            <div className="flex flex-col gap-2">
                <label
                    htmlFor="descripcion"
                    className="text-xl font-medium opacity-80"
                >
                    Descripción:
                </label>
                <textarea
                    name="descripcion"
                    id="descripcion"
                    className="bg-slate-50 p-2"
                    placeholder='Añade el detalle del ahorro: ej. "Compra de insumos"'
                    value={descripcion}
                    onChange={onInputChange}
                ></textarea>
            </div>

            <div className="flex flex-col gap-2">
                <label
                    htmlFor="fechaCreacion"
                    className="text-xl font-medium opacity-80"
                >
                    Fecha:
                </label>
                <DatePicker
                    className="bg-slate-50 p-2"
                    value={fechaCreacion}
                    onChange={(value) =>
                        onInputChange({
                            target: { name: 'fechaCreacion', value },
                        })
                    }
                />
            </div>

            <input
                type="submit"
                className="bg-blue cursos-pointer w-full p-2 text-white uppercase font-bold rounded-lg hover:bg-blue-700 hover:opacity-90 tracking-wider"
                value="Guardar Cambios"
            />
        </form>
    );
};
