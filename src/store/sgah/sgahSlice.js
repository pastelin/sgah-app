import { createSlice } from '@reduxjs/toolkit';
import { formatCurrency } from '../../hooks';

export const sgahSlice = createSlice({
	name: 'sgah',
	initialState: {
		hasBeenUpdated: false,
		menuList: ['Ingresos', 'Resumen', 'Ahorro', 'Gastos', 'Inversion', 'Prestamos'],
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
			state.resumen.montoGasto = formatCurrency(action.payload.gastos);
			state.resumen.montoInversion = formatCurrency(action.payload.inversion);
			state.resumen.montoPrestamo = formatCurrency(action.payload.prestamo);
		},
	},
});

export const { updateResumen } = sgahSlice.actions;
