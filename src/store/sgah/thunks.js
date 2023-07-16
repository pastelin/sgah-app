import { onLoadPrestamos, onLoadSaldoUtilizado, onUpdatePrestamo } from './sgahSlicePrestamo';
import { sgahApi } from '../../backend';


export const startLoadingSaldoUtilizado = () => { 
	return async (dispatch) => {
		const { data } = await sgahApi.get('prestamo/v0/prestamo/saldoUtilizado');

		dispatch(onLoadSaldoUtilizado(data));
	};
};

export const startLoadingPrestamos = () => {
	return async (dispatch) => {
		const { data } = await sgahApi.get('prestamo/v0/prestamo/detallePrestamosActivos');

		dispatch(onLoadPrestamos(data));
	};
};

export const startSavingPrestamo = (formData) => {
	return async (dispatch) => {
		await sgahApi.post('prestamo/v0/prestamo/operacionAgregar', formData);

		dispatch(startLoadingSaldoUtilizado());

		dispatch(startLoadingPrestamos());

		// dispatch(startDetalle());
	};
};

export const startLoadingPrestamo = (folio) => {
	return async (dispatch) => {
		const { data } = await sgahApi.get(`prestamo/v0/prestamo/detallePrestamo/${folio}`);

		dispatch(onUpdatePrestamo(data));
		// dispatch(startMontos());
	};
};

export const startUpdatingPrestamo = (formData) => {
    return async (dispatch) => {
        await sgahApi.post('prestamo/v0/prestamo/operacionActualiza', formData);

		dispatch(startLoadingSaldoUtilizado());

		dispatch(startLoadingPrestamos());

		// dispatch(startDetalle());
	};
};


export const startAgregarAhorro = (formData) => {
	return async (dispatch) => {
		await sgahApi.post('ahorro/v0/ahorro/agrega', formData);

		// dispatch(startMontos());

		// dispatch(startGastoMesActual());

		// dispatch(startDetalle());
	};
};