import { createSlice } from '@reduxjs/toolkit';
import { formatCurrency } from '../../hooks';

export const sgahSliceGasto = createSlice({
	name: 'sgahGasto',
	initialState: {
		filtro: ['Listar todo', 'Categoria', 'Tipo Movimiento', 'Fecha', 'Mes actual'],
		tipoMovimiento: ['Gasto', 'Ingreso'],
		categoriasGasto: [{}],
		gastos: [{}],
		saldo: {
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
		onLoadSaldo: (state, { payload }) => {
			state.saldo.disponible = payload.montoDisponible;
			state.saldo.gastado = payload.montoGastado;
		},
		onAddSaldoDisponible: (state, { payload }) => {
			state.saldo.disponible += parseInt(payload);
		},
		onSubtractSaldoDisponible: (state, { payload }) => {
			state.saldo.disponible -= parseInt(payload);
		},
	},
});

export const {
	onLoadCategoriasGasto,
	onLoadGastos,
	onLoadSaldo,
	onAddNewGasto,
	onAddSaldoDisponible,
	onSubtractSaldoDisponible,
} = sgahSliceGasto.actions;
