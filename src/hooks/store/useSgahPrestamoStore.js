import { useDispatch, useSelector } from 'react-redux';
import {
    addNewLoan,
    deleteLoan,
    setLoan,
    setActiveLoans,
    setTotalLoanDebt,
    decreaseTotalLoanDebt,
    updateLoan,
    increaseTotalLoanDebt,
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
    const { loans, totalLoanDebt, loan } = useSelector(
        (state) => state.loans
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
        dispatch(setTotalLoanDebt(saldoUtilizado));
    };

    const startLoadingPrestamos = async () => {
        console.log('startLoadingPrestamos');
        handleShowLoader(true);

        try {
            const {
                data: { loans },
            } = await findAll();
            dispatch(setActiveLoans(loans));
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

            dispatch(increaseTotalLoanDebt(formData.saldoPrestado));
            decreaseAvailableBalance(formData.saldoPrestado);
            dispatch(incrementRemainingBalance(formData.saldoPrestado));

            dispatch(
                addNewLoan({
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
            data: { loan },
        } = await findPrestamoByFolio(folio);
        dispatch(setLoan(loan));
    };

    const startUpdatingPrestamo = async (formData) => {
        console.log('startUpdatingPrestamo');

        try {
            const { status, data } = await updatePrestamo(formData);
            const { saldoPagado, cdEstatus, mensaje } = data;

            startDecreaseRemainingBalance(formData.saldoPagado);
            dispatch(decreaseTotalLoanDebt(formData.saldoPagado));
            increaseAvailableBalance(formData.saldoPagado);

            if (cdEstatus == 2) {
                dispatch(deleteLoan(formData.folio));
            } else {
                dispatch(
                    updateLoan({ ...formData, saldoPagado, cdEstatus })
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
        loans,
        totalLoanDebt,
        loan,
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
