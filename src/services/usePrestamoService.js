import { sgahApi } from '../backend';

export const getSaldoUtilizado = async () => {
    return await sgahApi.get('sgah/v0/prestamo/saldoUtilizado');
};

export const findAll = async () => {
    return await sgahApi.get('sgah/v0/prestamo/');
};

export const savePrestamo = async (formData) => {
    return await sgahApi.post('sgah/v0/prestamo/', formData);
};

export const findPrestamoByFolio = async (folio) => {
    return await sgahApi.get(`sgah/v0/prestamo/${folio}`);
};

export const updatePrestamo = async (formData) => {
    return await sgahApi.put('sgah/v0/prestamo/', {
        ...formData,
    });
};
