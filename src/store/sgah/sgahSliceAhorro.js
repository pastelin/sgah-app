import { createSlice } from '@reduxjs/toolkit';

export const sgahSliceAhorro = createSlice({
    name: 'sgahAhorro',
    initialState: {
        ahorros: [],
        saldoDisponibleA: 0,
        editingSavingId: '',
        isSavingModalOpen: false,
    },
    reducers: {
        onLoadAhorros: (state, action) => {
            state.ahorros = action.payload
                .slice()
                .sort(
                    (a, b) =>
                        new Date(b.fechaCreacion) - new Date(a.fechaCreacion)
                );
        },
        onLoadSaldoDisponibleA: (state, action) => {
            state.saldoDisponibleA = action.payload;
        },
        onAddSaldoDisponibleA: (state, { payload }) => {
            state.saldoDisponibleA += parseInt(payload);
        },
        onSubtractSaldoDisponibleA: (state, { payload }) => {
            state.saldoDisponibleA -= parseInt(payload);
        },
        onUpdateAhorro: (state, { payload }) => {
            const index = state.ahorros.findIndex(
                (ahorro) => ahorro.id === payload.id
            );
            if (index !== -1) {
                state.ahorros[index] = payload;
            }
        },
        onEditingSavingId: (state, { payload }) => {
            state.editingSavingId = payload;
        },
        showSavingModal: (state, { payload }) => {
            state.isSavingModalOpen = payload;
        },
        hideSavingModal: (state, { payload }) => {
            state.isSavingModalOpen = payload;
        },
        deleteSaving: (state, { payload }) => {
            state.ahorros = state.ahorros.filter((ahorro) => ahorro.id !== payload);
        },
    },
});

export const {
    onLoadAhorros,
    onLoadSaldoDisponibleA,
    onAddSaldoDisponibleA,
    onSubtractSaldoDisponibleA,
    onUpdateAhorro,
    onEditingSavingId,
    showSavingModal,
    hideSavingModal,
    deleteSaving,
} = sgahSliceAhorro.actions;
