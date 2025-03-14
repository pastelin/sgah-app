import { useEffect } from 'react';
import { useSgahInversionStore, useSgahUi } from '../hooks';
import {
    FormNewInversion,
    TableSgahInversion,
    FormUpdateInversion,
    LoaderComponent,
    WithoutInfoAlert,
    BalanceDetail,
} from '../components';
import { useInversionUi } from '../hooks/ui/useInversionUi';

export const SgahInversionPage = () => {
    const {
        saldoInvertido,
        startLoadingSaldoInvertido,
        startLoadingInversiones,
        inversiones,
    } = useSgahInversionStore();

    const { isShowLoader } = useSgahUi();

    const { handleShowNewFormInversion } = useInversionUi();

    useEffect(() => {
        startLoadingSaldoInvertido();
        startLoadingInversiones();
    }, []);

    return (
        <>
            <aside className="contenedor-aside">
                <h2>Detalle Inversión</h2>

                <div className="contenedor-saldo text-center">
                    <BalanceDetail
                        label="Saldo Invertido"
                        saldo={saldoInvertido}
                    />
                </div>

                <div className="text-center mt-2">
                    <button
                        className="btn btn-submit btn-xl"
                        onClick={() => handleShowNewFormInversion(true)}
                    >
                        Agregar Inversión
                    </button>
                </div>

                {inversiones.length > 0 ? (
                    <TableSgahInversion />
                ) : (
                    <WithoutInfoAlert />
                )}

                {isShowLoader && <LoaderComponent />}
            </aside>

            <FormNewInversion />
            <FormUpdateInversion />
        </>
    );
};
