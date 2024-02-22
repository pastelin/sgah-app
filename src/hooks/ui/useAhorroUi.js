import { useDispatch, useSelector } from 'react-redux';
import { onToggleAbleEditAhorro } from '../../store/ui/ahorroUiSlice';

export const useAhorroUi = () => {
	const {isAbleEditAhorro } = useSelector((state) => state.ahorroUi);

	const dispatch = useDispatch();

	const handleAbleEditAhorro = () => {
		dispatch(onToggleAbleEditAhorro(true));
	};

	const handleDisableEditAhorro = () => {
		dispatch(onToggleAbleEditAhorro(false));
	};

	return {
		// * Propiedades
		isAbleEditAhorro,
		// * Metodos
		handleAbleEditAhorro,
		handleDisableEditAhorro,
	};
};
