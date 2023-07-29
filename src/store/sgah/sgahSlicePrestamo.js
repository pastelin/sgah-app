import { createSlice } from '@reduxjs/toolkit';
import { formatCurrency } from '../../hooks';

export const sgahSlicePrestamos = createSlice({
	name: 'sgahPrestamo',
	initialState: {
		filtro: ['Listar todo', 'Estatus'],
		prestamo: {},
		prestamos: [{}],
		saldoUtilizado: 0,
		saldoDisponibleAhorro: 0,
	},
	reducers: {
		onLoadPrestamos: (state, action) => {
			action.payload.forEach((data) => {
				data.montoPrestado = data.montoPrestado;
				data.montoPagado = data.montoPagado;
			});

			state.prestamos = action.payload;
		},
		onLoadSaldoUtilizado: (state, action) => {
			state.saldoUtilizado = action.payload;
		},
		onLoadPrestamo: (state, action) => {
			state.prestamo = action.payload;
			state.prestamo.newMontoPagado = '';
		},
		onLoadSaldoDisponibleAhorro: (state, { payload }) => {
			state.saldoDisponibleAhorro = payload;
		},
		onAddNewPrestamo: (state, { payload }) => {
			state.prestamos.push(payload);
		},
		onUpdateSaldosForNewPrestamo: (state, { payload }) => {
			state.saldoUtilizado += parseInt(payload);
			state.saldoDisponibleAhorro -= parseInt(payload);
		},
		onSubtractSaldoUtilizado: (state, { payload }) => {
			state.saldoUtilizado -= parseInt(payload);
		},
		onAddSaldoDisponibleAhorro: (state, { payload }) => {
			state.saldoDisponibleAhorro += parseInt(payload);
		},
        onUpdatePrestamo: (state, { payload }) => {
            state.prestamos = state.prestamos.map((data) => {
				if (data.folio === payload.folio) {
					return payload;
				}

				return data;
			});
        }
	},
});

export const {
	onLoadPrestamos,
	onLoadSaldoUtilizado,
	onLoadPrestamo,
	onUpdateSaldosForNewPrestamo,
	onAddNewPrestamo,
	onLoadSaldoDisponibleAhorro,
	onSubtractSaldoUtilizado,
	onAddSaldoDisponibleAhorro,
	onUpdatePrestamo,
} = sgahSlicePrestamos.actions;
