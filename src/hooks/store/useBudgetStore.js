import { useDispatch, useSelector } from 'react-redux';
import {
    onResetInitialState,
    onUpdateAvailablePercentage,
    onUpdateIngresos,
    onUpdateSaldoUtilizado,
} from '../../store';
import { useCallback } from 'react';

export const useBudgetStore = () => {
    const dispatch = useDispatch();
    const { ingresos, saldoUtilizado, availablePercentage } =
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


    const handleResetInitialState = useCallback(() => {
        dispatch(onResetInitialState());
    }, [dispatch]);

    return {
        ingresos,
        saldoUtilizado,
        availablePercentage,
        handleResetInitialState,
        updateState,
    };
};
