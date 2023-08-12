import { useDispatch, useSelector } from 'react-redux'
import { sgahApi } from '../../backend';
import { onAddSaldoDisponibleA, onLoadAhorros, onLoadSaldoDisponibleA, onSubtractSaldoDisponibleA } from '../../store';

export const useSgahAhorroStore = () => {
	const dispatch = useDispatch();
	const { saldoDisponibleA, ahorros } = useSelector((state) => state.sgahAhorro);

	const startSavingAhorro = async (formData) => {
		console.log('startSavingAhorro');
        await sgahApi.post('ahorro/v0/ahorro/agrega', formData);
    };
    
    const startLoadingAhorros = async () => {
		console.log('startLoadingAhorros');
		const { data } = await sgahApi.get('ahorro/v0/ahorro/detalle');
		dispatch(onLoadAhorros(data));
    };
    
    const startLoadingSaldoDisponibleA = async () => {
		console.log('startLoadingSaldoDisponibleA');
        const { data } = await sgahApi.get('ahorro/v0/ahorro/saldo');
		dispatch(onLoadSaldoDisponibleA(data));
    };
    
    const startAddingSaldoDisponibleA = (saldo) => {
        console.log('startAddingSaldoDisponibleA');
        dispatch(onAddSaldoDisponibleA(saldo));
    }

    const startSubtractingSaldoDisponibleA = (saldo) => {
        console.log('startSubtractingSaldoDisponibleA');
        dispatch(onSubtractSaldoDisponibleA(saldo));
    }

	return {
		// * Propiedades
		saldoDisponibleA,
		ahorros,

		// * Metodos
		startSavingAhorro,
		startLoadingAhorros,
		startLoadingSaldoDisponibleA,
		startSubtractingSaldoDisponibleA,
		startAddingSaldoDisponibleA,
	};
};
