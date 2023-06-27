import { configureStore } from '@reduxjs/toolkit';
import { sgahSliceGasto, sgahSlicePrestamos, sgahSlice } from './sgah';
import { uiSlice } from './ui/uiSlice';

export const store = configureStore({
	reducer: {
        sgah: sgahSlice.reducer,
        sgahGasto: sgahSliceGasto.reducer,
        sgahPrestamo: sgahSlicePrestamos.reducer,
        ui: uiSlice.reducer,
	},
});
