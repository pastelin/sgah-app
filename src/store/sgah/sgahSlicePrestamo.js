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
		updatePrestamos: (state, action) => {
			action.payload.forEach((data) => {
				data.montoPrestado = formatCurrency(data.montoPrestado);
				data.montoPagado = formatCurrency(data.montoPagado);
			});

			state.prestamos = action.payload;
		},

		updateSaldoUtilizado: (state, action) => {
			state.saldoUtilizado = formatCurrency(action.payload);
		},

		updatePrestamo: (state, action) => {
			state.prestamo = action.payload;
			state.prestamo.newMontoPagado = '';
		},
	},
});

export const { updatePrestamos, updateSaldoUtilizado, updatePrestamo } = sgahSlicePrestamos.actions;
