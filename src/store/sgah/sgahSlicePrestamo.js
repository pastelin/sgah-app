import { createSlice } from '@reduxjs/toolkit';

export const sgahSlicePrestamos = createSlice({
	name: 'sgahPrestamo',
	initialState: {
		filtro: ['Listar todo', 'Estatus'],
		prestamo: {},
		prestamos: [{}],
		saldoUtilizado: 0,
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
		onAddNewPrestamo: (state, { payload }) => {
			state.prestamos.push(payload);
		},
		onUpdateSaldosForNewPrestamo: (state, { payload }) => {
			state.saldoUtilizado += parseInt(payload);
		},
		onSubtractSaldoUtilizado: (state, { payload }) => {
			state.saldoUtilizado -= parseInt(payload);
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
	onLoadSaldoUtilizado,
	onLoadPrestamo,
	onUpdateSaldosForNewPrestamo,
	onAddNewPrestamo,
	onSubtractSaldoUtilizado,
	onUpdatePrestamo,
	onDeletePrestamo,
} = sgahSlicePrestamos.actions;
