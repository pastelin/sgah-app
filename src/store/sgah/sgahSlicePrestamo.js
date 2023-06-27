import { createSlice } from '@reduxjs/toolkit';
import { formatCurrency } from '../../hooks';

export const sgahSlicePrestamos = createSlice({
	name: 'sgahPrestamo',
	initialState: {
		filtro: ['Listar todo', 'Estatus'],
		prestamo: {},
		prestamos: [{}],
		saldoUtilizado: '$0.0',
		uriActualizaPrestamo: 'http://localhost:8092/prestamo/v0/prestamo/operacionActualiza',
		uriAgregaPrestamo: 'http://localhost:8092/prestamo/v0/prestamo/operacionAgregar',
		uriPrestamosActivos: 'http://localhost:8092/prestamo/v0/prestamo/detallePrestamosActivos',
		uriSaldoUtilizado: 'http://localhost:8092/prestamo/v0/prestamo/saldoUtilizado',
		uriObtenerPrestamo: 'http://localhost:8092/prestamo/v0/prestamo/detallePrestamo/',
		uriAhorroSaldoDisponible: 'http://localhost:8092/ahorro/v0/ahorro/calculo',
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
