import Swal from 'sweetalert2';
import {
    useForm,
    useSgahGastoStore,
    usePrintMessage,
    useGastoUi,
} from '../../../hooks';
import { DetailSaldoParagraph } from '../paragraphs';

const formData = {
    monto: '',
    cdGastoRecurrente: '',
    descripcion: '',
    cdTipoMovimiento: 2,
};

export const GastoForm = () => {
    const { categoriasGasto, saldoDisponibleG, startSavingGasto } =
        useSgahGastoStore();

    const { styleDisplayNone, handleShowFormGasto } = useGastoUi();

    const {
        monto,
        cdGastoRecurrente,
        descripcion,
        cdTipoMovimiento,
        onInputChange,
        onResetForm,
    } = useForm(formData);

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
            monto,
            cdGastoRecurrente,
            descripcion,
            cdTipoMovimiento,
        });

        usePrintMessage(code, message);

        if (code === 200) {
            onResetForm();
            handleShowFormGasto(false);
        }
    };

    return (
        <section
            className={`overlay flex-responsive-row center-x-y ${styleDisplayNone}`}
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
                            name="cdGastoRecurrente"
                            id="cdGastoRecurrente"
                            value={cdGastoRecurrente}
                            onChange={onInputChange}
                            required
                        >
                            <option value="">Seleccionar tipo de gasto</option>
                            {categoriasGasto.map(
                                ({ cdGasto, nbGasto, cdEstatus }) =>
                                    cdEstatus !== 2 && (
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
