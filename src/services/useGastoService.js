import { sgahApi } from '../backend';

export const getBalanceAmounts = async () => {
    return await sgahApi.get('sgah/v0/gasto/montos');
};

export const findExpensesByMonth = async (year, month) => {
    return await sgahApi.get(`sgah/v0/gasto/${year}/${month}`);
};

export const findMonthlyBalanceHistory = async (year, month) => {
    return await sgahApi.get(`sgah/v0/gasto/historical/${year}/${month}`);
};

export const findRecurringExpenses = async () => {
    return await sgahApi.get('sgah/v0/gasto/categoria');
};

export const saveExpense = async (formData) => {
    return await sgahApi.post('sgah/v0/gasto/', formData);
};

export const findAnnualBalanceHistory = async (year) => {
    return await sgahApi.get(`sgah/v0/gasto/${year}`);
};

export const deleteExpense = async (id) => {
    return await sgahApi.delete(`sgah/v0/gasto/${id}`);
};

export const updateExpense = async (formData) => {
    return await sgahApi.put(`sgah/v0/gasto/${formData.id}`, formData);
}