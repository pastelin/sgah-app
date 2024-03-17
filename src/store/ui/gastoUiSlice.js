import { createSlice } from '@reduxjs/toolkit';

export const gastoUiSlice = createSlice({
    name: 'gastoUi',
    initialState: {
        isShowFormGasto: false,
        hasPermissionEdit: true,
    },
    reducers: {
        onToggleShowFormGasto: (state, { payload }) => {
            state.isShowFormGasto = payload;
        },
        onToggleHasPermissionEditG: (state, { payload }) => {
            state.hasPermissionEdit = payload;
        },
    },
});

export const { onToggleShowFormGasto, onToggleHasPermissionEditG } =
    gastoUiSlice.actions;
