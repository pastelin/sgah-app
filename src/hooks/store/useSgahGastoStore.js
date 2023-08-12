import { useDispatch, useSelector } from 'react-redux';
import {
	onLoadGastos,
	onLoadCategoriasGasto,
	onLoadSaldoGasto,
	onAddNewGasto,
	onAddSaldoDisponibleG,
	onSubtractSaldoDisponibleG,
} from '../../store';
import { sgahApi } from '../../backend';
import { addNumbers } from '../useUtilities';

export const useSgahGastoStore = () => {
	const { filtro, categoriasGasto, gastos, tipoMovimiento, saldoGasto } = useSelector(
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
		dispatch(onLoadSaldoGasto(data));
	};

	const startSavingGasto = async (formData) => {
		console.log('startSavingGasto');

		// TODO: Estudiar UX Writing para mejorar mensajes

		try {
			const { status, data } = await sgahApi.post('gasto/v0/gasto/agrega', formData);
			console.log({ status, data });

			if (formData.cdTipoMovimiento === 2) {
				const saldoDisponible = saldoGasto.disponible - formData.monto;
				const saldoGastado = addNumbers(formData.monto, saldoGasto.gastado);

				dispatch(
					onLoadSaldoGasto({
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

	const startAddingSaldoDisponibleG = (saldo) => {
		console.log('startAddingSaldoDisponibleG');
		dispatch(onAddSaldoDisponibleG(saldo));
	};

	const startSubtractingSaldoDisponibleG = (saldo) => {
		console.log('startSubtractingSaldoDisponibleG');
		dispatch(onSubtractSaldoDisponibleG(saldo));
	};

	return {
		// * Propiedades
		filtro,
		categoriasGasto,
		gastos,
		tipoMovimiento,
		saldoDisponibleG: saldoGasto.disponible,
		saldoGastado: saldoGasto.gastado,

		// * Metodos
		startLoadingCategoriasGasto,
		startLoadingGastos,
		startLoadingSaldoGasto,
		startSavingGasto,
		startAddingSaldoDisponibleG,
		startSubtractingSaldoDisponibleG,
	};
};
