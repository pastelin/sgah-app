import Swal from 'sweetalert2';
import { useForm, useSgahGastoStore, usePrintMessage } from '../../hooks';
import { useEffect, useMemo, useState } from 'react';
import { BalanceDetail } from '../BalanceDetail';
import DatePicker from 'react-date-picker';
import 'react-calendar/dist/Calendar.css';
import 'react-date-picker/dist/DatePicker.css';
import { ErrorMessage } from '../alerts';
import { formatAdjustDate } from '../../helpers';

const formData = {
    amount: '',
    cdGasto: '',
    descripcion: '',
    creationDate: new Date(),
};

export const ExpenseForm = () => {
    const [error, setError] = useState('');
    const { currentEditingId, expenses } = useSgahGastoStore();

    const {
        recurringExpenses,
        balanceRemainingG,
        startSavingExpense,
        startUpdatingExpense,
        startLoadingRecurringExpenses,
    } = useSgahGastoStore();

    useEffect(() => {
        if (recurringExpenses.length === 0) {
            startLoadingRecurringExpenses();
        }
    }, []);

    const currentExpense = useMemo(
        () => expenses.find((expense) => expense.id === currentEditingId),
        [currentEditingId, expenses]
    );

    const updatedBalanceRemaining = useMemo(
        () =>
            currentExpense
                ? balanceRemainingG + currentExpense?.amount
                : balanceRemainingG,
        [currentExpense, balanceRemainingG]
    );

    const { closeExpenseModal } = useSgahGastoStore();

    const {
        formState,
        amount,
        cdGasto,
        descripcion,
        creationDate,
        onInputChange,
        onResetForm,
    } = useForm(
        formData,
        currentExpense && {
            amount: currentExpense?.amount,
            cdGasto: currentExpense?.gastoRecurrente.cdGasto,
            descripcion: currentExpense?.descripcion,
            creationDate: formatAdjustDate(
                new Date(currentExpense?.creationDate)
            ),
        }
    );

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (Object.values(formState).some((value) => !value)) {
            setError('Todos los campos son obligatorios');
            return;
        }

        if (updatedBalanceRemaining - amount < 0) {
            Swal.fire(
                'El monto ingresado no debe superar el saldo disponible',
                '',
                'error'
            );
            return;
        }

        if (currentExpense) {
            const { code, message } = await startUpdatingExpense({
                ...currentExpense,
                amount: +amount,
                gastoRecurrente: {
                    ...currentExpense.gastoRecurrente,
                    cdGasto: cdGasto,
                },
                descripcion,
                creationDate: creationDate,
            });

            printMessage(code, message);
        } else {
            const { code, message } = await startSavingExpense({
                ...formState,
                amount: +amount,
                gastoRecurrente: {
                    cdGasto: cdGasto,
                },
                origenMovimiento: {
                    id: 2,
                },
                creationDate: creationDate,
            });

            printMessage(code, message);
        }
    };

    const printMessage = (code, message) => {
        usePrintMessage(code, message);

        if (code === 200) {
            onResetForm();
            closeExpenseModal(false);
        }
    };

    return (
        <form className="space-y-5" onSubmit={handleSubmit}>
            <legend className="uppercase text-center text-2xl font-black border-b-4 border-blue-500 py-2 opacity-60">
                {currentEditingId ? 'Editar Gasto' : 'Agregar Gasto'}
            </legend>

            <div>
                <BalanceDetail
                    label="Saldo Disponible"
                    saldo={updatedBalanceRemaining}
                />
            </div>

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
                    id="amount"
                    placeholder="Añade el monto del gasto: ej. 300"
                    className="bg-slate-50 p-2"
                    name="amount"
                    value={amount}
                    onChange={onInputChange}
                />
            </div>

            <div className="flex flex-col gap-2">
                <label
                    htmlFor="cdGasto"
                    className="text-xl font-medium opacity-80"
                >
                    Categoría:
                </label>

                <select
                    name="cdGasto"
                    id="cdGasto"
                    className="bg-slate-50 p-2"
                    value={cdGasto}
                    onChange={onInputChange}
                >
                    <option value="">-- Seleccione --</option>
                    {recurringExpenses.map(({ cdGasto, nbGasto }) => (
                        <option
                            key={
                                window.crypto.getRandomValues(
                                    new Uint32Array(1)
                                )[0]
                            }
                            value={cdGasto}
                        >
                            {nbGasto}
                        </option>
                    ))}
                </select>
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
                    placeholder='Añade el detalle del gasto: ej. "Compra de insumos"'
                    value={descripcion}
                    onChange={onInputChange}
                ></textarea>
            </div>

            <div className="flex flex-col gap-2">
                <label
                    htmlFor="creationDate"
                    className="text-xl font-medium opacity-80"
                >
                    Fecha:
                </label>
                <DatePicker
                    className="bg-slate-50 p-2"
                    value={creationDate}
                    onChange={(value) =>
                        onInputChange({
                            target: { name: 'creationDate', value },
                        })
                    }
                />
            </div>

            <input
                type="submit"
                className="bg-blue cursos-pointer w-full p-2 text-white uppercase font-bold rounded-lg hover:bg-blue-700 hover:opacity-90 tracking-wider"
                value={currentEditingId ? 'Guardar Cambios' : 'Registrar Gasto'}
            />
        </form>
    );
};
