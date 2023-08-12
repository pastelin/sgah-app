import { createSlice } from '@reduxjs/toolkit';

export const uiSlice = createSlice({
	name: 'ui',
	initialState: {
		isNavbarOpen: false,
		isFormNewPrestamoOpen: false,
		isFormUpdatePrestamoOpen: false,
		isSaldoIngresoDisabled: false,
		isFormGastosSubmitted: false,
		isFormAhorroSubmitted: false,
		menuSelected: 'Inversion',
	},
	reducers: {
		onOpenNavbar: (state) => {
			state.isNavbarOpen = true;
		},

		onCloseNavbar: (state) => {
			state.isNavbarOpen = false;
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
		onDisabledSaldoIngreso: (state) => {
			state.isSaldoIngresoDisabled = true;
		},
		onActiveSaldoIngreso: (state) => {
			state.isSaldoIngresoDisabled = false;
		},
		onDisabledFormAhorro: (state) => {
			state.isFormAhorroSubmitted = true;
		},
		onActiveFormAhorro: (state) => {
			state.isFormAhorroSubmitted = false;
		},
	},
});

export const {
	onOpenNavbar,
	onCloseNavbar,
	onUpdateMenuSelected,
	onOpenFormNewPrestamo,
	onCloseFormNewPrestamo,
	onOpenFormUpdatePrestamo,
	onCloseFormUpdatePrestamo,
	onDisabledSaldoIngreso,
	onActiveSaldoIngreso,
	onDisabledFormAhorro,
	onActiveFormAhorro,
} = uiSlice.actions;
