import { useDispatch, useSelector } from 'react-redux';
import {
    onAddNewPrestamo,
    onDeletePrestamo,
    onLoadPrestamo,
    onLoadPrestamos,
    onLoadSaldoUtilizadoP,
    onSubtractSaldoUtilizadoP,
    onUpdatePrestamo,
    onIncrementSaldoUtilizadoP,
} from '../../store';
import { useSgahAhorroStore, useSgahGastoStore } from '../../hooks';
import {
    findAll,
    findPrestamoByFolio,
    getSaldoUtilizado,
    savePrestamo,
    updatePrestamo,
} from '../../services/usePrestamoService';

export const useSgahPrestamoStore = () => {
    const dispatch = useDispatch(); 

    // A hook to access the redux store's state.
    // This hook takes a selector function as an argument.The selector is called with the store state.
    const { prestamos, saldoUtilizadoP, prestamo } = useSelector(
        (state) => state.sgahPrestamo
    );

    const {
        saldoDisponibleG,
        startLoadingSaldoGasto,
        startIncrementSaldoDisponibleG,
        startSubtractSaldoDisponibleG,
    } = useSgahGastoStore();

    const { startSubtractSaldoDisponibleA, startIncrementSaldoDisponibleA } =
        useSgahAhorroStore();

    const startLoadingSaldoUtilizadoP = async () => {
        console.log('startLoadingSaldoUtilizadoP');
        const { data: {saldoUtilizado} } = await getSaldoUtilizado();
        dispatch(onLoadSaldoUtilizadoP(saldoUtilizado));
    };

    const startLoadingPrestamos = async () => {
        console.log('startLoadingPrestamos');
        const { data: {prestamos} } = await findAll();
        dispatch(onLoadPrestamos(prestamos));
    };

    // TODO: Refactorizar la data que se recibe del backend
    const startSavingPrestamo = async (formData) => {
        console.log('startSavingPrestamo');

        try {
            const { status, data } = await savePrestamo(formData);

            dispatch(onIncrementSaldoUtilizadoP(formData.montoPrestado));
            startSubtractSaldoDisponibleA(formData.montoPrestado);
            startIncrementSaldoDisponibleG(formData.montoPrestado);

            dispatch(onAddNewPrestamo(data.prestamo));

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

    const startLoadingPrestamo = async (folio) => {
        console.log('startLoadingPrestamo');
        const { data: {prestamo} } = await findPrestamoByFolio(folio);
        dispatch(onLoadPrestamo(prestamo));
    };

    const startUpdatingPrestamo = async (formData) => {
        console.log('startUpdatingPrestamo');

        try {
            const { status, data } = await updatePrestamo(formData);

            // Actualiza saldos para (Gastos, Ahorro y Prestamo)
            startSubtractSaldoDisponibleG(formData.montoPagado);
            dispatch(onSubtractSaldoUtilizadoP(formData.montoPagado));
            startIncrementSaldoDisponibleA(formData.montoPagado);

            if (data.prestamo.cdEstatus == 2) {
                dispatch(onDeletePrestamo(data.prestamo.folio));
            } else {
                dispatch(onUpdatePrestamo(data.prestamo));
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

    return {
        // * Propiedades
        prestamos,
        saldoUtilizadoP,
        prestamo,
        saldoDisponibleG,

        // * Metodos
        startLoadingSaldoUtilizadoP,
        startLoadingPrestamos,
        startSavingPrestamo,
        startLoadingPrestamo,
        startUpdatingPrestamo,
        startLoadingSaldoGasto,
    };
};
