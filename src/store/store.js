import { configureStore } from '@reduxjs/toolkit';
import { sgahSliceGasto, sgahSlicePrestamos, sgahSlice, sgahSliceAhorro } from './sgah';
import { uiSlice } from './ui/uiSlice';

export const store = configureStore({
	reducer: {
        sgah: sgahSlice.reducer,
        sgahGasto: sgahSliceGasto.reducer,
        sgahPrestamo: sgahSlicePrestamos.reducer,
        sgahAhorro: sgahSliceAhorro.reducer,
        ui: uiSlice.reducer,
	},
});
