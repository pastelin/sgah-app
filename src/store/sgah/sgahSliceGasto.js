import { createSlice } from '@reduxjs/toolkit';

const ingresoMensual = 26528;

export const sgahSliceGasto = createSlice({
    name: 'sgahGasto',
    initialState: {
        ingresoMensual: ingresoMensual,
        gastoMensualPermitido: ingresoMensual * 0.8,
        gastosRecurrentes: [],
        gastos: [],
        historicalBalanceByYear: [],
        historicalBalanceByMonth: [],
        saldoDisponible: 0,
        saldoUtilizado: 0,
    },
    reducers: {
        onLoadGastosRecurrentes: (state, action) => {
            state.gastosRecurrentes = action.payload;
        },
        onLoadGastos: (state, action) => {
            state.gastos = action.payload;
        },
        onAddNewGasto: (state, { payload }) => {
            state.gastos.push(payload);
        },
        onLoadSaldoDisponibleG: (state, { payload }) => {
            state.saldoDisponible = payload;
        },
        onLoadHistoricalBalanceByYear: (state, { payload }) => {
            state.historicalBalanceByYear = payload;
        },
        onLoadHistoricalBalanceByMonth: (state, { payload }) => {
            state.historicalBalanceByMonth = payload;
        },
        onIncrementSaldoDisponibleG: (state, { payload }) => {
            state.saldoDisponible += parseInt(payload);
        },
        onSubtractSaldoDisponibleG: (state, { payload }) => {
            state.saldoDisponible -= parseInt(payload);
        },
        onLoadSaldoUtilizadoG: (state, { payload }) => {
            state.saldoUtilizado = payload;
        },
        onIncrementSaldoUtilizadoG: (state, { payload }) => {
            state.saldoUtilizado += parseInt(payload);
        },
    },
});

export const {
    onLoadGastosRecurrentes,
    onLoadGastos,
    onLoadSaldoDisponibleG,
    onLoadSaldoUtilizadoG,
    onAddNewGasto,
    onIncrementSaldoDisponibleG,
    onSubtractSaldoDisponibleG,
    onIncrementSaldoUtilizadoG,
    onLoadHistoricalBalanceByYear,
    onLoadHistoricalBalanceByMonth,
} = sgahSliceGasto.actions;
