import { useDispatch, useSelector } from 'react-redux';
import { sgahApi } from '../../backend';
import {
	onAddInversion,
	onAddSaldoInvertido,
	onLoadGruposFinancieros,
	onLoadInversion,
	onLoadInversiones,
	onLoadSaldoInvertido,
	onSubstractSaldoInvertido,
	onUpdateAddMontoInversion,
	onUpdateMontoInversion,
} from '../../store/sgah/sgahSliceInversion';
import { useSgahAhorroStore } from './useSgahAhorroStore';
import { formatCurrency } from '../useUtilities';

export const useSgahInversionStore = () => {
	const { saldoInvertido, inversiones, inversion, gruposFinancieros } = useSelector(
		(state) => state.sgahInversion
	);
	const {
		startLoadingSaldoDisponibleA,
		startAddingSaldoDisponibleA,
		startSubtractingSaldoDisponibleA,
		saldoDisponibleA,
	} = useSgahAhorroStore();

	const dispatch = useDispatch();

	const startLoadingSaldoInvertido = async () => {
		console.log('startLoadingSaldoInvertido');
		const { data } = await sgahApi.get('inversion/v0/inversion/saldoInvertido');

		dispatch(onLoadSaldoInvertido(data));
	};

	const startLoadingInversiones = async () => {
		console.log('startLoadingInversiones');
		const { data } = await sgahApi.get('inversion/v0/inversion/detalle');

		dispatch(onLoadInversiones(data));
	};

	const startLoadingGruposFinancieros = async () => {
		console.log('startLoadingGruposFinancieros');
		const { data } = await sgahApi.get('inversion/v0/inversion/consultaApp');

		dispatch(onLoadGruposFinancieros(data));
	};

	const startSavingInversion = async (formData) => {
		console.log('startSavingInversion');

		try {
			const { status, data } = await sgahApi.post(
				'inversion/v0/inversion/operacionAgregar',
				formData
			);

			dispatch(onAddSaldoInvertido(data.inversion.monto));
			startSubtractingSaldoDisponibleA(data.inversion.monto);

			let isInversionExist = false;

			for (let inversion of inversiones) {
				if (inversion.nbAppInversion === data.inversion.nbAppInversion) {
					isInversionExist = true;
				}
			}

			if (isInversionExist) {
				dispatch(onUpdateAddMontoInversion(data.inversion));
			} else {
				dispatch(onAddInversion(data.inversion));
			}

			return {
				code: status,
				message: data.mensaje,
			};
		} catch (error) {
			console.log(error);
			return {
				code: error.code,
				message: error?.responese?.data?.mensaje,
			};
		}
	};

	const startUpdatingInversion = async (formData) => {
		console.log('startUpdatingInversion');

		try {
			const { status, data } = await sgahApi.post(
				'inversion/v0/inversion/operacionRetiro',
				formData
			);

			dispatch(onSubstractSaldoInvertido(formatCurrency(formData.monto)));
			startAddingSaldoDisponibleA(formatCurrency(formData.monto));

			dispatch(onUpdateMontoInversion(data.inversion));

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

	const startLoadingInversion = async (folio) => {
		console.log('startLoadingInversion');

		const { data } = await sgahApi.get(`inversion/v0/inversion/detalleInversion/${folio}`);
		dispatch(onLoadInversion(data));
	};

	return {
		// * Propiedades
		saldoDisponibleA,
		saldoInvertido,
		inversiones,
		gruposFinancieros,
		inversion,

		// * Metodos
		startLoadingSaldoInvertido,
		startLoadingInversiones,
		startLoadingSaldoDisponibleA,
		startLoadingGruposFinancieros,
		startSavingInversion,
		startLoadingInversion,
		startUpdatingInversion,
	};
};
