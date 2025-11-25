import { createSlice } from '@reduxjs/toolkit';

const categoriasSlice = createSlice({
	name: 'categorias',
	initialState: {
		categorias: [],
	},
	reducers: {
		cargarCategorias: (state, action) => {
			state.categorias = action.payload;
		},
		agregarCategoria: (state, action) => {
			state.categorias.push(action.payload[0]);
		},
		actualizarCategoria: (state, action) => {
			const { _id, data } = action.payload;

			const index = state.categorias.findIndex(
				(categoria) => categoria._id === _id
			);

			if (index !== -1) {
				state.categorias[index] = {
					...state.categorias[index],
					...data,
				};
			}
		},
	},
});

export const { cargarCategorias, agregarCategoria, actualizarCategoria } =
	categoriasSlice.actions;

export default categoriasSlice.reducer;
