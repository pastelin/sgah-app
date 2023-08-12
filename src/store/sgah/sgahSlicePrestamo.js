import { createSlice } from '@reduxjs/toolkit';

export const sgahSlicePrestamos = createSlice({
	name: 'sgahPrestamo',
	initialState: {
		filtro: ['Listar todo', 'Estatus'],
		prestamo: {},
		prestamos: [{}],
		saldoUtilizadoP: 0,
	},
	reducers: {
		onLoadPrestamos: (state, action) => {
			action.payload.forEach((data) => {
				data.montoPrestado = data.montoPrestado;
				data.montoPagado = data.montoPagado;
			});

			state.prestamos = action.payload;
		},
		onLoadSaldoUtilizadoP: (state, action) => {
			state.saldoUtilizadoP = action.payload;
		},
		onLoadPrestamo: (state, action) => {
			state.prestamo = action.payload;
			state.prestamo.newMontoPagado = '';
		},
		onAddNewPrestamo: (state, { payload }) => {
			state.prestamos.push(payload);
		},
		onAddSaldoUtilizadoP: (state, { payload }) => {
			state.saldoUtilizadoP += parseInt(payload);
		},
		onSubtractSaldoUtilizadoP: (state, { payload }) => {
			state.saldoUtilizadoP -= parseInt(payload);
		},
		onUpdatePrestamo: (state, { payload }) => {
			state.prestamos = state.prestamos.map((data) => {
				if (data.folio === payload.folio) {
					return payload;
				}

				return data;
			});
		},
		onDeletePrestamo: (state, { payload }) => {
			state.prestamos = state.prestamos.filter((prestamo) => prestamo.folio !== payload);
		},
	},
});

export const {
	onLoadPrestamos,
	onLoadSaldoUtilizadoP,
	onLoadPrestamo,
	onAddSaldoUtilizadoP,
	onAddNewPrestamo,
	onSubtractSaldoUtilizadoP,
	onUpdatePrestamo,
	onDeletePrestamo,
} = sgahSlicePrestamos.actions;
