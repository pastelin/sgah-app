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

    const styleForNewForm = useMemo(() => {
        return isShowNewFormInversion ? 'display--visible' : 'display--hidden';
    }, [isShowNewFormInversion]);

    const styleForUpdateForm = useMemo(() => {
        return isShowUpdateFormInversion
            ? 'display--visible'
            : 'display--hidden';
    }, [isShowUpdateFormInversion]);

    const handleShowNewFormInversion = (flag) => {
        dispatch(onToggleShowNewFormInversion(flag));
    };

    const handleShowUpdateFormInversion = (flag) => {
        dispatch(onToggleShowUpdateFormInversion(flag));
    };

    return {
        // * Propiedades
        // * Metodos
        styleForNewForm,
        styleForUpdateForm,
        handleShowNewFormInversion,
        handleShowUpdateFormInversion,
    };
};
