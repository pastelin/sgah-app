import { createSlice } from '@reduxjs/toolkit';

export const uiSlice = createSlice({
	name: 'ui',
	initialState: {
		isNavbarOpen: false,
		isSaldoIngresoDisabled: false,
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
	onDisabledSaldoIngreso,
	onActiveSaldoIngreso,
	onDisabledFormAhorro,
	onActiveFormAhorro,
} = uiSlice.actions;
