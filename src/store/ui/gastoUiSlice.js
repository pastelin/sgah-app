import { createSlice } from '@reduxjs/toolkit';

export const gastoUiSlice = createSlice({
	name: 'gastoUi',
	initialState: {
		isShowFormGasto: false,
		isAbleEditGasto: true,
		selectedFilterGasto: '',
	},
	reducers: {
		onToggleShowFormGasto: (state, { payload }) => {
			state.isShowFormGasto = payload;
		},
		onToggleAbleEditGasto: (state, { payload }) => {
			state.isAbleEditGasto = payload;
		},
		onUpdateSelectedFilterGasto: (state, { payload }) => {
			state.selectedFilterGasto = payload;
		},
	},
});

export const { onToggleShowFormGasto, onToggleAbleEditGasto, onUpdateSelectedFilterGasto } =
	gastoUiSlice.actions;
