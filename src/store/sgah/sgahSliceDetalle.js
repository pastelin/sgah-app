import { createSlice } from '@reduxjs/toolkit';
import { formatCurrency } from '../../hooks';

export const sgahSliceDetalle = createSlice({
	name: 'sgahDetalle',
	initialState: {
		resumen: {
			montoAhorro: '$0.0',
			montoGasto: '$0.0',
			montoInversion: '$0.0',
			montoPrestamo: '$0.0',
		},
	},
	reducers: {
		updateResumen: (state, action) => {
			state.resumen.montoAhorro = formatCurrency(action.payload.ahorro);
			state.resumen.montoGasto = formatCurrency(action.payload.gasto);
			state.resumen.montoInversion = formatCurrency(action.payload.inversion);
			state.resumen.montoPrestamo = formatCurrency(action.payload.prestamo);
		},
	},
});

export const { updateResumen } = sgahSliceDetalle.actions;
