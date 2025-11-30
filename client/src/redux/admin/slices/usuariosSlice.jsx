import { createSlice } from '@reduxjs/toolkit';

const usuariosSlice = createSlice({
	name: 'usuarios',
	initialState: {
		usuarios: [],
	},
	reducers: {
		cargarUsuarios: (state, action) => {
			state.usuarios = action.payload;
		},
		agregarUsuario: (state, action) => {
			state.usuarios.push(action.payload);
		},
		actualizarUsuario: (state, action) => {
			const usuarioActualizado = action.payload;

			const index = state.usuarios.findIndex(
				(usuario) => usuario._id === usuarioActualizado._id
			);

			if (index !== -1) {
				state.usuarios[index] = {
					...state.usuarios[index],
					...usuarioActualizado,
				};
			}
		},
		eliminarUsuario: (state, action) => {
			const id = action.payload; // Aquí llega el ID
			state.usuarios = state.usuarios.filter((usuario) => usuario._id !== id);
		},
	},
});

export const {
	cargarUsuarios,
	agregarUsuario,
	actualizarUsuario,
	eliminarUsuario,
} = usuariosSlice.actions;
export default usuariosSlice.reducer;
