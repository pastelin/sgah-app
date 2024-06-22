import { useDispatch, useSelector } from 'react-redux';
import { useMemo, useState } from 'react';
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

        let historicalBalanceByMonth = [];

        for (let i = 0; i < gastosRecurrentes.length; i++) {
            let cdGasto = gastosRecurrentes[i].cdGasto;

            let getGastoByCategoria = gastos.filter(
                (gasto) =>
                    gasto.gastoRecurrente.cdGasto != 11 &&
                    gasto.gastoRecurrente.cdGasto === cdGasto
            );

            if (getGastoByCategoria.length >= 1) {
                let saldoGastado = getGastoByCategoria.reduce(
                    (acc, gasto) => acc + gasto.monto,
                    0
                );

                historicalBalanceByMonth.push({
                    categoria: gastosRecurrentes[i].nbGasto,
                    saldoGastado,
                    tipoMovimiento:
                        getGastoByCategoria[0].tipoMovimiento.cdTipo,
                });
            }
        }

        return historicalBalanceByMonth;
    };

    const calcularSaldoGastado = (gastos) => {
        return gastos
            .filter((gasto) => gasto.tipoMovimiento === 2)
            .reduce((acc, gasto) => acc + gasto.saldoGastado, 0);
    };

    const calcularIngresos = (gastos) => {
        return gastos
            .filter((gasto) => gasto.tipoMovimiento === 1)
            .reduce((acc, gasto) => acc + gasto.saldoGastado, 0);
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
