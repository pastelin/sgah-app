import { useDispatch } from 'react-redux';
import { onOpenFormNewPrestamo } from '../store';

export const usePrestamos = () => {
	
	const dispatch = useDispatch();

	const handleOpenFormNewPrestamo = () => {
		dispatch(onOpenFormNewPrestamo());
	};

	return {
		//* Metodos
		handleOpenFormNewPrestamo,
	};
};
