import { useMemo, useState } from 'react';
import { useSgahIngresoStore } from '../store';

export const useIngresoPage = () => {
    const {
        ingresos,
        availablePercentage,
        hasPermissionEdit,
        saldoUtilizado,
        startUpdatingSaldoUtilizado,
        handleHasPermissionEdit,
        startUpdatingAvailablePercentage,
        handleResetInitialState,
        startUpdatingIngresos,
    } = useSgahIngresoStore();

    const [isHoverFlipCard, setIsHoverFlipCard] = useState(false);

    const onToggleFlipCard = () => {
        setIsHoverFlipCard(!isHoverFlipCard);
    };

    const onInputChangeIngresos = ({ target: { value } }) => {
        let parseValue = !value ? '' : parseInt(value);
        startUpdatingIngresos(parseValue);
    };

    const styleFlipCardHover = useMemo(() => {
        return isHoverFlipCard ? 'flip-card-hover' : '';
    }, [isHoverFlipCard]);

    return {
        handleHasPermissionEdit,
        startUpdatingSaldoUtilizado,
        startUpdatingAvailablePercentage,
        hasPermissionEdit,
        availablePercentage,
        onInputChangeIngresos,
        handleResetInitialState,
        onToggleFlipCard,
        ingresos,
        saldoUtilizado,
        styleFlipCardHover,
    };
};
