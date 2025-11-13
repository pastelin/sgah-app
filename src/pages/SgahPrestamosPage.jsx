import { useEffect } from 'react';
import { useSgahPrestamoStore, usePrestamoUi, useSgahUi } from '../hooks';
import {
    BalanceDetail,
    FormNewPrestamo,
    FormUpdatePrestamo,
    LoaderComponent,
    TableSgahPrestamo,
    WithoutInfoAlert,
} from '../components'; 

export const SgahPrestamosPage = () => {
    const { handleShowNewFormPrestamo } = usePrestamoUi();

    const { isShowLoader } = useSgahUi();

    const {
        totalLoanDebt,
        loadTotalLoanDebt,
        loadActiveLoans,
        loans,
    } = useSgahPrestamoStore();

    useEffect(() => {
        loadTotalLoanDebt();
        loadActiveLoans();
    }, []);

    return (
        <>
            <aside className="contenedor-aside">
                <h2>Detalle Prestamos</h2>

                <div className="contenedor-saldo text-center">
                    <BalanceDetail
                        label="Deuda Actual"
                        balance={totalLoanDebt}
                    />
                </div>

                <div className="text-center mt-2">
                    <button
                        className="btn btn-submit btn-xl"
                        onClick={() => handleShowNewFormPrestamo(true)}
                    >
                        Agregar Prestamo
                    </button>
                </div>

                {loans.length > 0 ? (
                    <TableSgahPrestamo />
                ) : (
                    <WithoutInfoAlert />
                )}

                {isShowLoader && <LoaderComponent />}
            </aside>

            <FormNewPrestamo />

            <FormUpdatePrestamo />
        </>
    );
};
