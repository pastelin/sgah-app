import { createSlice } from '@reduxjs/toolkit';

export const sgahSliceAhorro = createSlice({
	name: 'sgahAhorro',
	initialState: {
		ahorros: [{}],
		saldoDisponible: 0,
	},
	reducers: {
		onLoadAhorros: (state, action) => {
			state.ahorros = action.payload;
		},
		onLoadSaldoDisponibleA: (state, action) => {
			state.saldoDisponible = action.payload;
		},
		onAddSaldoDisponibleA: (state, { payload }) => {
			state.saldoDisponible += parseInt(payload);
		},
		onSubtractSaldoDisponibleA: (state, { payload }) => {
			state.saldoDisponible -= parseInt(payload);
		},
	},
});

export const {
	onLoadAhorros,
	onLoadSaldoDisponibleA,
	onAddSaldoDisponibleA,
	onSubtractSaldoDisponibleA,
} = sgahSliceAhorro.actions;
