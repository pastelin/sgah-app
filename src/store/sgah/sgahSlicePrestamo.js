import { createSlice } from '@reduxjs/toolkit';

export const sgahSlicePrestamos = createSlice({
    name: 'sgahPrestamo',
    initialState: {
        prestamo: {},
        prestamos: [],
        saldoUtilizadoP: 0,
    },
    reducers: {
        onLoadPrestamos: (state, action) => {
            state.prestamos = action.payload;
        },
        onLoadSaldoUtilizadoP: (state, action) => {
            state.saldoUtilizadoP = action.payload;
        },
        onLoadPrestamo: (state, action) => {
            state.prestamo = action.payload;
        },
        onAddNewPrestamo: (state, { payload }) => {
            state.prestamos.push(payload);
        },
        onIncrementSaldoUtilizadoP: (state, { payload }) => {
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
            state.prestamos = state.prestamos.filter(
                (prestamo) => prestamo.folio !== payload
            );
        },
    },
});

export const {
    onLoadPrestamos,
    onLoadSaldoUtilizadoP,
    onLoadPrestamo,
    onIncrementSaldoUtilizadoP,
    onAddNewPrestamo,
    onSubtractSaldoUtilizadoP,
    onUpdatePrestamo,
    onDeletePrestamo,
} = sgahSlicePrestamos.actions;
