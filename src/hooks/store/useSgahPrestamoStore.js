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
    fetchActiveLoans,
    fetchLoanByFolio,
    fetchTotalLoanDebt,
    saveLoan,
    editLoan,
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

    const loadTotalLoanDebt = async () => {
        console.log('loadTotalLoanDebt');
        const {
            data: { saldoUtilizado },
        } = await fetchTotalLoanDebt();
        dispatch(setTotalLoanDebt(saldoUtilizado));
    };

    const loadActiveLoans = async () => {
        console.log('loadActiveLoans');
        handleShowLoader(true);

        try {
            const {
                data: { loans },
            } = await fetchActiveLoans();
            dispatch(setActiveLoans(loans));
        } catch (error) {
            useToastMessage(error.code);
        }

        handleShowLoader(false);
    };

    const saveLoanFromBudget = async (formData) => {
        console.log('saveLoanFromBudget');

        try {
            const { status, data } = await saveLoan(formData);

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

    const saveLoanFromExpense = async (formData) => {
        console.log('saveLoanFromExpense');

        try {
            const { status, data } = await saveLoan(formData);
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

    const loadLoanByFolio = async (folio) => {
        console.log('loadLoanByFolio');
        const {
            data: { loan },
        } = await fetchLoanByFolio(folio);
        dispatch(setLoan(loan));
    };

    const processLoanUpdate = async (formData) => {
        console.log('processLoanUpdate');

        try {
            const { status, data } = await editLoan(formData);
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
        loadTotalLoanDebt,
        loadActiveLoans,
        saveLoanFromExpense,
        loadLoanByFolio,
        processLoanUpdate,
        startLoadingExpenseBalance,
        saveLoanFromBudget,
    };
};
