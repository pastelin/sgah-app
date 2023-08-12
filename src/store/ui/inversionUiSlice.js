import { createSlice } from '@reduxjs/toolkit';

export const inversionUiSlice = createSlice({
	name: 'inversionUi',
	initialState: {
		isShowNewFormInversion: false,
		isShowUpdateFormInversion: false,
	},
	reducers: {
		onToggleShowNewFormInversion: (state, { payload }) => {
			state.isShowNewFormInversion = payload;
		},
		onToggleShowUpdateFormInversion: (state, { payload }) => {
			state.isShowUpdateFormInversion = payload;
		},
	},
});

export const { onToggleShowNewFormInversion, onToggleShowUpdateFormInversion } =
	inversionUiSlice.actions;
