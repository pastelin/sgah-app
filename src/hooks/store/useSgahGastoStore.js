import { useDispatch, useSelector } from 'react-redux';
import {
    onLoadGastos,
    onLoadSaldoDisponibleG,
    onLoadSaldoUtilizadoG,
    onAddNewGasto,
    onIncrementSaldoDisponibleG,
    onSubtractSaldoDisponibleG,
    onLoadGastosRecurrentes,
    onIncrementSaldoUtilizadoG,
    onLoadHistoricalBalanceByMonths,
} from '../../store';
import {
    findGastosRecurrentes,
    findGastosByMonth,
    getSaldosG,
    saveGasto,
    findGastosByYear,
} from '../../services';
import {
    getCurrentDateByString,
    getCurrentMonth,
    getCurrentYear,
} from '../useUtilities';
import { useGastoUi } from '../ui';
import { useGastoHistoricoPage } from '../pages/useGastoHistoricoPage';

export const useSgahGastoStore = () => {
    const dispatch = useDispatch();

    const {
        gastosRecurrentes,
        gastos,
        saldoDisponible,
        saldoUtilizado,
        gastoMensualPermitido,
        ingresoMensual,
        historicalBalanceByMonths,
    } = useSelector((state) => state.sgahGasto);

    const { handleShowLoaderGasto } = useGastoUi();
    const { getSaldoGastadoByMonth } = useGastoHistoricoPage();

    const startLoadingGastosRecurrentes = async () => {
        console.log('categoria');
        const {
            data: { gastosRecurrentes },
        } = await findGastosRecurrentes();
        dispatch(onLoadGastosRecurrentes(gastosRecurrentes));
    };

    const startLoadingGastosByCurrentMonth = async () => {
        console.log('startLoadingGastosByCurrentMonth');
        const {
            data: { gastos },
        } = await findGastosByMonth(getCurrentYear(), getCurrentMonth());
        dispatch(onLoadGastos(gastos));
    };

    const startLoadingGastosByYear = async (year) => {
        console.log('startLoadingGastosByYear');
        handleShowLoaderGasto(true);
        const {
            data: { gastos },
        } = await findGastosByYear(year);
        dispatch(onLoadHistoricalBalanceByMonths(getSaldoGastadoByMonth(gastos)));
    };

    const startLoadingSaldoGasto = async () => {
        console.log('startLoadingSaldoGasto');

        const { data } = await getSaldosG();
        dispatch(onLoadSaldoDisponibleG(data.montoDisponible));
        dispatch(onLoadSaldoUtilizadoG(data.montoGastado));
    };

    const startSavingGasto = async (formData) => {
        console.log('startSavingGasto');

        try {
            console.log(formData);
            const { status, data } = await saveGasto(formData);

            if (formData.tipoMovimiento.cdTipo === 2) {
                startSubtractSaldoDisponibleG(formData.monto);
                startIncrementSaldoUtilizadoG(formData.monto);
                dispatch(
                    onAddNewGasto({
                        ...formData,
                        fechaCreacion: getCurrentDateByString(),
                    })
                );
            }

            return {
                code: status,
                message: data.mensaje,
            };
        } catch (error) {
            return {
                code: error.code,
                message: error?.response?.data?.mensaje,
            };
        }
    };

    const startIncrementSaldoDisponibleG = (saldo) => {
        console.log('startIncrementSaldoDisponibleG');
        dispatch(onIncrementSaldoDisponibleG(saldo));
    };

    const startSubtractSaldoDisponibleG = (saldo) => {
        console.log('startSubtractSaldoDisponibleG');
        dispatch(onSubtractSaldoDisponibleG(saldo));
    };

    const startIncrementSaldoUtilizadoG = (saldo) => {
        console.log('startIncrementSaldoUtilizadoG');
        dispatch(onIncrementSaldoUtilizadoG(saldo));
    };

    const getCategoriaGastoById = (cdGasto) => {
        console.log(gastosRecurrentes, cdGasto);
        return gastosRecurrentes.find(
            (categoria) => categoria.cdGasto == cdGasto
        );
    };

    return {
        // * Propiedades
        gastosRecurrentes,
        gastos,
        saldoDisponibleG: saldoDisponible,
        saldoUtilizadoG: saldoUtilizado,
        gastoMensualPermitido,
        ingresoMensual,
        historicalBalanceByMonths,

        // * Metodos
        startLoadingGastosRecurrentes,
        startLoadingGastosByCurrentMonth,
        startLoadingSaldoGasto,
        startSavingGasto,
        startIncrementSaldoDisponibleG,
        startSubtractSaldoDisponibleG,
        getCategoriaGastoById,
        startLoadingGastosByYear,
    };
};
