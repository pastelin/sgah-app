import { sgahApi } from '../backend';

export const getSaldoUtilizado = async () => {
    return await sgahApi.get('prestamo/v0/prestamo/saldoUtilizado');
};

export const findAll = async () => {
    return await sgahApi.get('prestamo/v0/prestamo/detallePrestamosActivos');
};

export const save = async (formData) => {
    return await sgahApi.post('prestamo/v0/prestamo/new', formData);
};

export const findPrestamoByFolio = async (folio) => {
    return await sgahApi.get(`prestamo/v0/prestamo/detallePrestamo/${folio}`);
};

export const updatePrestamo = async (formData) => {
    return await sgahApi.post('prestamo/v0/prestamo/operacionActualiza', {
        ...formData,
    });
};
