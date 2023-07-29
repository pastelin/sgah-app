import { useDispatch, useSelector } from 'react-redux';
import {
	onAddNewPrestamo,
	onAddSaldoDisponibleAhorro,
	onCloseFormNewPrestamo,
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
import Swal from 'sweetalert2';

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

	const startSavingPrestamo = async (formData, onResetForm) => {
		console.log('startSavingPrestamo');

		if (formData.montoPrestado > saldoDisponibleAhorro) {
			Swal.fire('Validar monto ingresado', '', 'error');
			return;
		}

		const { data } = await sgahApi.post('prestamo/v0/prestamo/new', formData);

		dispatch(onUpdateSaldosForNewPrestamo(formData.montoPrestado));
		startAddingSaldoDisponibleGasto(formData.montoPrestado);

		dispatch(onAddNewPrestamo(data.prestamo));

		dispatch(onCloseFormNewPrestamo());

		onResetForm();

		Swal.fire('Su prestamo fue registrado correctamente', '', 'success');
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
		newMontoPagado,
	}) => {
		console.log('startUpdatingPrestamo');

		const montoLiquidar = montoPrestado - montoPagado;
		if (newMontoPagado > montoLiquidar) {
			Swal.fire('El monto no debe ser mayor a la deuda actual', '', 'error');
			return;
		}

		if (newMontoPagado > saldoDisponibleGasto) {
			Swal.fire('El monto no debe ser mayor al saldo disponible', '', 'error');
			return;
		}

		const { data } = await sgahApi.post('prestamo/v0/prestamo/operacionActualiza', {
			folio,
			montoPrestado,
			descripcion,
			fechaCreacion,
			montoPagado: newMontoPagado,
		});

		// Actualiza saldos para (Gastos, Ahorro y Prestamo)
		startSubtractingSaldoDisponibleGasto(newMontoPagado);
		dispatch(onSubtractSaldoUtilizado(newMontoPagado));
		dispatch(onAddSaldoDisponibleAhorro(newMontoPagado));
		dispatch(onUpdatePrestamo(data.prestamo));

        Swal.fire('El prestamo de actualizó correctamente', '', 'success');
        
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
		saldoDisponibleAhorro: formatCurrency(saldoDisponibleAhorro),
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
