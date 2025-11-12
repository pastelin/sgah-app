import { useEffect, useState } from 'react';
import {
    useForm,
    usePrestamoUi,
    useSgahPrestamoStore,
    useToastMessage,
} from '../../hooks';
import Swal from 'sweetalert2';
import { BalanceDetail } from '../BalanceDetail';

export const FormUpdatePrestamo = () => {
    const {
        loan,
        startUpdatingPrestamo,
        balanceRemainingG,
        startLoadingExpenseBalance,
    } = useSgahPrestamoStore();

    const [newMontoPagado, setNewMontoPagado] = useState('');

    useEffect(() => {
        startLoadingExpenseBalance();
    }, []);

    const { styleForUpdateForm, handleShowUpdateFormPrestamo } =
        usePrestamoUi();

    const {
        folio,
        saldoPrestado,
        fechaCreacion,
        saldoPagado,
        descripcion,
        onInputChange,
        onResetForm,
    } = useForm(loan);

    const onSubmit = async (event) => {
        event.preventDefault();

        const montoLiquidar = saldoPrestado - saldoPagado;
        if (newMontoPagado > montoLiquidar) {
            Swal.fire(
                'El monto no debe ser mayor a la deuda actual',
                '',
                'error'
            );
            return;
        }

        if (newMontoPagado > balanceRemainingG) {
            Swal.fire(
                'El monto no debe ser mayor al saldo disponible',
                '',
                'error'
            );
            return;
        }

        const { code, message } = await startUpdatingPrestamo({
            folio,
            saldoPrestado,
            descripcion,
            fechaCreacion,
            saldoPagado: newMontoPagado,
            origenMovimiento: loan.origenMovimiento,
        });

        useToastMessage(code, message);

        if (code === 200) {
            handleShowUpdateFormPrestamo(false);
            onResetForm();
            setNewMontoPagado('');
        }
    };

    return (
        <section
            className={`overlay flex-responsive-row center-x-y ${styleForUpdateForm}`}
            id="formularioUpdatePrestamo"
        >
            <div className="contenedor-form">
                <div className="text-end p-1" id="closeMenu">
                    <button
                        className="icon-close fz-2"
                        onClick={() => handleShowUpdateFormPrestamo(false)}
                    >
                        <i className="fa-regular fa-circle-xmark"></i>
                    </button>
                </div>
                <h3>¡Actualizar Prestamo!</h3>

                <div className="contenedor-saldo text-center">
                    <BalanceDetail
                        label="Deuda Actual"
                        balance={saldoPrestado - saldoPagado}
                    />

                    <BalanceDetail
                        label="Saldo disponible"
                        balance={balanceRemainingG}
                    />
                </div>
                <form className="mt-2" onSubmit={onSubmit}>
                    <div className="form__group">
                        <label htmlFor="newMontoPagado">Monto:</label>
                        <input
                            type="number"
                            name="newMontoPagado"
                            id="newMontoPagado"
                            value={newMontoPagado}
                            onChange={(e) => setNewMontoPagado(e.target.value)}
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
                            Actualizar Prestamo
                        </button>
                    </div>
                </form>
            </div>
        </section>
    );
};
