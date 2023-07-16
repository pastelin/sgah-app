import { createSlice } from '@reduxjs/toolkit';
import { formatCurrency } from '../../hooks';

export const sgahSlicePrestamos = createSlice({ 
	name: 'sgahPrestamo',
	initialState: {
		filtro: ['Listar todo', 'Estatus'],
		prestamo: {},
		prestamos: [{}],
		saldoUtilizado: '$0.0',
	},
	reducers: {
		onLoadPrestamos: (state, action) => {
			action.payload.forEach((data) => {
				data.montoPrestado = formatCurrency(data.montoPrestado);
				data.montoPagado = formatCurrency(data.montoPagado);
			});

			state.prestamos = action.payload;
		},

		onLoadSaldoUtilizado: (state, action) => {
			state.saldoUtilizado = formatCurrency(action.payload);
		},

		onUpdatePrestamo: (state, action) => {
			state.prestamo = action.payload;
			state.prestamo.newMontoPagado = '';
		},
	},
});

export const { onLoadPrestamos, onLoadSaldoUtilizado, onUpdatePrestamo } = sgahSlicePrestamos.actions;
