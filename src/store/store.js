import { configureStore } from '@reduxjs/toolkit';
import { sgahSliceGasto, sgahSlicePrestamos, sgahSliceDetalle, sgahSliceAhorro, sgahSliceIngreso } from './sgah';
import { sgahSliceInversion } from './sgah/sgahSliceInversion';
import { ahorroUiSlice, prestamoUiSlice, gastoUiSlice, inversionUiSlice, uiSlice } from './ui';

export const store = configureStore({
	reducer: {
		sgahDetalle: sgahSliceDetalle.reducer,
		sgahGasto: sgahSliceGasto.reducer,
		sgahPrestamo: sgahSlicePrestamos.reducer,
		sgahAhorro: sgahSliceAhorro.reducer,
        sgahInversion: sgahSliceInversion.reducer,
        sgahIngreso: sgahSliceIngreso.reducer,
		inversionUi: inversionUiSlice.reducer,
		gastoUi: gastoUiSlice.reducer,
		prestamoUi: prestamoUiSlice.reducer,
		ahorroUi: ahorroUiSlice.reducer,
		ui: uiSlice.reducer,
	},
});
