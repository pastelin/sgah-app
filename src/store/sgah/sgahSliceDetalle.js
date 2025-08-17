import { createSlice } from '@reduxjs/toolkit';

export const sgahSliceDetalle = createSlice({
    name: 'sgahDetalle',
    initialState: {
        resumen: {},
    },
    reducers: {
        updateResumen: (state, action) => {
            state.resumen.montoAhorro = action.payload.ahorro;
            state.resumen.montoGasto = action.payload.gasto;
            state.resumen.montoInversion = action.payload.inversion;
            state.resumen.montoPrestamo = action.payload.prestamo;
        },
    },
});

export const { updateResumen } = sgahSliceDetalle.actions;
