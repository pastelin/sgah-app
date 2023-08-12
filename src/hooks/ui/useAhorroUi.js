import { useDispatch, useSelector } from 'react-redux';
import { onToggleAbleEditAhorro, onToggleAbleEditSaldoIngreso } from '../../store/ui/ahorroUiSlice';

export const useAhorroUi = () => {
	const { isAbleEditSaldoIngreso, isAbleEditAhorro } = useSelector((state) => state.ahorroUi);

	const dispatch = useDispatch();

	const handleAbleEditAhorro = () => {
		dispatch(onToggleAbleEditAhorro(true));
	};

	const handleDisableEditAhorro = () => {
		dispatch(onToggleAbleEditAhorro(false));
	};

	const handleAbleEditSaldoIngreso = () => {
		dispatch(onToggleAbleEditSaldoIngreso(true));
	};

	const handleDisableEditSaldoIngreso = () => {
		dispatch(onToggleAbleEditSaldoIngreso(false));
	};

	return {
		// * Propiedades
		isAbleEditSaldoIngreso,
		isAbleEditAhorro,
		// * Metodos
		handleAbleEditAhorro,
		handleDisableEditAhorro,
		handleAbleEditSaldoIngreso,
		handleDisableEditSaldoIngreso,
	};
};
