import { createSlice } from '@reduxjs/toolkit';

const loginSlice = createSlice({
	name: 'login',
	initialState: {
		login: [],
	},
	reducers: {
		setLogin: (state, action) => {
			state.login = action.payload;
		},
	},
});

export const { setLogin } = loginSlice.actions;
export default loginSlice.reducer;
