import { createSlice } from '@reduxjs/toolkit';

const rolesSlice = createSlice({
	name: 'roles',
	initialState: {
		roles: [],
	},
	reducers: {
		cargarRoles: (state, action) => {
			state.roles = action.payload;
		},
	},
});

export const { cargarRoles } = rolesSlice.actions;
export default rolesSlice.reducer;
