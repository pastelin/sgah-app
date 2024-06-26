import { createSlice } from '@reduxjs/toolkit';
import { formatCurrency } from '../../hooks';

export const sgahSliceDetalle = createSlice({
    name: 'sgahDetalle',
    initialState: {
        resumen: {},
    },
    reducers: {
        updateResumen: (state, action) => {
            state.resumen.montoAhorro = formatCurrency(action.payload.ahorro);
            state.resumen.montoGasto = formatCurrency(action.payload.gasto);
            state.resumen.montoInversion = formatCurrency(
                action.payload.inversion
            );
            state.resumen.montoPrestamo = formatCurrency(
                action.payload.prestamo
            );
        },
    },
});

export const { updateResumen } = sgahSliceDetalle.actions;
