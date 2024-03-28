import { useEffect } from 'react';
import { useSgahInversionStore } from '../../hooks';
import {
    FormNewInversion,
    TableSgahInversion,
    FormUpdateInversion,
    DetailSaldoParagraph,
} from '../components';
import { useInversionUi } from '../../hooks/ui/useInversionUi';

export const SgahInversionPage = () => {
    const {
        saldoInvertido,
        startLoadingSaldoInvertido,
        startLoadingInversiones,
    } = useSgahInversionStore();

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
                    <DetailSaldoParagraph
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

                <TableSgahInversion />
            </aside>

            <FormNewInversion />
            <FormUpdateInversion />
        </>
    );
};
