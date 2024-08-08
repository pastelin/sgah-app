import { createSlice } from '@reduxjs/toolkit';

export const gastoUiSlice = createSlice({
    name: 'gastoUi',
    initialState: {
        isShowFormGasto: false,
        hasPermissionEdit: true,
        isHoverFlipCard: false,
    },
    reducers: {
        onToggleShowFormGasto: (state, { payload }) => {
            state.isShowFormGasto = payload;
        },
        onToggleHasPermissionEditG: (state, { payload }) => {
            state.hasPermissionEdit = payload;
        },
        onToggleShowFlipCardGasto: (state, { payload }) => {
            state.isHoverFlipCard = payload;
        }
    },
});

export const { onToggleShowFormGasto, onToggleHasPermissionEditG, onToggleShowFlipCardGasto } =
    gastoUiSlice.actions;
