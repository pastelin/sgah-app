import { useBudgetStore } from '../store';

export const useIngresoPage = () => {
    const {
        ingresos,
        availablePercentage,
        hasPermissionEdit,
        saldoUtilizado,
        handleHasPermissionEdit,
        handleResetInitialState,
        updateState,
    } = useBudgetStore();


    // Handle input change for ingresos, with validation
    const onInputChangeIngresos = ({ target: { value } }) => {
        let parseValue = !value ? '' : parseInt(value);
        if (!isNaN(parseValue)) {
            updateState('ingresos', parseValue);
        }
    };

       

    return {
        handleHasPermissionEdit,
        hasPermissionEdit,
        availablePercentage,
        onInputChangeIngresos,
        handleResetInitialState,
        ingresos,
        saldoUtilizado,
        updateState,
    };
};
