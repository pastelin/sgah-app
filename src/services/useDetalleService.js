import { sgahApi } from '../backend';

export const getResumenSaldos = async () => {
    return await sgahApi.get('sgah/v0/resumen/');
};
