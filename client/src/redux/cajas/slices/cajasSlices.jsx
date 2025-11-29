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
		agregarCaja: (state, action) => {
			state.cajas.push(action.payload[0]);
		},
	},
});

export const { cargarCajas, agregarCaja } = cajasSlice.actions;

export default cajasSlice.reducer;
