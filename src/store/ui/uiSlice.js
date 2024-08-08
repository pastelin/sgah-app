import { createSlice } from '@reduxjs/toolkit';

export const uiSlice = createSlice({
    name: 'ui',
    
    initialState: {
        isShowNavbar: false,
		isShowLoader: false,
    },
    reducers: {
        onToggleShowNabvar: (state, { payload }) => {
            state.isShowNavbar = payload;
        },
        onToggleShowLoader: (state, { payload }) => {
            state.isShowLoader = payload;
        },
    },
});

export const { onToggleShowNabvar, onToggleShowLoader } = uiSlice.actions;
