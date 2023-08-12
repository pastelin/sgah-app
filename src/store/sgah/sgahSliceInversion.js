import { createSlice } from '@reduxjs/toolkit';

export const sgahSliceInversion = createSlice({
	name: 'sgahInversion',
	initialState: {
		saldoInvertido: 0,
		inversiones: [{}],
		inversion: {},
		gruposFinancieros: [],
	},
	reducers: {
		onLoadSaldoInvertido: (state, { payload }) => {
			state.saldoInvertido = payload;
		},
        onAddSaldoInvertido: (state, { payload }) => {
            console.log(payload);
            state.saldoInvertido += payload;
		},
        onSubstractSaldoInvertido: (state, { payload }) => {
            console.log(payload);
            state.saldoInvertido -= payload;
		},
		onLoadInversiones: (state, { payload }) => {
			state.inversiones = payload;
		},
		onUpdateAddMontoInversion: (state, { payload }) => {
			state.inversiones.forEach((data) => {
				if (data.nbAppInversion === payload.nbAppInversion) {
					data.monto += payload.monto;
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
		onLoadGruposFinancieros: (state, { payload }) => {
			state.gruposFinancieros = payload;
		},
	},
});

export const {
	onLoadInversiones,
	onLoadSaldoInvertido,
    onAddSaldoInvertido,
    onSubstractSaldoInvertido,
	onLoadGruposFinancieros,
    onUpdateAddMontoInversion,
    onUpdateMontoInversion,
	onAddInversion,
	onLoadInversion,
} = sgahSliceInversion.actions;
