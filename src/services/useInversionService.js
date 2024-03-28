import { sgahApi } from '../backend';

export const getSaldoInvertidoI = async () => {
    return await sgahApi.get('inversion/v0/inversion/saldoInvertido');
};

export const findAllI = async () => {
    return await sgahApi.get('inversion/v0/inversion/detalle');
};

export const getGruposFinancieros = async () => {
    return await sgahApi.get('inversion/v0/inversion/consultaApp');
};

export const saveInversion = async (formData) => {
    return await sgahApi.post(
        'inversion/v0/inversion/operacionAgregar',
        formData
    );
};

export const updateInversion = async (formData) => {
    return await sgahApi.post(
        'inversion/v0/inversion/operacionRetiro',
        formData
    );
};

export const findInversionByFolio = async (folio) => {
    return await sgahApi.get(
        `inversion/v0/inversion/detalleInversion/${folio}`
    );
};
