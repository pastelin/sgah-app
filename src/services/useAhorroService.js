import { sgahApi } from '../backend';

export const getSaldoDisponibleA = async () => {
    return await sgahApi.get('sgah/v0/ahorro/saldo');
};

export const findAhorros = async () => {
    return await sgahApi.get('sgah/v0/ahorro/');
};

export const saveAhorro = async (formData) => {
    return await sgahApi.post('sgah/v0/ahorro/', formData);
};