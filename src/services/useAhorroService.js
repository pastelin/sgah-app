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

export const modifySaving = async (formData) => {
    return await sgahApi.put(`sgah/v0/ahorro/`, formData);
};

export const removeSaving = async (id) => {
    return await sgahApi.delete(`sgah/v0/ahorro/${id}`);
}