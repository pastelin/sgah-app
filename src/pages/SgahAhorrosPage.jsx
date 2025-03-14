import { useEffect } from 'react';
import { formatCurrency, useSgahAhorroStore, useSgahUi } from '../hooks';
import {
    LoaderComponent,
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
        startLoadingSaldoDisponibleA();
    }, []);

    return (
        <aside className="contenedor-aside">
            <h2>Detalle Ahorros</h2>

            <div className="contenedor-saldo text-center">
                <p>
                    Saldo Disponible:{' '}
                    <span>{formatCurrency(saldoDisponibleA)}</span>
                </p>
            </div>

            {ahorros.length > 0 ? <TableSgahAhorro /> : <WithoutInfoAlert />}

            {isShowLoader && <LoaderComponent />}
        </aside>
    );
};
