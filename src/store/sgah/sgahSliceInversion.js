import { createSlice } from '@reduxjs/toolkit';

export const sgahSliceInversion = createSlice({
	name: 'sgahInversion',
	initialState: {
		saldoInvertido: 0,
		inversiones: [{}],
		inversion: {},
		productosFinancieros: [],
	},
	reducers: {
		onLoadSaldoInvertido: (state, { payload }) => {
			state.saldoInvertido = payload;
		},
        onIncrementSaldoInvertido: (state, { payload }) => {
            state.saldoInvertido += parseInt(payload);
		},
        onSubstractSaldoInvertido: (state, { payload }) => {
            state.saldoInvertido -= parseInt(payload);
		},
		onLoadInversiones: (state, { payload }) => {
			state.inversiones = payload;
		},
		onIncrementMontoInversion: (state, { payload }) => {
			state.inversiones.forEach((data) => {
				if (data?.productoFinanciero?.nbApp === payload?.productoFinanciero?.nbApp) {
					data.monto += (+payload.monto);
				}
			});
		},
		onUpdateMontoInversion: (state, { payload }) => {
            state.inversiones.forEach((data) => {
				if (data.folio === payload.folio) {
					data.monto = payload.monto;
				}
			});
		},
		onAddInversion: (state, { payload }) => {
			state.inversiones.push(payload);
		},
		onLoadInversion: (state, { payload }) => {
			state.inversion = payload;
		},
		onLoadProductosFinancieros: (state, { payload }) => {
			state.productosFinancieros = payload;
		},
	},
});

export const {
	onLoadInversiones,
	onLoadSaldoInvertido,
    onIncrementSaldoInvertido,
    onSubstractSaldoInvertido,
	onLoadProductosFinancieros,
    onIncrementMontoInversion,
    onUpdateMontoInversion,
	onAddInversion,
	onLoadInversion,
} = sgahSliceInversion.actions;
