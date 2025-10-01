import { useEffect } from 'react';
import { formatCurrency, useSgahAhorroStore, useSgahUi } from '../hooks';
import {
    BalanceDetail,
    LoaderComponent,
    SavingList,
    TableSgahAhorro,
    WithoutInfoAlert,
} from '../components';

export const SgahAhorrosPage = () => {
    const {
        startLoadingAhorros,
        startLoadingSaldoDisponibleA,
        saldoDisponibleA,
        ahorros,
    } = useSgahAhorroStore();

    const { isShowLoader } = useSgahUi();

    useEffect(() => {
        startLoadingAhorros();
    }, []);

    useEffect(() => {
        startLoadingSaldoDisponibleA();
    }, [ahorros]);

    return (
        <aside className="contenedor-aside">
            <h2>Detalle Ahorros</h2>

            <div className="contenedor-saldo text-center">
                <BalanceDetail label="Ahorros Acumulados" saldo={saldoDisponibleA} />
            </div>

            {ahorros.length > 0 ? <SavingList /> : <WithoutInfoAlert />}

            {isShowLoader && <LoaderComponent />}
        </aside>
    );
};
