import { useEffect } from 'react';
import { useSgahGastoStore, useGastoUi } from '../../hooks';
import { TableSgahGasto, GastoForm, DetailSaldoParagraph } from '../components';

export const SgahGastosPage = () => {
    const { handleShowFormGasto } = useGastoUi();

    const {
        saldoDisponibleG,
        saldoUtilizadoG,
        startLoadingGastosRecurrentes,
        startLoadingGastosByCurrentMonth,
        startLoadingSaldoGasto,
    } = useSgahGastoStore();

    useEffect(() => {
        startLoadingGastosRecurrentes();
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

                <div className="text-center mt-2">
                    <button
                        className="btn btn-submit btn-xl "
                        onClick={() => handleShowFormGasto(true)}
                    >
                        Agregar Gasto
                    </button>
                </div>

                <TableSgahGasto />
            </aside>

            <GastoForm />
        </>
    );
};
