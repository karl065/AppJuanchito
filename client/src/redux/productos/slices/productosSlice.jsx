import { createSlice } from '@reduxjs/toolkit';

const productosSlice = createSlice({
	name: 'productos',
	initialState: {
		productos: [],
	},
	reducers: {
		cargarProductos: (state, action) => {
			state.productos = action.payload;
		},
		agregarProducto: (state, action) => {
			state.productos.push(action.payload[0]);
		},
		actualizarProducto: (state, action) => {
			const { _id, data } = action.payload;

			const index = state.productos.findIndex(
				(producto) => producto._id === _id
			);

			if (index !== -1) {
				state.productos[index] = {
					...state.productos[index],
					...data,
				};
			}
		},
	},
});

export const { cargarProductos, agregarProducto, actualizarProducto } =
	productosSlice.actions;

export default productosSlice.reducer;
