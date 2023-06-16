import { obtenerDetalle, agregarGasto, obtenerData } from '../../backend';
import { actualizarPrestamo } from '../../backend/providersPrestamos';
import { updateResumen } from './sgahSlice';
import { updateCategorias, updateGastos, updateMontos } from './sgahSliceGasto';
import { updatePrestamos, updateSaldoUtilizado } from './sgahSlicePrestamo';

export const startDetalle = () => {
	console.log('detalle');
	return async (dispatch, getState) => {
		const detalle = await obtenerDetalle();

		dispatch(updateResumen(detalle));
	};
};

export const startCategorias = (uri) => {
	console.log('categoria');
	return async (dispatch, getState) => {
		const data = await obtenerData(uri);

		dispatch(updateCategorias(data));
	};
};

export const startGastoMesActual = (uri) => {
	console.log('startGastoMesActual');
	return async (dispatch, getState) => {
		const data = await obtenerData(uri);
		dispatch(updateGastos(data));
	};
};

export const startMontos = (uri) => {
	console.log('startMontos');

	return async (dispatch, getState) => {
		const data = await obtenerData(uri);
		dispatch(updateMontos(data));
	};
};

export const startAgregarGasto = (formData, uriGastoMesActual, uriMontos, uriAgregaGasto) => {
	return async (dispatch) => {
		await agregarGasto(formData, uriAgregaGasto);

		dispatch(startMontos(uriMontos));

		dispatch(startGastoMesActual(uriGastoMesActual));

		dispatch(startDetalle());
	};
};

export const startSaldoUtilizado = (uri) => {
	return async (dispatch) => {
		const data = await obtenerData(uri);

		dispatch(updateSaldoUtilizado(data));
	};
};

export const startDetallePrestamos = (uri) => {

    return async (dispatch) => {
        const data = await obtenerData(uri);

        dispatch(updatePrestamos(data));

    }
}

export const startAgregarPrestamo = (
	formData,
	uriPrestamosActivos,
	uriSaldoUtilizado,
	uriAgregaPrestamo
) => {
	return async (dispatch) => {
		await actualizarPrestamo(formData, uriAgregaPrestamo);

		dispatch(startSaldoUtilizado(uriSaldoUtilizado));

		dispatch(startDetallePrestamos(uriPrestamosActivos));

		dispatch(startDetalle());
	};
};