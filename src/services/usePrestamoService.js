import { sgahApi } from '../backend';

export const fetchTotalLoanDebt = async () => {
    return await sgahApi.get('sgah/v0/prestamo/saldoUtilizado');
};

export const fetchActiveLoans = async () => {
    return await sgahApi.get('sgah/v0/prestamo/');
};

export const saveLoan = async (formData) => {
    return await sgahApi.post('sgah/v0/prestamo/', formData);
};

export const fetchLoanByFolio = async (folio) => {
    return await sgahApi.get(`sgah/v0/prestamo/${folio}`);
};

export const editLoan = async (formData) => {
    return await sgahApi.put('sgah/v0/prestamo/', {
        ...formData,
    });
};
