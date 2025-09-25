import { useBudgetStore } from '../store';

export const useIngresoPage = () => {
    const {
        ingresos,
        availablePercentage,
        saldoUtilizado,
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
        availablePercentage,
        onInputChangeIngresos,
        handleResetInitialState,
        ingresos,
        saldoUtilizado,
        updateState,
    };
};
