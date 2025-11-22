import { setLoading } from '../slices/loadingSlice.jsx';

export const loadingAction = (isLoading, dispatch) => {
	dispatch(setLoading(isLoading));
};
