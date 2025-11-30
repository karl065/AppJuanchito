import { createSlice } from '@reduxjs/toolkit';

const impresorasSlice = createSlice({
	name: 'impresoras',
	initialState: {
		impresoras: [],
	},
	reducers: {
		cargarImpresoras: (state, action) => {
			state.impresoras = action.payload;
		},
		agregarImpresora: (state, action) => {
			state.impresoras.push(action.payload);
		},
		actualizarImpresora: (state, action) => {
			const impresoraActualizada = action.payload;

			const index = state.impresoras.findIndex(
				(impresora) => impresora._id === impresoraActualizada._id
			);

			if (index !== -1) {
				state.impresoras[index] = {
					...state.impresoras[index],
					...impresoraActualizada,
				};
			}
		},
		eliminarImpresora: (state, action) => {
			const id = action.payload; // Aquí llega el ID
			state.impresoras = state.impresoras.filter(
				(impresora) => impresora._id !== id
			);
		},
	},
});

export const {
	cargarImpresoras,
	agregarImpresora,
	actualizarImpresora,
	eliminarImpresora,
} = impresorasSlice.actions;

export default impresorasSlice.reducer;
