import { createSlice } from '@reduxjs/toolkit';

const usuariosSlice = createSlice({
	name: 'usuarios',
	initialState: {
		usuarios: [],
		predios: [],
	},
	reducers: {
		cargarUsuarios: (state, action) => {
			state.usuarios = action.payload;
		},
		agregarUsuario: (state, action) => {
			state.usuarios.push(action.payload[0]);
		},
		actualizarUsuario: (state, action) => {
			const { _id, data } = action.payload;

			const index = state.usuarios.findIndex((usuario) => usuario._id === _id);

			if (index !== -1) {
				state.usuarios[index] = {
					...state.usuarios[index],
					...data,
				};
			}
		},
	},
});

export const { cargarUsuarios, agregarUsuario, actualizarUsuario } =
	usuariosSlice.actions;
export default usuariosSlice.reducer;
