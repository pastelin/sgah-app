import { createSlice } from '@reduxjs/toolkit';

export const ahorroUiSlice = createSlice({
    name: 'ahorroUi',
    initialState: {
        hasPermissionEdit: true,
    },
    reducers: {
        onToggleHasPermissionEditA: (state, { payload }) => {
            state.hasPermissionEdit = payload;
        },
    },
});

export const { onToggleHasPermissionEditA } = ahorroUiSlice.actions;
