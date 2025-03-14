import { createSlice } from '@reduxjs/toolkit';

const monthlyIncome = 26528;

export const sgahSliceGasto = createSlice({
    name: 'sgahGasto',
    initialState: {
        monthlyExpenseLimit: monthlyIncome * 0.8,
        recurringExpenses: [],
        expenses: [],
        annualBalanceHistory: [],
        monthlyBalanceHistory: [],
        balanceRemaining: 0,
        spentBalance: 0,
        isModalShown: false,
        currentEditingId: '',
    },
    reducers: {
        loadRecurringExpenses: (state, action) => {
            state.recurringExpenses = action.payload;
        },
        loadExpenses: (state, action) => {
            state.expenses = action.payload;
        },
        addExpense: (state, { payload }) => {
            state.expenses.push(payload);
        },
        loadRemainingBalance: (state, { payload }) => {
            state.balanceRemaining = payload;
        },
        loadAnnualBalanceHistory: (state, { payload }) => {
            state.annualBalanceHistory = payload;
        },
        loadMonthlyBalanceHistory: (state, { payload }) => {
            state.monthlyBalanceHistory = payload;
        },
        incrementRemainingBalance: (state, { payload }) => {
            state.balanceRemaining += parseInt(payload);
        },
        decreaseRemainingBalance: (state, { payload }) => {
            state.balanceRemaining -= parseInt(payload);
        },
        loadSpentBalance: (state, { payload }) => {
            state.spentBalance = payload;
        },
        showExpenseModal: (state, { payload }) => {
            state.isModalShown = payload;
        },
        hideExpenseModal: (state, { payload }) => {
            state.isModalShown = payload;
        },
        removeExpense: (state, { payload }) => {
            state.expenses = state.expenses.filter(
                (expense) => expense.id !== payload
            );
        },
        updateEditingId: (state, { payload }) => {
            state.currentEditingId = payload;
        },
        editExpense: (state, { payload }) => {
            state.expenses = state.expenses.map((expense) => {
                if (expense.id === payload.id) {
                    return payload;
                }
                return expense;
            });
        },
    },
});

export const {
    loadRecurringExpenses,
    loadExpenses,
    loadRemainingBalance,
    loadSpentBalance,
    addExpense,
    incrementRemainingBalance,
    decreaseRemainingBalance,
    loadAnnualBalanceHistory,
    loadMonthlyBalanceHistory,
    showExpenseModal,
    hideExpenseModal,
    removeExpense,
    updateEditingId,
    editExpense,
} = sgahSliceGasto.actions;
