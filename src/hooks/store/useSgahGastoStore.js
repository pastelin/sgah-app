import { useDispatch, useSelector } from 'react-redux';
import {
    onLoadGastos,
    onLoadSaldoDisponibleG,
    onLoadSaldoUtilizadoG,
    onAddNewGasto,
    onIncrementSaldoDisponibleG,
    onSubtractSaldoDisponibleG,
    onLoadCategoriasGasto,
    onIncrementSaldoUtilizadoG,
} from '../../store';
import { sgahApi } from '../../backend';

export const useSgahGastoStore = () => {
    const dispatch = useDispatch();

    const { categoriasGasto, gastos, saldoDisponible, saldoUtilizado } =
        useSelector((state) => state.sgahGasto);

    const startLoadingCategoriasGasto = async () => {
        console.log('categoria');
        const { data } = await sgahApi.get('gasto/v0/gasto/categoria');

        dispatch(onLoadCategoriasGasto(data));
    };

    const startLoadingGastos = async () => {
        console.log('startLoadingGastos');
        const { data } = await sgahApi.get('gasto/v0/gasto/detalle');
        dispatch(onLoadGastos(data));
    };

    const startLoadingSaldoGasto = async () => {
        console.log('startLoadingSaldoGasto');

        const { data } = await sgahApi.get('gasto/v0/gasto/montos');
        dispatch(onLoadSaldoDisponibleG(data.montoDisponible));
        dispatch(onLoadSaldoUtilizadoG(data.montoGastado));
    };

    const startSavingGasto = async (formData) => {
        console.log('startSavingGasto');

        try {
            const { status, data } = await sgahApi.post(
                'gasto/v0/gasto/agrega',
                formData
            );

            if (formData.cdTipoMovimiento === 2) {
                startSubtractSaldoDisponibleG(formData.monto);
                startIncrementSaldoUtilizadoG(formData.monto);
                dispatch(onAddNewGasto(data.gasto));
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

    return {
        // * Propiedades
        categoriasGasto,
        gastos,
        saldoDisponibleG: saldoDisponible,
        saldoUtilizadoG: saldoUtilizado,

        // * Metodos
        startLoadingCategoriasGasto,
        startLoadingGastos,
        startLoadingSaldoGasto,
        startSavingGasto,
        startIncrementSaldoDisponibleG,
        startSubtractSaldoDisponibleG,
    };
};
