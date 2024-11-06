import { useDispatch, useSelector } from 'react-redux';
import { useMemo } from 'react';
import {
    onToggleHasPermissionEditG,
    onToggleShowFlipCardGasto,
    onToggleShowFormGasto,
} from '../../store/ui/gastoUiSlice';
import {
    findHistoricalBalanceByMonth,
} from '../../services';
import { onLoadHistoricalBalanceByMonth } from '../../store';

export const useGastoUi = () => {
    const { historicalBalanceByMonth } = useSelector(
        (state) => state.sgahGasto
    );

    const { isShowFormGasto, hasPermissionEdit, isHoverFlipCard } = useSelector(
        (state) => state.gastoUi
    );

    const dispatch = useDispatch();

    const styleForNewForm = useMemo(() => {
        return isShowFormGasto ? 'display--visible' : 'display--hidden';
    }, [isShowFormGasto]);

    const handleShowFormGasto = (flag) => {
        dispatch(onToggleShowFormGasto(flag));
    };

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
        } = await findHistoricalBalanceByMonth(year, month);

        dispatch(onLoadHistoricalBalanceByMonth(historicalBalance));
    };

    const calcularSaldo = (gastos, tipoMovimiento) => {
        return gastos.reduce((acc, gasto) => {
            if (gasto.tipoMovimiento === tipoMovimiento) {
                acc += gasto.saldoGastado;
            }
            return acc;
        }, 0);
    };

    return {
        // * Propiedades
        isShowFormGasto,
        hasPermissionEdit,
        styleFlipCardHover,
        historicalBalanceByMonth,
        // * Metodos
        styleForNewForm,
        isHoverFlipCard,
        handleHasPermissionEdit,
        handleShowFormGasto,
        handleShowFlipCard,
        startLoadingHistoricalBalanceByMonth,
        calcularSaldo,
    };
};
