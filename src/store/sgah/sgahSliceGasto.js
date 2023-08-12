import { createSlice } from '@reduxjs/toolkit';
import { formatCurrency } from '../../hooks';

export const sgahSliceGasto = createSlice({
	name: 'sgahGasto',
	initialState: {
		filtro: ['Listar todo', 'Categoria', 'Tipo Movimiento', 'Fecha', 'Mes actual'],
		tipoMovimiento: ['Gasto', 'Ingreso'],
		categoriasGasto: [{}],
		gastos: [{}],
		saldoGasto: {
			disponible: 0,
			gastado: 0,
		},
	},
	reducers: {
		onLoadCategoriasGasto: (state, action) => {
			state.categoriasGasto = action.payload;
		},
		onLoadGastos: (state, action) => {
			action.payload.forEach((data) => {
				data.monto = formatCurrency(data.monto);
			});

			state.gastos = action.payload;
		},
		onAddNewGasto: (state, { payload }) => {
			payload.monto = formatCurrency(payload.monto);
			state.gastos.push(payload);
		},
		onLoadSaldoGasto: (state, { payload }) => {
			state.saldoGasto.disponible = payload.montoDisponible;
			state.saldoGasto.gastado = payload.montoGastado;
		},
		onAddSaldoDisponibleG: (state, { payload }) => {
			state.saldoGasto.disponible += parseInt(payload);
		},
		onSubtractSaldoDisponibleG: (state, { payload }) => {
			state.saldoGasto.disponible -= parseInt(payload);
		},
	},
});

export const {
	onLoadCategoriasGasto,
	onLoadGastos,
	onLoadSaldoGasto,
	onAddNewGasto,
	onAddSaldoDisponibleG,
	onSubtractSaldoDisponibleG,
} = sgahSliceGasto.actions;
