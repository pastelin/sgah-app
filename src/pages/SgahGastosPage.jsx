import { useEffect } from 'react';
import { useSgahGastoStore, useSgahUi } from '../hooks';
import {
    LoaderComponent,
    WithoutInfoAlert,
    BalanceDetail,
    ExpenseModal,
    ExpenseList,
} from '../components';

export const SgahGastosPage = () => {
    const {
        balanceRemainingG,
        spentBalanceG,
        startLoadingExpensesByCurrentMonth,
        startLoadingExpenseBalance,
        expenses,
    } = useSgahGastoStore();

    const { isShowLoader } = useSgahUi();

    useEffect(() => {
        startLoadingExpensesByCurrentMonth();
    }, []);

    useEffect(() => {
        startLoadingExpenseBalance();
    }, [expenses]);

    return (
        <>
            <aside className="contenedor-aside">
                <h2>Detalle Gastos</h2>

                <div className="contenedor-saldo flex-responsive-row justify-sa">
                    <BalanceDetail
                        label="Saldo Disponible"
                        balance={balanceRemainingG}
                    />
                    <BalanceDetail
                        label="Saldo Gastado"
                        balance={spentBalanceG}
                    />
                </div>

                {expenses.length > 0 ? <ExpenseList /> : <WithoutInfoAlert />}

                {isShowLoader && <LoaderComponent />}
            </aside>

            <ExpenseModal />
        </>
    );
};
