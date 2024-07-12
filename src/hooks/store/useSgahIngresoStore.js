import { useDispatch, useSelector } from 'react-redux';
import {
    onResetInitialState,
    onToggleHasPermissionEdit,
    onUpdateAvailablePercentage,
    onUpdateIngresos,
    onUpdateSaldoUtilizado,
} from '../../store';
import { useCallback } from 'react';

export const useSgahIngresoStore = () => {
    const dispatch = useDispatch();
    const { ingresos, saldoUtilizado, availablePercentage, hasPermissionEdit } =
        useSelector((state) => state.sgahIngreso);

    // Mapeo de acciones a funciones de actualización
    const actionHandlers = {
        ingresos: onUpdateIngresos,
        saldoUtilizado: onUpdateSaldoUtilizado,
        availablePercentage: onUpdateAvailablePercentage,
    };

    const updateState = useCallback(
        (action, value) => {
            console.log(`Updating ${action}`);
            const handler = actionHandlers[action];
            if (handler) {
                dispatch(handler(value));
            } else {
                console.warn('Action not recognized');
            }
        },
        [dispatch]
    );

    const handleHasPermissionEdit = useCallback(
        (flag) => {
            dispatch(onToggleHasPermissionEdit(flag));
        },
        [dispatch]
    );

    const handleResetInitialState = useCallback(() => {
        dispatch(onResetInitialState());
    }, [dispatch]);

    return {
        ingresos,
        saldoUtilizado,
        availablePercentage,
        hasPermissionEdit,
        handleHasPermissionEdit,
        handleResetInitialState,
        updateState,
    };
};
