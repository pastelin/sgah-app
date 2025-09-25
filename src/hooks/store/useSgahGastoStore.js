import { useDispatch, useSelector } from 'react-redux';
import {
    loadExpenses,
    loadRemainingBalance,
    loadSpentBalance,
    addExpense,
    decreaseRemainingBalance,
    loadRecurringExpenses,
    loadAnnualBalanceHistory,
    showExpenseModal,
    hideExpenseModal,
    removeExpense,
    updateEditingId,
    editExpense,
} from '../../store';
import {
    findRecurringExpenses,
    findExpensesByMonth,
    getBalanceAmounts,
    saveExpense,
    findAnnualBalanceHistory,
    deleteExpense,
    updateExpense,
} from '../../services';
import { getCurrentMonth, getCurrentYear } from '../useUtilities';
import { useSgahUi } from '../ui';

export const useSgahGastoStore = () => {
    const dispatch = useDispatch();

    const {
        recurringExpenses,
        expenses,
        balanceRemaining,
        spentBalance,
        monthlyExpenseLimit,
        annualBalanceHistory,
        isModalShown,
        currentEditingId,
    } = useSelector((state) => state.sgahGasto);

    const { handleShowLoader } = useSgahUi();

    const startLoadingRecurringExpenses = async () => {
        console.log('startLoadingRecurringExpenses');
        handleShowLoader(true);

        try {
            const {
                data: { gastosRecurrentes },
            } = await findRecurringExpenses();
            dispatch(loadRecurringExpenses(gastosRecurrentes));
        } catch (error) {
            console.log(error);
        }

        handleShowLoader(false);
    };

    const startLoadingExpensesByCurrentMonth = async () => {
        console.log('startLoadingExpensesByCurrentMonth');
        const {
            data: { gastos },
        } = await findExpensesByMonth(getCurrentYear(), getCurrentMonth());
        dispatch(loadExpenses(gastos));
    };

    const startLoadingAnnualBalanceHistory = async (year) => {
        console.log('startLoadingAnnualBalanceHistory');
        handleShowLoader(true);

        try {
            const {
                data: { historicalBalance },
            } = await findAnnualBalanceHistory(year);
            dispatch(loadAnnualBalanceHistory(historicalBalance));
        } catch (error) {
            console.log(error);
        }
        handleShowLoader(false);
    };

    const startLoadingExpenseBalance = async () => {
        console.log('startLoadingExpenseBalance');

        const { data } = await getBalanceAmounts();
        dispatch(loadRemainingBalance(data.montoDisponible));
        dispatch(loadSpentBalance(data.montoGastado));
    };

    const startSavingExpense = async (formData) => {
        console.log('startSavingExpense');   

        try {
            const { status, data } = await saveExpense(formData);

            if (formData.origenMovimiento.id === 2) {
                dispatch(
                    addExpense({
                        ...data.gasto,
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

    const startUpdatingExpense = async (formData) => {
        console.log('startUpdatingExpense');
        try {
            const { status, data } = await updateExpense(formData);

            if (status === 200) {
                dispatch(
                    editExpense({
                        ...data.expense,
                    })
                );

                return {
                    code: status,
                    message: data.mensaje,
                };
            }
        } catch (error) {
            return {
                code: error.code,
                message: error?.response?.data?.mensaje,
            };
        }
    };

    const startDeletingExpense = async (id) => {
        console.log('startDeletingExpense');
        try {
            const { status, data } = await deleteExpense(id);

            console.log('startDeletingExpense', status);

            if (status === 200) {
                dispatch(removeExpense(data.id));

                return {
                    message: 'Gasto eliminado con éxito',
                };
            }
        } catch (error) {
            return {
                message: error?.response?.data?.mensaje,
            };
        }
    };

    const startDecreaseRemainingBalance = (saldo) => {
        console.log('startDecreaseRemainingBalance');
        dispatch(decreaseRemainingBalance(saldo));
    };

    const openExpenseModal = (flag) => {
        dispatch(showExpenseModal(flag));
    };

    const closeExpenseModal = (flag) => {
        dispatch(hideExpenseModal(flag));
        dispatch(updateEditingId(''));
    };

    const startUpdateCurrentEditingId = (value) => {
        console.log('startUpdateCurrentEditingId');
        dispatch(updateEditingId(value));
        dispatch(hideExpenseModal(true));
    };

    return {
        // * Propiedades
        recurringExpenses,
        expenses,
        balanceRemainingG: balanceRemaining,
        spentBalanceG: spentBalance,
        monthlyExpenseLimit,
        annualBalanceHistory,
        isModalShown,
        currentEditingId,

        // * Metodos
        startLoadingRecurringExpenses,
        startLoadingExpensesByCurrentMonth,
        startLoadingExpenseBalance,
        startSavingExpense,
        startDecreaseRemainingBalance,
        startLoadingAnnualBalanceHistory,
        openExpenseModal,
        closeExpenseModal,
        startDeletingExpense,
        startUpdateCurrentEditingId,
        startUpdatingExpense,
    };
};
