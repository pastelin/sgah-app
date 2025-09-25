import { createSlice } from '@reduxjs/toolkit';

export const gastoUiSlice = createSlice({
    name: 'gastoUi',
    initialState: {
        isHoverFlipCard: false,
    },
    reducers: {
        
        onToggleShowFlipCardGasto: (state, { payload }) => {
            state.isHoverFlipCard = payload;
        }
    },
});

export const { onToggleShowFlipCardGasto } =
    gastoUiSlice.actions;
