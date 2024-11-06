import { sgahApi } from '../backend';

export const getSaldosG = async () => {
    return await sgahApi.get('sgah/v0/gasto/montos');
};

export const findGastosByMonth = async (year, month) => {
    return await sgahApi.get(`sgah/v0/gasto/${year}/${month}`);
};

export const findHistoricalBalanceByMonth = async (year, month) => {
    return await sgahApi.get(`sgah/v0/gasto/historical/${year}/${month}`);
};

export const findGastosRecurrentes = async () => {
    return await sgahApi.get('sgah/v0/gasto/categoria');
};

export const saveGasto = async (formData) => {
    return await sgahApi.post('sgah/v0/gasto/', formData);
};

export const findHistoricalBalanceByYear = async (year) => {
    return await sgahApi.get(`sgah/v0/gasto/${year}`);
}