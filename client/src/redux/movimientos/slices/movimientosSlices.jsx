import { createSlice } from '@reduxjs/toolkit';

const movimientosSlice = createSlice({
	name: 'movimientos',
	initialState: {
		movimientos: [],
		tiposMovimiento: [],
	},
	reducers: {
		cargarMovimientos: (state, action) => {
			state.movimientos = action.payload;
		},
		cargarTipos: (state, action) => {
			state.tiposMovimiento = action.payload;
		},
		agregarMovimiento: (state, action) => {
			state.movimientos.push(action.payload);
		},
	},
});

export const { cargarMovimientos, cargarTipos, agregarMovimiento } =
	movimientosSlice.actions;

export default movimientosSlice.reducer;
