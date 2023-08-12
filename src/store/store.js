import { configureStore } from '@reduxjs/toolkit';
import { sgahSliceGasto, sgahSlicePrestamos, sgahSlice, sgahSliceAhorro } from './sgah';
import { sgahSliceInversion } from './sgah/sgahSliceInversion';
import { ahorroUiSlice, prestamoUiSlice, gastoUiSlice, inversionUiSlice, uiSlice } from './ui';

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
		ahorroUi: ahorroUiSlice.reducer,
		ui: uiSlice.reducer,
	},
});
