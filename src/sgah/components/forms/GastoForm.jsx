import Swal from 'sweetalert2';
import {
    useForm,
    useSgahGastoStore,
    usePrintMessage,
    useGastoUi,
} from '../../../hooks';
import { DetailSaldoParagraph } from '../paragraphs';
import { useEffect } from 'react';

const formData = {
    monto: '',
    cdGasto: '',
    descripcion: '',
};

export const GastoForm = () => {
    const {
        gastosRecurrentes,
        saldoDisponibleG,
        startSavingGasto,
        startLoadingGastosRecurrentes,
    } = useSgahGastoStore();

    useEffect(() => {
        if (gastosRecurrentes.length === 0) {
            startLoadingGastosRecurrentes();
        }
    }, []);

    const { styleForNewForm, handleShowFormGasto } = useGastoUi();

    const { monto, cdGasto, descripcion, onInputChange, onResetForm } =
        useForm(formData);

    const onSubmit = async (event) => {
        event.preventDefault();

        if (saldoDisponibleG - monto < 0) {
            Swal.fire(
                'El monto ingresado no debe superar el saldo disponible',
                '',
                'error'
            );
            return;
        }

        const { code, message } = await startSavingGasto({
            monto: parseInt(monto),
            gastoRecurrente: {
                cdGasto,
            },
            descripcion,
            origenMovimiento: {
                id: 2,
            },
        });

        usePrintMessage(code, message);

        if (code === 200) {
            onResetForm();
            handleShowFormGasto(false);
        }
    };

    return (
        <section
            className={`overlay flex-responsive-row center-x-y ${styleForNewForm}`}
        >
            <div className="contenedor-form">
                <div className="text-end p-1">
                    <button
                        className="icon-close fz-2"
                        onClick={() => handleShowFormGasto(false)}
                        id="closeForm"
                    >
                        <i className="fa-regular fa-circle-xmark"></i>
                    </button>
                </div>

                <h3>¡Registrar Gasto!</h3>

                <div className="contenedor-saldo flex-responsive-row justify-center">
                    <DetailSaldoParagraph
                        label="Saldo máximo a gastar"
                        saldo={saldoDisponibleG}
                    />
                </div>

                <form className="mt-2" onSubmit={onSubmit}>
                    <div className="form__group">
                        <label htmlFor="monto">Monto:</label>
                        <input
                            type="number"
                            name="monto"
                            id="monto"
                            value={monto}
                            onChange={onInputChange}
                            required
                        />
                    </div>

                    <div className="form__group">
                        <select
                            name="cdGasto"
                            id="cdGasto"
                            value={cdGasto}
                            onChange={onInputChange}
                            required
                        >
                            <option value="">Seleccionar tipo de gasto</option>
                            {gastosRecurrentes.map(
                                ({ cdGasto, nbGasto }) => (
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
                                )
                            )}
                        </select>
                    </div>

                    <div className="form__group">
                        <label htmlFor="descripcion">Descripción:</label>
                        <textarea
                            name="descripcion"
                            id="descripcion"
                            value={descripcion}
                            onChange={onInputChange}
                            required
                        ></textarea>
                    </div>

                    <div className="text-center my-2">
                        <button className="btn btn-submit" type="submit">
                            Guardar Gasto
                        </button>
                    </div>
                </form>
            </div>
        </section>
    );
};
