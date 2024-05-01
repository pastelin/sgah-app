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
} from '../../store';
import {
    findGastosRecurrentes,
    findGastos,
    getSaldosG,
    saveGasto,
} from '../../services';

export const useSgahGastoStore = () => {
    const dispatch = useDispatch();

    const { gastosRecurrentes, gastos, saldoDisponible, saldoUtilizado } =
        useSelector((state) => state.sgahGasto);

    const startLoadingGastosRecurrentes = async () => {
        console.log('categoria');
        const {
            data: { gastosRecurrentes },
        } = await findGastosRecurrentes();
        dispatch(onLoadGastosRecurrentes(gastosRecurrentes));
    };

    const startLoadingGastos = async () => {
        console.log('startLoadingGastos');
        const {
            data: { gastos },
        } = await findGastos();
        dispatch(onLoadGastos(gastos));
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

    const getCurrentDateByString = () => {
        const date = new Date();
        const year = date.getFullYear();
        const month = date.getMonth() + 1;
        const day = date.getDate();

        return `${year}-${month}-${day}`;
    };

    return {
        // * Propiedades
        gastosRecurrentes,
        gastos,
        saldoDisponibleG: saldoDisponible,
        saldoUtilizadoG: saldoUtilizado,

        // * Metodos
        startLoadingGastosRecurrentes,
        startLoadingGastos,
        startLoadingSaldoGasto,
        startSavingGasto,
        startIncrementSaldoDisponibleG,
        startSubtractSaldoDisponibleG,
        getCategoriaGastoById,
        getCurrentDateByString,
    };
};
