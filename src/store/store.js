import { configureStore } from '@reduxjs/toolkit';
import { sgahSliceGasto, loanSlice, sgahSliceDetalle, sgahSliceAhorro, sliceBudget } from './sgah';
import { sgahSliceInversion } from './sgah/sgahSliceInversion';
import { prestamoUiSlice, gastoUiSlice, inversionUiSlice, uiSlice } from './ui';

export const store = configureStore({
	reducer: {
		sgahDetalle: sgahSliceDetalle.reducer,
		sgahGasto: sgahSliceGasto.reducer,
		loans: loanSlice.reducer,
		sgahAhorro: sgahSliceAhorro.reducer,
        sgahInversion: sgahSliceInversion.reducer,
        sgahIngreso: sliceBudget.reducer,
		inversionUi: inversionUiSlice.reducer,
		gastoUi: gastoUiSlice.reducer,
		prestamoUi: prestamoUiSlice.reducer,
		ui: uiSlice.reducer,
	},
});
