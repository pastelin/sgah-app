import { createSlice } from '@reduxjs/toolkit';

export const sgahSliceAhorro = createSlice({
    name: 'sgahAhorro',
    initialState: {
        ahorros: [{}],
        saldoDisponibleA: 0,
    },
    reducers: {
        onLoadAhorros: (state, action) => {
            state.ahorros = action.payload;
        },
        onLoadSaldoDisponibleA: (state, action) => {
            state.saldoDisponibleA = action.payload;
        },
        onAddSaldoDisponibleA: (state, { payload }) => {
            state.saldoDisponibleA += parseInt(payload);
        },
        onSubtractSaldoDisponibleA: (state, { payload }) => {
            state.saldoDisponibleA -= parseInt(payload);
        },
    },
});

export const {
    onLoadAhorros,
    onLoadSaldoDisponibleA,
    onAddSaldoDisponibleA,
    onSubtractSaldoDisponibleA,
} = sgahSliceAhorro.actions;
