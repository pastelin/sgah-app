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

    const styleForNewForm = useMemo(() => {
        return isShowNewFormPrestamo ? 'display--visible' : 'display--hidden';
    }, [isShowNewFormPrestamo]);

    const styleForUpdateForm = useMemo(() => {
        return isShowUpdateFormPrestamo
            ? 'display--visible'
            : 'display--hidden';
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
        styleForNewForm,
        styleForUpdateForm,
    };
};
