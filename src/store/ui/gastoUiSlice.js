import { createSlice } from '@reduxjs/toolkit';

export const gastoUiSlice = createSlice({
	name: 'gastoUi',
	initialState: {
		isShowFormGasto: false,
		hasPermissionEdit: true,
		selectedFilterGasto: '',
	},
	reducers: {
		onToggleShowFormGasto: (state, { payload }) => {
			state.isShowFormGasto = payload;
		},
		onToggleHasPermissionEditG: (state, { payload }) => {
			state.hasPermissionEdit = payload;
		},
		onUpdateSelectedFilterGasto: (state, { payload }) => {
			state.selectedFilterGasto = payload;
		},
	},
});

export const { onToggleShowFormGasto, onToggleHasPermissionEditG, onUpdateSelectedFilterGasto } =
	gastoUiSlice.actions;
