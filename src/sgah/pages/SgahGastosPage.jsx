import { useEffect } from 'react';
import { useSgahGastoStore, useGastoUi, useSgahUi } from '../../hooks';
import {
    TableSgahGasto,
    GastoForm,
    DetailSaldoParagraph,
    LoaderComponent,
    WithoutInfoAlert,
} from '../components';

export const SgahGastosPage = () => {
    const { handleShowFormGasto } = useGastoUi();

    const {
        saldoDisponibleG,
        saldoUtilizadoG,
        startLoadingGastosByCurrentMonth,
        startLoadingSaldoGasto,
        gastos,
    } = useSgahGastoStore();

    const { isShowLoader } = useSgahUi();

    useEffect(() => {
        startLoadingGastosByCurrentMonth();
        startLoadingSaldoGasto();
    }, []);

    return (
        <>
            <aside className="contenedor-aside">
                <h2>Detalle Gastos</h2>

                <div className="contenedor-saldo flex-responsive-row justify-sa">
                    <DetailSaldoParagraph
                        label="Saldo Disponible"
                        saldo={saldoDisponibleG}
                    />
                    <DetailSaldoParagraph
                        label="Saldo Gastado"
                        saldo={saldoUtilizadoG}
                    />
                </div>

                <div className="text-center m-2">
                    <button
                        className="btn btn-submit btn-xl "
                        onClick={() => handleShowFormGasto(true)}
                    >
                        Agregar Gasto
                    </button>
                </div>

                {gastos.length > 0 ? <TableSgahGasto /> : <WithoutInfoAlert />}

                {isShowLoader && <LoaderComponent />}
            </aside>

            <GastoForm />
        </>
    );
};
