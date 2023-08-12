import { createSlice } from '@reduxjs/toolkit';

export const ahorroUiSlice = createSlice({
	name: 'ahorroUi',
	initialState: {
		isAbleEditSaldoIngreso: true,
		isAbleEditAhorro: true,
	},
	reducers: {
		onToggleAbleEditAhorro: (state, { payload }) => {
			state.isAbleEditAhorro = payload;
		},
		onToggleAbleEditSaldoIngreso: (state, { payload }) => {
			state.isAbleEditSaldoIngreso = payload;
		},
	},
});

export const { onToggleAbleEditAhorro, onToggleAbleEditSaldoIngreso } = ahorroUiSlice.actions;
