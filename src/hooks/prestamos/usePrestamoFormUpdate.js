import { useDispatch, useSelector } from 'react-redux';
import { useMemo } from 'react';
import { onCloseFormUpdatePrestamo } from '../../store';

export const usePrestamoFormUpdate = () => {

	const dispatch = useDispatch();

	const { isFormUpdatePrestamoOpen } = useSelector((state) => state.ui);

	const hideFormUpdatePrestamoClass = useMemo(() => {
		return isFormUpdatePrestamoOpen ? '' : 'display__none';
	}, [isFormUpdatePrestamoOpen]);

	const handleCloseUpdateFormPrestamo = () => {
		dispatch(onCloseFormUpdatePrestamo());
	};

	return {
		hideFormUpdatePrestamoClass,
		handleCloseUpdateFormPrestamo,
	};
};
