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

    const styleDisplayNewFormInversion = useMemo(() => {
        return isShowNewFormInversion ? '' : 'display__none';
    }, [isShowNewFormInversion]);

    const styleDisplayUpdateFormInversion = useMemo(() => {
        return isShowUpdateFormInversion ? '' : 'display__none';
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
        styleDisplayNewFormInversion,
        styleDisplayUpdateFormInversion,
        handleShowNewFormInversion,
        handleShowUpdateFormInversion,
    };
};
