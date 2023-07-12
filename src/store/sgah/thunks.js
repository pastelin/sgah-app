import { updateResumen } from './sgahSlice';
import { updateCategorias, updateGastos, updateMontos } from './sgahSliceGasto';
import { updatePrestamo, updatePrestamos, updateSaldoUtilizado } from './sgahSlicePrestamo';
import { sgahApi } from '../../backend';

export const startDetalle = () => {
	console.log('detalle');
	return async (dispatch, getState) => {
		const { data } = await sgahApi.get('resumen/v0/resumen/detalle');

		dispatch(updateResumen(data));
	};
};

export const startCategorias = () => {
	console.log('categoria');
	return async (dispatch, getState) => {
		const { data } = await sgahApi.get('gasto/v0/gasto/categoria');

		dispatch(updateCategorias(data));
	};
};

export const startGastoMesActual = () => {
	console.log('startGastoMesActual');
	return async (dispatch, getState) => {
		const { data } = await sgahApi.get('gasto/v0/gasto/detalle');
		dispatch(updateGastos(data));
	};
};

export const startMontos = () => {
	console.log('startMontos');

	return async (dispatch, getState) => {
		const { data } = await sgahApi.get('gasto/v0/gasto/montos');
		dispatch(updateMontos(data));
	};
};

export const startAgregarGasto = (formData) => {
	return async (dispatch) => {
		await sgahApi.post('gasto/v0/gasto/agrega', formData);

		dispatch(startMontos());

		dispatch(startGastoMesActual());

		dispatch(startDetalle());
	};
};

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

		dispatch(startDetalle());
	};
};

export const startObtenerPrestamo = (folio) => {
	return async (dispatch) => {
		const { data } = await sgahApi.get(`prestamo/v0/prestamo/detallePrestamo/${folio}`);

		dispatch(updatePrestamo(data));
		dispatch(startMontos());
	};
};

export const startUpdatePrestamo = (formData) => {
    return async (dispatch) => {
        await sgahApi.post('prestamo/v0/prestamo/operacionActualiza', formData);

		dispatch(startSaldoUtilizado());

		dispatch(startDetallePrestamos());

		dispatch(startDetalle());
	};
};


export const startAgregarAhorro = (formData) => {
	return async (dispatch) => {
		await sgahApi.post('ahorro/v0/ahorro/agrega', formData);

		dispatch(startMontos());

		dispatch(startGastoMesActual());

		dispatch(startDetalle());
	};
};