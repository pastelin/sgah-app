import { createSlice } from '@reduxjs/toolkit';

export const gastoUiSlice = createSlice({
    name: 'gastoUi',
    initialState: {
        hasPermissionEdit: true,
        isHoverFlipCard: false,
    },
    reducers: {
        
        onToggleHasPermissionEditG: (state, { payload }) => {
            state.hasPermissionEdit = payload;
        },
        onToggleShowFlipCardGasto: (state, { payload }) => {
            state.isHoverFlipCard = payload;
        }
    },
});

export const { onToggleHasPermissionEditG, onToggleShowFlipCardGasto } =
    gastoUiSlice.actions;
