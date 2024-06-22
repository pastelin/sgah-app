import { createSlice } from '@reduxjs/toolkit';

const ingresoMensual = 25000;

export const sgahSliceGasto = createSlice({
    name: 'sgahGasto',
    initialState: {
        ingresoMensual: ingresoMensual,
        gastoMensualPermitido: ingresoMensual * 0.8,
        gastosRecurrentes: [],
        gastos: [],
        historicalBalanceByMonths: [],
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
        onLoadHistoricalBalanceByMonths: (state, { payload }) => {
            state.historicalBalanceByMonths = payload;
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
    onLoadHistoricalBalanceByMonths,
    onLoadHistoricalBalanceByMonth,
} = sgahSliceGasto.actions;
