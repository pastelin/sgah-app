import { useMemo, useState } from 'react';
import { useSgahIngresoStore } from '../store';

export const useIngresoPage = () => {
    const {
        ingresos,
        availablePercentage,
        hasPermissionEdit,
        saldoUtilizado,
        handleHasPermissionEdit,
        handleResetInitialState,
        updateState,
    } = useSgahIngresoStore();

    const [isHoverFlipCard, setIsHoverFlipCard] = useState(false);

    // Toggle the flip card hover state
    const onToggleFlipCard = () => {
        setIsHoverFlipCard(!isHoverFlipCard);
    };

    // Handle input change for ingresos, with validation
    const onInputChangeIngresos = ({ target: { value } }) => {
        let parseValue = !value ? '' : parseInt(value);
        if (!isNaN(parseValue)) {
            updateState('ingresos', parseValue);
        }
    };

    // Memoize the class name for flip card hover effect
    const styleFlipCardHover = useMemo(() => {
        return isHoverFlipCard ? 'flip-card-hover' : '';
    }, [isHoverFlipCard]);

    return {
        handleHasPermissionEdit,
        hasPermissionEdit,
        availablePercentage,
        onInputChangeIngresos,
        handleResetInitialState,
        onToggleFlipCard,
        ingresos,
        saldoUtilizado,
        styleFlipCardHover,
        updateState,
    };
};
