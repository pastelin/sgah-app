import { configureStore } from '@reduxjs/toolkit';
import { sgahSliceGasto, sgahSlicePrestamos, sgahSlice, sgahSliceAhorro } from './sgah';
import { uiSlice } from './ui/uiSlice';
import { sgahSliceInversion } from './sgah/sgahSliceInversion';
import { inversionUiSlice } from './ui/inversionUiSlice';

export const store = configureStore({
	reducer: {
        sgah: sgahSlice.reducer,
        sgahGasto: sgahSliceGasto.reducer,
        sgahPrestamo: sgahSlicePrestamos.reducer,
        sgahAhorro: sgahSliceAhorro.reducer,
        sgahInversion: sgahSliceInversion.reducer,
        inversionUi: inversionUiSlice.reducer,
        ui: uiSlice.reducer,
	},
});
