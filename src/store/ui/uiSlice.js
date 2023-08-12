import { createSlice } from '@reduxjs/toolkit';

export const uiSlice = createSlice({
	name: 'ui',
	initialState: {
		isShowNavbar: false,
		menuSelected: 'Inversion',
	},
	reducers: {
		onToggleShowNabvar: (state, { payload }) => {
			state.isShowNavbar = payload;
		},
		onUpdateMenuSelected: (state, action) => {
			state.menuSelected = action.payload;
		},
	},
});

export const { onToggleShowNabvar, onUpdateMenuSelected } = uiSlice.actions;
