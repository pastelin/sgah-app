import { createSlice } from '@reduxjs/toolkit';
import { formatCurrency } from '../../hooks';

export const sgahSliceGasto = createSlice({
	name: 'sgahGasto',
	initialState: {
		filtro: ['Listar todo', 'Categoria', 'Tipo Movimiento', 'Fecha', 'Mes actual'],
		tipoMovimiento: ['Gasto', 'Ingreso'],
		cabecerasTable: ['Fecha', 'Monto', 'Descripción', 'Categoría', 'Tipo'],
		properties: [
			'fechaCreacion',
			'monto',
			'descripcion',
			'nbGastoRecurrente',
			'nbTipoMovimiento',
		],
		categoriaGastos: [{}],
		gastos: [{}],
		montos: {
			disponible: '$0.0',
			gastado: '$0.0',
		},
	},
	reducers: {
		updateCategorias: (state, action) => {
			state.categoriaGastos = action.payload;
		},

		updateGastos: (state, action) => {
			action.payload.forEach((data) => {
				data.monto = formatCurrency(data.monto);
			});

			state.gastos = action.payload;
		},

		updateMontos: (state, action) => {
			state.montos.disponible = formatCurrency(action.payload.montoDisponible);
			state.montos.gastado = formatCurrency(action.payload.montoGastado);
		},
	},
});

export const { updateCategorias, updateGastos, updateMontos, updateformSuccess } =
	sgahSliceGasto.actions;
