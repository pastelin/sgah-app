import { configureStore } from '@reduxjs/toolkit';
import { sgahSliceGasto, sgahSlicePrestamos, sgahSlice } from './sgah';

export const store = configureStore({
	reducer: {
        sgah: sgahSlice.reducer,
        sgahGasto: sgahSliceGasto.reducer,
        sgahPrestamo: sgahSlicePrestamos.reducer,
	},
});
