import { createSlice } from '@reduxjs/toolkit';

export const prestamoUiSlice = createSlice({
	name: 'prestamoUi',
	initialState: {
		isShowNewFormPrestamo: false,
		isShowUpdateFormPrestamo: false,
	},
	reducers: {
		onToggleShowNewFormPrestamo: (state, { payload }) => {
			state.isShowNewFormPrestamo = payload;
		},
		onToggleShowUpdateFormPrestamo: (state, { payload }) => {
			state.isShowUpdateFormPrestamo = payload;
		},
	},
});

export const { onToggleShowNewFormPrestamo, onToggleShowUpdateFormPrestamo } =
	prestamoUiSlice.actions;
