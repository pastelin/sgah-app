import { useDispatch, useSelector } from 'react-redux';
import {
	onLoadGastos,
	onLoadCategoriasGasto,
	onLoadSaldo,
	onAddNewGasto,
	onAddSaldoDisponible,
	onSubtractSaldoDisponible,
} from '../../store';
import { sgahApi } from '../../backend';
import { addNumbers } from '../useUtilities';

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

	const startSavingGasto = async (formData) => {
		console.log('startSavingGasto');

		// TODO: Estudiar UX Writing para mejorar mensajes

		try {
			const { status, data } = await sgahApi.post('gasto/v0/gasto/agrega', formData);
			console.log({ status, data });

			if (formData.cdTipoMovimiento === 2) {
				const saldoDisponible = saldo.disponible - formData.monto;
				const saldoGastado = addNumbers(formData.monto, saldo.gastado);

				dispatch(
					onLoadSaldo({
						montoDisponible: saldoDisponible,
						montoGastado: saldoGastado,
					})
				);
				dispatch(onAddNewGasto(data.gasto));
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

	const startAddingSaldoDisponible = (saldo) => {
		console.log('startAddingSaldoDisponible');
		dispatch(onAddSaldoDisponible(saldo));
	};

	const startSubtractingSaldoDisponible = (saldo) => {
		console.log('startSubtractingSaldoDisponible');
		dispatch(onSubtractSaldoDisponible(saldo));
	};

	return {
		// * Propiedades
		filtro,
		categoriasGasto,
		gastos,
		tipoMovimiento,
		saldoDisponible: saldo.disponible,
		saldoGastado: saldo.gastado,

		// * Metodos
		startLoadingCategoriasGasto,
		startLoadingGastos,
		startLoadingSaldoGasto,
		startSavingGasto,
		startAddingSaldoDisponible,
		startSubtractingSaldoDisponible,
	};
};
