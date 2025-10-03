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
    incrementRemainingBalance,
} from '../../store';
import {
    useToastMessage,
    useSgahAhorroStore,
    useSgahGastoStore,
    useSgahUi,
} from '../../hooks';
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
        balanceRemainingG,
        startLoadingExpenseBalance,
        startDecreaseRemainingBalance,
    } = useSgahGastoStore();

    const { handleShowLoader } = useSgahUi();

    const { decreaseAvailableBalance, increaseAvailableBalance } =
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
        handleShowLoader(true);

        try {
            const {
                data: { prestamos },
            } = await findAll();
            dispatch(onLoadPrestamos(prestamos));
        } catch (error) {
            useToastMessage(error.code);
        }

        handleShowLoader(false);
    };

    const startSavingPrestamoByBudget = async (formData) => {
        console.log('startSavingPrestamoByBudget');

        try {
            const { status, data } = await savePrestamo(formData);

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

    const startSavingPrestamo = async (formData) => {
        console.log('startSavingPrestamo');

        try {
            const { status, data } = await savePrestamo(formData);
            const { mensaje, folio, fechaCreacion, saldoPagado, cdEstatus } =
                data;

            dispatch(onIncrementSaldoUtilizadoP(formData.saldoPrestado));
            decreaseAvailableBalance(formData.saldoPrestado);
            dispatch(incrementRemainingBalance(formData.saldoPrestado));

            dispatch(
                onAddNewPrestamo({
                    ...formData,
                    folio,
                    fechaCreacion,
                    saldoPagado,
                    cdEstatus,
                })
            );

            console.log({ status, mensaje });
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

            startDecreaseRemainingBalance(formData.saldoPagado);
            dispatch(onSubtractSaldoUtilizadoP(formData.saldoPagado));
            increaseAvailableBalance(formData.saldoPagado);

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
        balanceRemainingG,

        // * Metodos
        startLoadingSaldoUtilizadoP,
        startLoadingPrestamos,
        startSavingPrestamo,
        startLoadingPrestamo,
        startUpdatingPrestamo,
        startLoadingExpenseBalance,
        startSavingPrestamoByBudget,
    };
};
