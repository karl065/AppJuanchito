import { createSlice } from '@reduxjs/toolkit';

const facturasSlice = createSlice({
	name: 'facturas',
	initialState: {
		facturas: [],
	},
	reducers: {
		cargarFacturas: (state, action) => {
			state.facturas = action.payload;
		},
	},
});

export const { cargarFacturas } = facturasSlice.actions;

export default facturasSlice.reducer;
