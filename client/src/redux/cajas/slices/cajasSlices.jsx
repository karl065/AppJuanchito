import { createSlice } from '@reduxjs/toolkit';

const cajasSlice = createSlice({
	name: 'cajas',
	initialState: {
		cajas: [],
		estadosCierre: [],
		cajaActual: {},
	},
	reducers: {
		cargarCajas: (state, action) => {
			state.cajas = action.payload;
		},
		agregarCaja: (state, action) => {
			state.cajas.push(action.payload[0]);
		},
		cargarCajaActual: (state, action) => {
			state.cajaActual = action.payload;
		},
		actualizarCaja: (state, action) => {
			const cajaActualizada = action.payload;

			const index = state.cajas.findIndex(
				(caja) => caja && caja._id === cajaActualizada._id
			);

			if (index !== -1) {
				state.cajas[index] = {
					...state.cajas[index],
					...cajaActualizada,
				};
			}
		},
		cargarEstadosCierre: (state, action) => {
			state.estadosCierre = action.payload;
		},
	},
});

export const {
	cargarCajas,
	agregarCaja,
	actualizarCaja,
	cargarEstadosCierre,
	cargarCajaActual,
} = cajasSlice.actions;

export default cajasSlice.reducer;
