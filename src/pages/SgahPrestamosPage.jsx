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
import { LoanList } from '../components/loans';
import { LoanModal } from '../components/loans/LoanModal';

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

                {loans.length > 0 ? (
                    <LoanList />
                ) : (
                    <WithoutInfoAlert />
                )}

                {isShowLoader && <LoaderComponent />}
            </aside>



            {/* <FormNewPrestamo /> */}

            {/* <FormUpdatePrestamo /> */}
            <LoanModal />
        </>
    );
};
