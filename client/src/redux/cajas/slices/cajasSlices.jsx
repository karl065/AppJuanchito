import { createSlice } from '@reduxjs/toolkit';

const cajasSlice = createSlice({
	name: 'cajas',
	initialState: {
		cajas: [],
	},
	reducers: {
		cargarCajas: (state, action) => {
			state.cajas = action.payload;
		},
	},
});

export const { cargarCajas } = cajasSlice.actions;

export default cajasSlice.reducer;
