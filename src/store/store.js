import { configureStore } from '@reduxjs/toolkit';
import React from 'react';
import { sgahSlice } from './sgah/sgahSlice';
import { sgahSliceGasto } from './sgah/sgahSliceGasto';

export const store = configureStore({
	reducer: {
        sgah: sgahSlice.reducer,
        sgahGasto: sgahSliceGasto.reducer,
	},
});
