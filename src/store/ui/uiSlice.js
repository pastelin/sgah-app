import { createSlice } from '@reduxjs/toolkit';

export const uiSlice = createSlice({
	name: 'ui',
	initialState: {
		isNavbarOpen: false,
		isFormGastoOpen: false,
		isFormNewPrestamoOpen: false,
		isFormUpdatePrestamoOpen: false,
		menuSelected: 'Prestamos',
		optionSelectedFilterGasto: '',
	},
	reducers: {
		onOpenNavbar: (state) => {
			state.isNavbarOpen = true;
		},

		onCloseNavbar: (state) => {
			state.isNavbarOpen = false;
		},
		onOpenFormGasto: (state) => {
			state.isFormGastoOpen = true;
		},
		onCloseFormGasto: (state) => {
			state.isFormGastoOpen = false;
		},
		onOpenFormNewPrestamo: (state) => {
			state.isFormNewPrestamoOpen = true;
		},
		onCloseFormNewPrestamo: (state) => {
			state.isFormNewPrestamoOpen = false;
		},
		onOpenFormUpdatePrestamo: (state) => {
			state.isFormUpdatePrestamoOpen = true;
		},
		onCloseFormUpdatePrestamo: (state) => {
			state.isFormUpdatePrestamoOpen = false;
		},
		onUpdateMenuSelected: (state, action) => {
			state.menuSelected = action.payload;
		},
		onUpdateOptionSelectedFilterGasto: (state, { payload }) => {
			state.optionSelectedFilterGasto = payload;
		},
	},
});

export const {
	onOpenNavbar,
	onCloseNavbar,
	onUpdateMenuSelected,
	onOpenFormGasto,
	onCloseFormGasto,
	onUpdateOptionSelectedFilterGasto,
	onOpenFormNewPrestamo,
	onCloseFormNewPrestamo,
	onOpenFormUpdatePrestamo,
	onCloseFormUpdatePrestamo,
} = uiSlice.actions;