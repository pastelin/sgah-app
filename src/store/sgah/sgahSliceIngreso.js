import { createSlice } from '@reduxjs/toolkit';

export const sgahSliceIngreso = createSlice({
	name: 'sgahIngreso',
	initialState: {
		ingresos: '',
		saldoUtilizado: 0,
		availablePercentage: 100,
		hasPermissionEdit: true,
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
			state.hasPermissionEdit = true;
		},
		onToggleHasPermissionEdit: (state, { payload }) => {
			state.hasPermissionEdit = payload;
		},
	},
});

export const {
	onUpdateIngresos,
	onUpdateSaldoUtilizado,
	onUpdateAvailablePercentage,
	onToggleHasPermissionEdit,
	onResetInitialState,
} = sgahSliceIngreso.actions;
