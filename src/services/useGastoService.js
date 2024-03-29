import { sgahApi } from '../backend';

export const getSaldosG = async () => {
    return await sgahApi.get('gasto/v0/gasto/montos');
};

export const findGastos = async () => {
    return await sgahApi.get('gasto/v0/gasto/detalle');
};

export const findCategoriasGasto = async () => {
    return await sgahApi.get('gasto/v0/gasto/categoria');
};

export const saveGasto = async (formData) => {
    return await sgahApi.post('gasto/v0/gasto/agrega', formData);
};