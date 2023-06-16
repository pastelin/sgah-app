import { createSlice } from '@reduxjs/toolkit';
import { formatCurrency } from '../../hooks';

export const sgahSlicePrestamos = createSlice({
	name: 'sgahPrestamo',
	initialState: {
		filtro: ['Listar todo', 'Estatus'],
		cabecerasTable: ['Fecha', 'Saldo usado', 'Descripción', 'Saldo pagado', 'Pagar'],
		uriPrestamosActivos: 'http://localhost:8092/prestamo/v0/prestamo/detalleActivo',
		uriActualizaPrestamo: 'http://localhost:8092/prestamo/v0/prestamo/operacionActualiza',
		uriSaldoUtilizado: 'http://localhost:8092/prestamo/v0/prestamo/saldoUtilizado',
		uriAgregaPrestamo: 'http://localhost:8092/prestamo/v0/prestamo/operacionAgregar',
		properties: ['fechaCreacion', 'montoPrestado', 'descripcion', 'montoPagado', 'btnPrestamo'],
		prestamos: [{}],
		saldoUtilizado: '$0.0',
        prestamo: {}
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
        }
	},
});

export const { updatePrestamos, updateSaldoUtilizado, updatePrestamo } = sgahSlicePrestamos.actions;
