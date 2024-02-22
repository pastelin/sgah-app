import { createSlice } from '@reduxjs/toolkit';

export const ahorroUiSlice = createSlice({
	name: 'ahorroUi',
	initialState: {
		isAbleEditAhorro: true,
	},
	reducers: {
		onToggleAbleEditAhorro: (state, { payload }) => {
			state.isAbleEditAhorro = payload;
		},
	},
});

export const { onToggleAbleEditAhorro } = ahorroUiSlice.actions;
