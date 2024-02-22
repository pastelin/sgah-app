import { useDispatch, useSelector } from 'react-redux';
import {
    onResetInitialState,
	onToggleHasPermissionEdit,
	onUpdateAvailablePercentage,
	onUpdateIngresos,
	onUpdateSaldoUtilizado,
} from '../../store';

export const useSgahIngresoStore = () => {
	const dispatch = useDispatch();
	const {
		ingresos,
		saldoUtilizado,
		availablePercentage,
		hasPermissionEdit,
	} = useSelector((state) => state.sgahIngreso);

	const startUpdatingIngresos = (value) => {
		console.log('startUpdatingIngresos');
		dispatch(onUpdateIngresos(value));
	};

	const startUpdatingSaldoUtilizado = (value) => {
		console.log('startUpdatingSaldoUtilizado');
		dispatch(onUpdateSaldoUtilizado(value));
	};

	const startUpdatingAvailablePercentage = (value) => {
		console.log('startUpdatingAvailablePercentage');
		dispatch(onUpdateAvailablePercentage(value));
	};

	const handleHasPermissionEdit = (flag) => {
		dispatch(onToggleHasPermissionEdit(flag));
    };
    
    const handleResetInitialState = () => {
        dispatch(onResetInitialState());
    }

	return {
		ingresos,
		saldoUtilizado,
		availablePercentage,
		hasPermissionEdit,
		startUpdatingIngresos,
		startUpdatingSaldoUtilizado,
		startUpdatingAvailablePercentage,
		handleHasPermissionEdit,
		handleResetInitialState,
	};
};
