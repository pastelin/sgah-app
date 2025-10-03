import { useEffect } from 'react';
import { useSgahAhorroStore, useSgahUi } from '../hooks';
import {
    BalanceDetail,
    LoaderComponent,
    SavingList,
    SavingModal,
    WithoutInfoAlert,
} from '../components';

export const SgahAhorrosPage = () => {
    const {
        startLoadingSavings,
        startLoadingAvailableBalance,
        availableBalance,
        savings,
    } = useSgahAhorroStore();

    const { isShowLoader } = useSgahUi();

    useEffect(() => {
        startLoadingSavings();
    }, []);

    useEffect(() => {
        startLoadingAvailableBalance();
    }, [savings]);

    return (
        <>
            <aside className="contenedor-aside">
                <h2>Detalle Ahorros</h2>

                <div className="contenedor-saldo text-center">
                    <BalanceDetail
                        label="Ahorros Acumulados"
                        saldo={availableBalance}
                    />
                </div>

                {savings.length > 0 ? <SavingList /> : <WithoutInfoAlert />}

                {isShowLoader && <LoaderComponent />}
            </aside>

            <SavingModal />
        </>
    );
};
