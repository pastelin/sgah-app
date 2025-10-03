import { createSlice } from '@reduxjs/toolkit';

export const sgahSliceAhorro = createSlice({
    name: 'sgahAhorro',
    initialState: {
    savings: [],
    availableBalance: 0,
    activeSavingId: '',
    isSavingModalOpen: false,
    },
    reducers: {
        savingLoadAll: (state, action) => {
            state.savings = action.payload
                .slice()
                .sort(
                    (a, b) =>
                        new Date(b.fechaCreacion) - new Date(a.fechaCreacion)
                );
        },
        savingLoadAvailableBalance: (state, action) => {
            state.availableBalance = action.payload;
        },
        savingIncreaseAvailableBalance: (state, { payload }) => {
            state.availableBalance += parseInt(payload);
        },
        savingDecreaseAvailableBalance: (state, { payload }) => {
            state.availableBalance -= parseInt(payload);
        },
        savingUpdate: (state, { payload }) => {
            const index = state.savings.findIndex(
                (saving) => saving.id === payload.id
            );
            if (index !== -1) {
                state.savings[index] = payload;
            }
        },
        savingSetActiveId: (state, { payload }) => {
            state.activeSavingId = payload;
        },
        savingShowModal: (state, { payload }) => {
            state.isSavingModalOpen = payload;
        },
        savingHideModal: (state, { payload }) => {
            state.isSavingModalOpen = payload;
        },
        savingDelete: (state, { payload }) => {
            state.savings = state.savings.filter((saving) => saving.id !== payload);
        },
    },
});

export const {
    savingLoadAll,
    savingLoadAvailableBalance,
    savingIncreaseAvailableBalance,
    savingDecreaseAvailableBalance,
    savingUpdate,
    savingSetActiveId,
    savingShowModal,
    savingHideModal,
    savingDelete,
} = sgahSliceAhorro.actions;
