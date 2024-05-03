import { sgahApi } from '../backend';

export const getSaldoInvertidoI = async () => {
    return await sgahApi.get('sgah/v0/inversion/saldo');
};

export const findAllI = async () => {
    return await sgahApi.get('sgah/v0/inversion/');
};

export const getProductosFinancieros = async () => {
    return await sgahApi.get('sgah/v0/inversion/productosFinancieros');
};

export const saveInversion = async (formData) => {
    return await sgahApi.post(
        'sgah/v0/inversion/increment',
        formData
    );
};

export const updateInversion = async (formData) => {
    return await sgahApi.post(
        'sgah/v0/inversion/retiro',
        formData
    );
};

export const findInversionByFolio = async (folio) => {
    return await sgahApi.get(
        `sgah/v0/inversion/${folio}`
    );
};
