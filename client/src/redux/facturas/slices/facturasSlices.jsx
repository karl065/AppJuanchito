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
		agregarFactura: (state, action) => {
			state.facturas.push(action.payload[0]);
		},
	},
});

export const { cargarFacturas, agregarFactura } = facturasSlice.actions;

export default facturasSlice.reducer;
