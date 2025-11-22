import appReducer from './appReducers.jsx';

const rootReducer = (state, action) => {
	if (action.type === 'RESET_ALL_STATE') {
		const initialState = appReducer(undefined, { type: '@@INIT' });
		return initialState;
	}
	return appReducer(state, action);
};

export default rootReducer;
