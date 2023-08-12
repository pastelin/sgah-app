import { useDispatch, useSelector } from 'react-redux';
import {
	onAddNewPrestamo,
	onDeletePrestamo,
	onLoadPrestamo,
	onLoadPrestamos,
	onLoadSaldoUtilizadoP,
	onSubtractSaldoUtilizadoP,
	onUpdatePrestamo,
	onAddSaldoUtilizadoP,
} from '../../store';
import { sgahApi } from '../../backend';
import { formatCurrency, useSgahAhorroStore, useSgahGastoStore } from '../../hooks';

export const useSgahPrestamoStore = () => {
	// A hook to access the redux store's state.
	// This hook takes a selector function as an argument.The selector is called with the store state.
	const { filtro, prestamos, saldoUtilizadoP, prestamo, saldoDisponibleAhorro } = useSelector(
		(state) => state.sgahPrestamo
	);

	const {
		saldoDisponibleG,
		startLoadingSaldoGasto,
		startAddingSaldoDisponibleG,
		startSubtractingSaldoDisponibleG,
	} = useSgahGastoStore();

	const { startSubtractingSaldoDisponibleA, startAddingSaldoDisponibleA } = useSgahAhorroStore();

	const dispatch = useDispatch();

	const startLoadingSaldoUtilizadoP = async () => {
		console.log('startLoadingSaldoUtilizadoP');

		const { data } = await sgahApi.get('prestamo/v0/prestamo/saldoUtilizado');

		dispatch(onLoadSaldoUtilizadoP(data));
	};

	const startLoadingPrestamos = async () => {
		console.log('startLoadingPrestamos');

		const { data } = await sgahApi.get('prestamo/v0/prestamo/detallePrestamosActivos');

		dispatch(onLoadPrestamos(data));
	};

	const startSavingPrestamo = async (formData) => {
		console.log('startSavingPrestamo');

		try {
			const { status, data } = await sgahApi.post('prestamo/v0/prestamo/new', formData);

			dispatch(onAddSaldoUtilizadoP(formData.montoPrestado));
			startSubtractingSaldoDisponibleA(formData.montoPrestado);
			startAddingSaldoDisponibleG(formData.montoPrestado);

			dispatch(onAddNewPrestamo(data.prestamo));

			return {
				code: status,
				message: data.mensaje,
			};
		} catch (error) {
			console.log(error);
			return {
				code: error.code,
				message: error?.response?.data?.mensaje,
			};
		}
	};

	const startLoadingPrestamo = async (folio) => {
		console.log('startLoadingPrestamo');

		const { data } = await sgahApi.get(`prestamo/v0/prestamo/detallePrestamo/${folio}`);

		dispatch(onLoadPrestamo(data));
	};

	const startUpdatingPrestamo = async ({
		folio,
		montoPrestado,
		descripcion,
		fechaCreacion,
		montoPagado,
	}) => {
		console.log('startUpdatingPrestamo');

		try {
			const { status, data } = await sgahApi.post('prestamo/v0/prestamo/operacionActualiza', {
				folio,
				montoPrestado,
				descripcion,
				fechaCreacion,
				montoPagado,
			});

			// Actualiza saldos para (Gastos, Ahorro y Prestamo)
			startSubtractingSaldoDisponibleG(montoPagado);
			dispatch(onSubtractSaldoUtilizadoP(montoPagado));
			startAddingSaldoDisponibleA(montoPagado);

			if (data.prestamo.cdEstatus == 2) {
				dispatch(onDeletePrestamo(data.prestamo.folio));
			} else {
				dispatch(onUpdatePrestamo(data.prestamo));
			}

			return {
				code: status,
				message: data.mensaje,
			};
		} catch (error) {
			console.log(error);
			return {
				code: error.code,
				message: error?.response?.data?.mensaje,
			};
		}
	};

	return {
		// * Propiedades
		filtro,
		prestamos,
		saldoUtilizadoP: formatCurrency(saldoUtilizadoP),
		prestamo,
		saldoDisponibleAhorro,
		saldoDisponibleG,

		// * Metodos
		startLoadingSaldoUtilizadoP,
		startLoadingPrestamos,
		startSavingPrestamo,
		startLoadingPrestamo,
		startUpdatingPrestamo,
		startLoadingSaldoGasto,
	};
};
