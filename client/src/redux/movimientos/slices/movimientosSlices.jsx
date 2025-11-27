import { createSlice } from '@reduxjs/toolkit';

const movimientosSlice = createSlice({
	name: 'movimientos',
	initialState: {
		movimientos: [],
	},
	reducers: {
		cargarMovimientos: (state, action) => {
			state.movimientos = action.payload;
		},
	},
});

export const { cargarMovimientos } = movimientosSlice.actions;

export default movimientosSlice.reducer;
