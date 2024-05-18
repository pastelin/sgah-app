import { useEffect } from 'react';
import {
    useForm,
    usePrestamoUi,
    useSgahAhorroStore,
    useSgahPrestamoStore,
    usePrintMessage,
} from '../../../hooks';
import Swal from 'sweetalert2';
import { DetailSaldoParagraph } from '../paragraphs';

const formData = {
    saldoPrestado: '',
    descripcion: '',
};

export const FormNewPrestamo = () => {
    // A hook to access the redux store's state. This hook takes a selector function as an argument.
    // The selector is called with the store state.
    const { startSavingPrestamo } = useSgahPrestamoStore();

    const { startLoadingSaldoDisponibleA, saldoDisponibleA } =
        useSgahAhorroStore();

    const { styleDisplayNoneAdd, handleShowNewFormPrestamo } = usePrestamoUi();

    useEffect(() => {
        startLoadingSaldoDisponibleA();
    }, []);

    const { saldoPrestado, descripcion, onInputChange, onResetForm } =
        useForm(formData);

    const onSubmit = async (event) => {
        event.preventDefault();

        if (saldoPrestado > saldoDisponibleA) {
            Swal.fire('Validar monto ingresado', '', 'error');
            return;
        }

        const { code, message } = await startSavingPrestamo({
            saldoPrestado,
            descripcion,
        });

        usePrintMessage(code, message);

        if (code === 200) {
            handleShowNewFormPrestamo(false);
            onResetForm();
        }
    };

    return (
        <section
            className={`overlay flex-responsive-row center-x-y ${styleDisplayNoneAdd}`}
        >
            <div className="contenedor-form">
                <div className="text-end p-1" id="closeMenu">
                    <button
                        className="icon-close fz-2"
                        onClick={() => handleShowNewFormPrestamo(false)}
                    >
                        <i className="fa-regular fa-circle-xmark"></i>
                    </button>
                </div>
                <h3>¡Registrar Prestamo!</h3>

                <div className="contenedor-saldo text-center">
                    <DetailSaldoParagraph
                        label="Saldo máximo a tomar prestado"
                        saldo={saldoDisponibleA}
                    />
                </div>

                <form onSubmit={onSubmit}>
                    <div className="form__group">
                        <label htmlFor="montoPrestado">Monto:</label>
                        <input
                            type="number"
                            name="saldoPrestado"
                            id="saldoPrestado"
                            value={saldoPrestado}
                            onChange={onInputChange}
                            required
                        />
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
                            Guardar Prestamo
                        </button>
                    </div>
                </form>
            </div>
        </section>
    );
};
