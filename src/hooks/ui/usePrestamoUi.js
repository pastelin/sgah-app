import { useDispatch, useSelector } from 'react-redux';
import { useMemo } from 'react';
import {
	onToggleShowNewFormPrestamo,
	onToggleShowUpdateFormPrestamo,
} from '../../store/ui/prestamoUiSlice';

export const usePrestamoUi = () => {
	const { isShowNewFormPrestamo, isShowUpdateFormPrestamo } = useSelector(
		(state) => state.prestamoUi
	);

	const dispatch = useDispatch();

	const classNameNewFormPrestamoDisplay = useMemo(() => {
		return isShowNewFormPrestamo ? '' : 'display__none';
	}, [isShowNewFormPrestamo]);

	const classNameUpdateFormPrestamoDisplay = useMemo(() => {
		return isShowUpdateFormPrestamo ? '' : 'display__none';
	}, [isShowUpdateFormPrestamo]);

	const handleOpenNewFormPrestamo = () => {
		dispatch(onToggleShowNewFormPrestamo(true));
	};

	const handleCloseNewFormPrestamo = () => {
		dispatch(onToggleShowNewFormPrestamo(false));
	};

	const handleOpenUpdateFormPrestamo = () => {
		dispatch(onToggleShowUpdateFormPrestamo(true));
	};

	const handleCloseUpdateFormPrestamo = () => {
		dispatch(onToggleShowUpdateFormPrestamo(false));
	};

	return {
		// * Propiedades
		// * Metodos
		handleOpenNewFormPrestamo,
		handleCloseNewFormPrestamo,
		handleOpenUpdateFormPrestamo,
		handleCloseUpdateFormPrestamo,
		classNameNewFormPrestamoDisplay,
		classNameUpdateFormPrestamoDisplay,
	};
};
