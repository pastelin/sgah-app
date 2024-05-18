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
        const {
            data: { saldoUtilizado },
        } = await getSaldoUtilizado();
        dispatch(onLoadSaldoUtilizadoP(saldoUtilizado));
    };

    const startLoadingPrestamos = async () => {
        console.log('startLoadingPrestamos');
        const {
            data: { prestamos },
        } = await findAll();
        dispatch(onLoadPrestamos(prestamos));
    };

    const startSavingPrestamo = async (formData) => {
        console.log('startSavingPrestamo');

        try {
            const { status, data } = await savePrestamo(formData);
            const { mensaje, folio, fechaCreacion, saldoPagado, cdEstatus } =
                data;

            dispatch(onIncrementSaldoUtilizadoP(formData.saldoPrestado));
            startSubtractSaldoDisponibleA(formData.saldoPrestado);
            startIncrementSaldoDisponibleG(formData.saldoPrestado);

            dispatch(
                onAddNewPrestamo({
                    ...formData,
                    folio,
                    fechaCreacion,
                    saldoPagado,
                    cdEstatus,
                })
            );

            return {
                code: status,
                message: mensaje,
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
        const {
            data: { prestamo },
        } = await findPrestamoByFolio(folio);
        dispatch(onLoadPrestamo(prestamo));
    };

    const startUpdatingPrestamo = async (formData) => {
        console.log('startUpdatingPrestamo');

        try {
            const { status, data } = await updatePrestamo(formData);
            const { saldoPagado, cdEstatus, mensaje } = data;

            startSubtractSaldoDisponibleG(formData.saldoPagado);
            dispatch(onSubtractSaldoUtilizadoP(formData.saldoPagado));
            startIncrementSaldoDisponibleA(formData.saldoPagado);

            if (cdEstatus == 2) {
                dispatch(onDeletePrestamo(formData.folio));
            } else {
                dispatch(
                    onUpdatePrestamo({ ...formData, saldoPagado, cdEstatus })
                );
            }

            return {
                code: status,
                message: mensaje,
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
