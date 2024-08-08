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
import { useSgahUi } from '../ui';
import { useGastoHistoricoPage } from '../pages/useGastoHistoricoPage';
import { usePrintMessage } from '../messages';

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

    const { getHistoricalBalanceByMonths } = useGastoHistoricoPage();
    const { handleShowLoader } = useSgahUi();

    const startLoadingGastosRecurrentes = async () => {
        console.log('startLoadingGastosRecurrentes');
        handleShowLoader(true);

        try {
            const {
                data: { gastosRecurrentes },
            } = await findGastosRecurrentes();
            dispatch(onLoadGastosRecurrentes(gastosRecurrentes));
        } catch (error) {
            usePrintMessage(error.code);
        }

        handleShowLoader(false);
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
        handleShowLoader(true);

        try {
            const {
                data: { gastos },
            } = await findGastosByYear(year);
            dispatch(
                onLoadHistoricalBalanceByMonths(
                    getHistoricalBalanceByMonths(gastos)
                )
            );
        } catch (error) {
            console.log(error);
        }
        handleShowLoader(false);
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
            usePrintMessage(error.code, error?.response?.data?.mensaje);
            return {
                code: error.code
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
