import { sgahApi } from '../backend';

export const getSaldosG = async () => {
    return await sgahApi.get('sgah/v0/gasto/montos');
};

export const findGastos = async () => {
    return await sgahApi.get('sgah/v0/gasto/');
};

export const findGastosRecurrentes = async () => {
    return await sgahApi.get('sgah/v0/gasto/categoria');
};

export const saveGasto = async (formData) => {
    return await sgahApi.post('sgah/v0/gasto/', formData);
};
