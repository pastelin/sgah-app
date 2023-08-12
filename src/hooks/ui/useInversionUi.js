import { useDispatch, useSelector } from 'react-redux';
import {
	onToggleShowNewFormInversion,
	onToggleShowUpdateFormInversion,
} from '../../store/ui/inversionUiSlice';
import { useMemo } from 'react';

export const useInversionUi = () => {
	const { isShowNewFormInversion, isShowUpdateFormInversion } = useSelector(
		(state) => state.inversionUi
	);

	const dispatch = useDispatch();

	const classNameNewFormInversionDisplay= useMemo(() => {
		return isShowNewFormInversion ? '' : 'display__none';
	}, [isShowNewFormInversion]);
    
    const classNameUpdateFormInversionDisplay = useMemo(() => {
		return isShowUpdateFormInversion ? '' : 'display__none';
	}, [isShowUpdateFormInversion]);

	const handleOpenNewFormInversion = () => {
		dispatch(onToggleShowNewFormInversion(true));
	};

	const handleCloseNewFormInversion = () => {
		dispatch(onToggleShowNewFormInversion(false));
	};
	
    const handleOpenUpdateFormInversion = () => {
		dispatch(onToggleShowUpdateFormInversion(true));
	};

	const handleCloseUpdateFormInversion = () => {
		dispatch(onToggleShowUpdateFormInversion(false));
	};

	return {
		// * Propiedades
		// * Metodos
		classNameNewFormInversionDisplay,
		classNameUpdateFormInversionDisplay,
		handleCloseNewFormInversion,
		handleOpenNewFormInversion,
		handleOpenUpdateFormInversion,
		handleCloseUpdateFormInversion,
	};
};
