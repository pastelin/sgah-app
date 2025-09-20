import { createSlice } from '@reduxjs/toolkit';

export const sliceBudget = createSlice({
	name: 'sgahIngreso',
	initialState: {
		ingresos: '',
		saldoUtilizado: 0,
		availablePercentage: 100,
	},
	reducers: {
		onUpdateIngresos: (state, { payload }) => {
			state.ingresos = payload;
		},
		onUpdateSaldoUtilizado: (state, { payload }) => {
			state.saldoUtilizado += payload;
		},
		onUpdateAvailablePercentage: (state, { payload }) => {
			state.availablePercentage -= payload;
		},
		onResetInitialState: (state) => {
			state.ingresos = '';
			state.saldoUtilizado = 0;
			state.availablePercentage = 100;
		},
	},
});

export const {
	onUpdateIngresos,
	onUpdateSaldoUtilizado,
	onUpdateAvailablePercentage,
	onResetInitialState,
} = sliceBudget.actions;
