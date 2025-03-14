import { useDispatch, useSelector } from 'react-redux';
import { useMemo } from 'react';
import {
    onToggleHasPermissionEditG,
    onToggleShowFlipCardGasto,
} from '../../store/ui/gastoUiSlice';
import { findMonthlyBalanceHistory } from '../../services';
import { loadMonthlyBalanceHistory } from '../../store';

export const useGastoUi = () => {
    
    const dispatch = useDispatch();
    
    const { monthlyBalanceHistory } = useSelector(
        (state) => state.sgahGasto
    );

    const { hasPermissionEdit, isHoverFlipCard } = useSelector(
        (state) => state.gastoUi
    );


    const handleHasPermissionEdit = (flag) => {
        dispatch(onToggleHasPermissionEditG(flag));
    };

    const styleFlipCardHover = useMemo(() => {
        return isHoverFlipCard ? 'flip-card-hover' : '';
    }, [isHoverFlipCard]);

    const handleShowFlipCard = (flag) => {
        console.log('handleShowFlipCard');
        dispatch(onToggleShowFlipCardGasto(flag));
    };

    const startLoadingHistoricalBalanceByMonth = async (year, month) => {
        console.log('startLoadingHistoricalBalanceByMonth');
        const {
            data: { historicalBalance },
        } = await findMonthlyBalanceHistory(year, month);

        dispatch(loadMonthlyBalanceHistory(historicalBalance));
    };

    const calcularSaldo = (expenses, origenMovimiento) => {
        return expenses.reduce((acc, gasto) => {
            if (gasto.origenMovimiento === origenMovimiento) {
                acc += gasto.saldoGastado;
            }
            return acc;
        }, 0);
    };

    return {
        // * Propiedades
        hasPermissionEdit,
        styleFlipCardHover,
        monthlyBalanceHistory,
        // * Metodos
        isHoverFlipCard,
        handleHasPermissionEdit,
        handleShowFlipCard,
        startLoadingHistoricalBalanceByMonth,
        calcularSaldo,
    };
};
