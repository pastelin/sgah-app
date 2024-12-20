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
    onLoadHistoricalBalanceByYear,
} from '../../store';
import {
    findGastosRecurrentes,
    findGastosByMonth,
    getSaldosG,
    saveGasto,
    findHistoricalBalanceByYear,
} from '../../services';
import {
    getCurrentDateByString,
    getCurrentMonth,
    getCurrentYear,
} from '../useUtilities';
import { useSgahUi } from '../ui';
import { usePrintMessage } from '../messages';
import { use } from 'react';

export const useSgahGastoStore = () => {
    const dispatch = useDispatch();

    const {
        gastosRecurrentes,
        gastos,
        saldoDisponible,
        saldoUtilizado,
        gastoMensualPermitido,
        ingresoMensual,
        historicalBalanceByYear,
    } = useSelector((state) => state.sgahGasto);

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

    const startLoadingHistoricalBalanceByYear = async (year) => {
        console.log('startLoadingHistoricalBalanceByYear');
        handleShowLoader(true);

        try {
            const {
                data: { historicalBalance },
            } = await findHistoricalBalanceByYear(year);
            dispatch(onLoadHistoricalBalanceByYear(historicalBalance));
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

            if (formData.origenMovimiento.id === 2) {
                startSubtractSaldoDisponibleG(formData.monto);
                startIncrementSaldoUtilizadoG(formData.monto);
                dispatch(
                    onAddNewGasto({
                        ...data.gasto,
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
                code: error.code,
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

    return {
        // * Propiedades
        gastosRecurrentes,
        gastos,
        saldoDisponibleG: saldoDisponible,
        saldoUtilizadoG: saldoUtilizado,
        gastoMensualPermitido,
        ingresoMensual,
        historicalBalanceByYear,

        // * Metodos
        startLoadingGastosRecurrentes,
        startLoadingGastosByCurrentMonth,
        startLoadingSaldoGasto,
        startSavingGasto,
        startIncrementSaldoDisponibleG,
        startSubtractSaldoDisponibleG,
        startLoadingHistoricalBalanceByYear,
    };
};
