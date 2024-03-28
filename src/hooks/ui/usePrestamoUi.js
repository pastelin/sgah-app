import { useDispatch, useSelector } from 'react-redux';
import { useMemo } from 'react';
import {
    onToggleShowNewFormPrestamo,
    onToggleShowUpdateFormPrestamo,
} from '../../store/ui/prestamoUiSlice';

export const usePrestamoUi = () => {
    const dispatch = useDispatch();

    const { isShowNewFormPrestamo, isShowUpdateFormPrestamo } = useSelector(
        (state) => state.prestamoUi
    );

    const styleDisplayNoneAdd = useMemo(() => {
        return isShowNewFormPrestamo ? '' : 'display__none';
    }, [isShowNewFormPrestamo]);

    const styleDisplayNoneUpdate = useMemo(() => {
        return isShowUpdateFormPrestamo ? '' : 'display__none';
    }, [isShowUpdateFormPrestamo]);

    const handleShowNewFormPrestamo = (flag) => {
        dispatch(onToggleShowNewFormPrestamo(flag));
    };

    const handleShowUpdateFormPrestamo = (flag) => {
        dispatch(onToggleShowUpdateFormPrestamo(flag));
    };

    return {
        // * Propiedades
        // * Metodos
        handleShowNewFormPrestamo,
        handleShowUpdateFormPrestamo,
        styleDisplayNoneAdd,
        styleDisplayNoneUpdate,
    };
};
