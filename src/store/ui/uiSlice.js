import { createSlice } from '@reduxjs/toolkit';

export const uiSlice = createSlice({
	name: 'ui',
	initialState: {
		isShowNavbar: false,
	},
	reducers: {
		onToggleShowNabvar: (state, { payload }) => {
			state.isShowNavbar = payload;
		},
	},
});

export const { onToggleShowNabvar } = uiSlice.actions;
