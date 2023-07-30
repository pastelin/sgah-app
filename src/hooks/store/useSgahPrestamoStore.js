import { useDispatch, useSelector } from 'react-redux';
import {
	onAddNewPrestamo,
	onAddSaldoDisponibleAhorro,
	onLoadPrestamo,
	onLoadPrestamos,
	onLoadSaldoDisponibleAhorro,
	onLoadSaldoUtilizado,
	onOpenFormUpdatePrestamo,
	onSubtractSaldoUtilizado,
	onUpdatePrestamo,
	onUpdateSaldosForNewPrestamo,
} from '../../store';
import { sgahApi } from '../../backend';
import { formatCurrency, useSgahGastoStore } from '../../hooks';

export const useSgahPrestamoStore = () => {
	// A hook to access the redux store's state.
	// This hook takes a selector function as an argument.The selector is called with the store state.
	const { filtro, prestamos, saldoUtilizado, prestamo, saldoDisponibleAhorro } = useSelector(
		(state) => state.sgahPrestamo
	);

	const {
		saldoDisponible: saldoDisponibleGasto,
		startLoadingSaldoGasto,
		startAddingSaldoDisponible: startAddingSaldoDisponibleGasto,
		startSubtractingSaldoDisponible: startSubtractingSaldoDisponibleGasto,
	} = useSgahGastoStore();

	const dispatch = useDispatch();

	const startLoadingSaldoUtilizado = async () => {
		console.log('startLoadingSaldoUtilizado');

		const { data } = await sgahApi.get('prestamo/v0/prestamo/saldoUtilizado');

		dispatch(onLoadSaldoUtilizado(data));
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

			dispatch(onUpdateSaldosForNewPrestamo(formData.montoPrestado));
			startAddingSaldoDisponibleGasto(formData.montoPrestado);

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
		// Actualiza estado para visualizar el formulario que actualiza un prestamo
		dispatch(onOpenFormUpdatePrestamo());
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
			startSubtractingSaldoDisponibleGasto(montoPagado);
			dispatch(onSubtractSaldoUtilizado(montoPagado));
            dispatch(onAddSaldoDisponibleAhorro(montoPagado));
            
			dispatch(onUpdatePrestamo(data.prestamo));

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

		// TODO: si regresa un estatus 2 eliminar registro caso contrario actualizarlo
	};

	const startLoadingSaldoDisponibleAhorro = async () => {
		console.log('startLoadingSaldoDisponibleAhorro');
		const { data } = await sgahApi.get('ahorro/v0/ahorro/saldo');
		dispatch(onLoadSaldoDisponibleAhorro(data));
	};

	return {
		// * Propiedades
		filtro,
		prestamos,
		saldoUtilizado: formatCurrency(saldoUtilizado),
		prestamo,
		saldoDisponibleAhorro,
		saldoDisponibleGasto,

		// * Metodos
		startLoadingSaldoUtilizado,
		startLoadingPrestamos,
		startSavingPrestamo,
		startLoadingPrestamo,
		startUpdatingPrestamo,
		startLoadingSaldoDisponibleAhorro,
		startLoadingSaldoGasto,
	};
};
