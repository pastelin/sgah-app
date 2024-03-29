import { sgahApi } from '../backend';

export const getResumenSaldos = async () => {
    return await sgahApi.get('resumen/v0/resumen/detalle');
};
