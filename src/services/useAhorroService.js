import { sgahApi } from '../backend';

export const getSaldoDisponibleA = async () => {
    return await sgahApi.get('ahorro/v0/ahorro/saldo');
};

export const findAhorros = async () => {
    return await sgahApi.get('ahorro/v0/ahorro/detalle');
};

export const saveAhorro = async (formData) => {
    return await sgahApi.post('ahorro/v0/ahorro/agrega', formData);
};