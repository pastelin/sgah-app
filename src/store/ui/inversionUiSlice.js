import { createSlice } from '@reduxjs/toolkit';

export const inversionUiSlice = createSlice({
	name: 'inversionUi',
	initialState: {
		isNewFormInversionOpen: false,
		isUpdateFormInversionOpen: false,
	},
	reducers: {
        onToggleNewFormInversion: (state, { payload }) => {
            state.isNewFormInversionOpen = payload;
        },
        onToggleUpdateFormInversion: (state, { payload }) => {
            state.isUpdateFormInversionOpen = payload;
        },
	},
});

export const {
    onToggleNewFormInversion,
    onToggleUpdateFormInversion
} = inversionUiSlice.actions;