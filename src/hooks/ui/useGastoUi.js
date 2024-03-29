import { useDispatch, useSelector } from 'react-redux';
import { useMemo } from 'react';
import {
    onToggleHasPermissionEditG,
    onToggleShowFormGasto,
} from '../../store/ui/gastoUiSlice';

export const useGastoUi = () => {
    const dispatch = useDispatch();

    const { isShowFormGasto, hasPermissionEdit } = useSelector(
        (state) => state.gastoUi
    );

    const styleDisplayNone = useMemo(() => {
        return isShowFormGasto ? '' : 'display--none';
    }, [isShowFormGasto]);

    const handleShowFormGasto = (flag) => {
        dispatch(onToggleShowFormGasto(flag));
    };

    const handleHasPermissionEdit = (flag) => {
        dispatch(onToggleHasPermissionEditG(flag));
    };

    return {
        // * Propiedades
        isShowFormGasto,
        hasPermissionEdit,
        // * Metodos
        styleDisplayNone,
        handleHasPermissionEdit,
        handleShowFormGasto,
    };
};
