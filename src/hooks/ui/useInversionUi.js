import { useDispatch, useSelector } from 'react-redux';
import { onToggleNewFormInversion, onToggleUpdateFormInversion } from '../../store/ui/inversionUiSlice';
import { useMemo } from 'react';

export const useInversionUi = () => {
	const { isNewFormInversionOpen, isUpdateFormInversionOpen } = useSelector(
		(state) => state.inversionUi
	);

	const dispatch = useDispatch();

	const hideFormNewInversionClass = useMemo(() => {
		return isNewFormInversionOpen ? '' : 'display__none';
    }, [isNewFormInversionOpen]);
    
    const hideFormUpdateInversionClass = useMemo(() => {
		return isUpdateFormInversionOpen ? '' : 'display__none';
	}, [isUpdateFormInversionOpen]);

	const handleOpenNewForm = () => {
		dispatch(onToggleNewFormInversion(true));
	};

	const handleCloseNewForm = () => {
		dispatch(onToggleNewFormInversion(false));
	};
	
    const handleOpenUpdateForm = () => {
		dispatch(onToggleUpdateFormInversion(true));
	};

	const handleCloseUpdateForm = () => {
		dispatch(onToggleUpdateFormInversion(false));
	};

	return {
		// * Propiedades
        isNewFormInversionOpen,
        isUpdateFormInversionOpen,
		// * Metodos
        hideFormNewInversionClass,
        hideFormUpdateInversionClass,
		handleCloseNewForm,
		handleOpenNewForm,
		handleOpenUpdateForm,
		handleCloseUpdateForm,
	};
};
