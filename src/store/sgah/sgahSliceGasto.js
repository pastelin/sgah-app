import { createSlice } from '@reduxjs/toolkit';

export const sgahSliceGasto = createSlice({
    name: 'sgahGasto',
    initialState: {
        categoriasGasto: [{}],
        gastos: [{}],
        saldoDisponible: 0,
        saldoUtilizado: 0,
    },
    reducers: {
        onLoadCategoriasGasto: (state, action) => {
            state.categoriasGasto = action.payload;
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
    onLoadCategoriasGasto,
    onLoadGastos,
    onLoadSaldoDisponibleG,
    onLoadSaldoUtilizadoG,
    onAddNewGasto,
    onIncrementSaldoDisponibleG,
    onSubtractSaldoDisponibleG,
    onIncrementSaldoUtilizadoG,
} = sgahSliceGasto.actions;
