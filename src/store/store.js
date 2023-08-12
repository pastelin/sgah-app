import { configureStore } from '@reduxjs/toolkit';
import { sgahSliceGasto, sgahSlicePrestamos, sgahSlice, sgahSliceAhorro } from './sgah';
import { uiSlice } from './ui/uiSlice';
import { sgahSliceInversion } from './sgah/sgahSliceInversion';
import { inversionUiSlice } from './ui/inversionUiSlice';
import { gastoUiSlice } from './ui/gastoUiSlice';
import { prestamoUiSlice } from './ui/prestamoUiSlice';

export const store = configureStore({
	reducer: {
		sgah: sgahSlice.reducer,
		sgahGasto: sgahSliceGasto.reducer,
		sgahPrestamo: sgahSlicePrestamos.reducer,
		sgahAhorro: sgahSliceAhorro.reducer,
		sgahInversion: sgahSliceInversion.reducer,
		inversionUi: inversionUiSlice.reducer,
		gastoUi: gastoUiSlice.reducer,
		prestamoUi: prestamoUiSlice.reducer,
		ui: uiSlice.reducer,
	},
});
