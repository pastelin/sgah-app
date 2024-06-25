import { useDispatch, useSelector } from 'react-redux';
import { useMemo } from 'react';
import {
    onToggleHasPermissionEditG,
    onToggleShowFlipCardGasto,
    onToggleShowFormGasto,
    onToggleShowLoaderGasto,
} from '../../store/ui/gastoUiSlice';
import { findGastosByMonth } from '../../services';
import { onLoadHistoricalBalanceByMonth } from '../../store';

export const useGastoUi = () => {
    const { historicalBalanceByMonth, gastosRecurrentes } = useSelector(
        (state) => state.sgahGasto
    );

    const {
        isShowFormGasto,
        hasPermissionEdit,
        isShowLoaderGasto,
        isHoverFlipCard,
    } = useSelector((state) => state.gastoUi);

    const dispatch = useDispatch();

    const styleDisplayNone = useMemo(() => {
        return isShowFormGasto ? '' : 'display--none';
    }, [isShowFormGasto]);

    const handleShowFormGasto = (flag) => {
        dispatch(onToggleShowFormGasto(flag));
    };

    const handleHasPermissionEdit = (flag) => {
        dispatch(onToggleHasPermissionEditG(flag));
    };

    const handleShowLoaderGasto = (flag) => {
        dispatch(onToggleShowLoaderGasto(flag));
    };

    const styleFlipCardHover = useMemo(() => {
        return isHoverFlipCard ? 'flip-card-hover' : '';
    }, [isHoverFlipCard]);

    const handleShowFlipCard = (flag) => {
        console.log('handleShowFlipCard');
        dispatch(onToggleShowFlipCardGasto(flag));
    };

    const startLoadingGastosByHistoricalMonth = async (year, month) => {
        console.log('startLoadingGastosByHistoricalMonth');
        const {
            data: { gastos },
        } = await findGastosByMonth(year, month);
        dispatch(
            onLoadHistoricalBalanceByMonth(getHistoricalBalanceByMonth(gastos))
        );
    };

    const getHistoricalBalanceByMonth = (gastos) => {
        console.log('getHistoricalBalanceByMonth');

        // Agrupar gastos por cdGasto, excluyendo el cdGasto 11 y sumando montos
        const gastosAgrupados = gastos.reduce((acc, gasto) => {
            if (gasto.gastoRecurrente.cdGasto !== 11) {
                const { cdGasto } = gasto.gastoRecurrente;
                if (!acc.has(cdGasto)) {
                    acc.set(cdGasto, {
                        saldoGastado: 0,
                        tipoMovimiento: gasto.tipoMovimiento.cdTipo,
                    });
                }
                acc.get(cdGasto).saldoGastado += gasto.monto;
            }
            return acc;
        }, new Map());

        // Construir el resultado final basado en gastosRecurrentes y los gastos agrupados
        let historicalBalanceByMonth = gastosRecurrentes.reduce(
            (acc, gastoRecurrente) => {
                if (gastosAgrupados.has(gastoRecurrente.cdGasto)) {
                    const gastoAgrupado = gastosAgrupados.get(
                        gastoRecurrente.cdGasto
                    );
                    acc.push({
                        categoria: gastoRecurrente.nbGasto,
                        saldoGastado: gastoAgrupado.saldoGastado,
                        tipoMovimiento: gastoAgrupado.tipoMovimiento,
                    });
                }
                return acc;
            },
            []
        );

        return historicalBalanceByMonth;
    };

    const calcularSaldoGastado = (gastos) => {
        return gastos.reduce((acc, gasto) => {
            if (gasto.tipoMovimiento === 2) {
                acc += gasto.saldoGastado;
            }
            return acc;
        }, 0);
    };

    const calcularIngresos = (gastos) => {
        return gastos.reduce((acc, gasto) => {
            if (gasto.tipoMovimiento === 1) {
                acc += gasto.saldoGastado;
            }
            return acc;
        }, 0);
    };

    return {
        // * Propiedades
        isShowFormGasto,
        hasPermissionEdit,
        isShowLoaderGasto,
        styleFlipCardHover,
        historicalBalanceByMonth,
        // * Metodos
        styleDisplayNone,
        isHoverFlipCard,
        handleHasPermissionEdit,
        handleShowFormGasto,
        handleShowLoaderGasto,
        handleShowFlipCard,
        startLoadingGastosByHistoricalMonth,
        calcularSaldoGastado,
        calcularIngresos,
    };
};
