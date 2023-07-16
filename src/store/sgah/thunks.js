import { updatePrestamo, updatePrestamos, updateSaldoUtilizado } from './sgahSlicePrestamo';
import { sgahApi } from '../../backend';


export const startSaldoUtilizado = () => {
	return async (dispatch) => {
		const { data } = await sgahApi.get('prestamo/v0/prestamo/saldoUtilizado');

		dispatch(updateSaldoUtilizado(data));
	};
};

export const startDetallePrestamos = () => {
	return async (dispatch) => {
		const { data } = await sgahApi.get('prestamo/v0/prestamo/detallePrestamosActivos');

		dispatch(updatePrestamos(data));
	};
};

export const startAgregarPrestamo = (formData) => {
	return async (dispatch) => {
		await sgahApi.post('prestamo/v0/prestamo/operacionAgregar', formData);

		dispatch(startSaldoUtilizado());

		dispatch(startDetallePrestamos());

		// dispatch(startDetalle());
	};
};

export const startObtenerPrestamo = (folio) => {
	return async (dispatch) => {
		const { data } = await sgahApi.get(`prestamo/v0/prestamo/detallePrestamo/${folio}`);

		dispatch(updatePrestamo(data));
		// dispatch(startMontos());
	};
};

export const startUpdatePrestamo = (formData) => {
    return async (dispatch) => {
        await sgahApi.post('prestamo/v0/prestamo/operacionActualiza', formData);

		dispatch(startSaldoUtilizado());

		dispatch(startDetallePrestamos());

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