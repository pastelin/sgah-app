import { useDispatch, useSelector } from 'react-redux';
import {
	onLoadGastos,
	onLoadCategoriasGasto,
	onLoadSaldo,
	onAddNewGasto,
	onCloseFormGasto,
} from '../../store';
import { sgahApi } from '../../backend';
import { addNumbers, formatCurrency } from '../useUtilities';
import Swal from 'sweetalert2';

export const useSgahGastoStore = () => {
	const { filtro, categoriasGasto, gastos, tipoMovimiento, saldo } = useSelector(
		(state) => state.sgahGasto
	);

	const dispatch = useDispatch();

	const startLoadingCategoriasGasto = async () => {
		console.log('categoria');
		const { data } = await sgahApi.get('gasto/v0/gasto/categoria');

		dispatch(onLoadCategoriasGasto(data));
	};

	const startLoadingGastos = async () => {
		console.log('startLoadingGastos');
		const { data } = await sgahApi.get('gasto/v0/gasto/detalle');
		dispatch(onLoadGastos(data));
	};

	const startLoadingSaldoGasto = async () => {
		console.log('startLoadingSaldoGasto');

		const { data } = await sgahApi.get('gasto/v0/gasto/montos');
		dispatch(onLoadSaldo(data));
	};

	const startSavingGasto = async (formData, onResetForm) => {
		console.log('startSavingGasto');

		const saldoDisponible = saldo.disponible - formData.monto;
		const saldoGastado = addNumbers(formData.monto, saldo.gastado);

		// TODO: Implementar capa de validaciones
		// TODO: Estudiar UX Writing para mejorar mensajes

		if (saldoDisponible < 0) {
			Swal.fire('El monto ingresado no debe ser mayor al saldo disponible', '', 'error');
			return;
		}

		const { data } = await sgahApi.post('gasto/v0/gasto/agrega', formData);

		dispatch(
			onLoadSaldo({
				montoDisponible: saldoDisponible,
				montoGastado: saldoGastado,
			})
		);

		dispatch(onAddNewGasto(data.gasto));
		dispatch(onCloseFormGasto());
		onResetForm();

		Swal.fire('Se guardó el gasto correctamente', '', 'success');
	};

	return {
		// * Propiedades
		filtro,
		categoriasGasto,
		gastos,
		tipoMovimiento,
		disponible: formatCurrency(saldo.disponible),
		gastado: formatCurrency(saldo.gastado),

		// * Metodos
		startLoadingCategoriasGasto,
		startLoadingGastos,
		startLoadingSaldoGasto,
		startSavingGasto,
	};
};
