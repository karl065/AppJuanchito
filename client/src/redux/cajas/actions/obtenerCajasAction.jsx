import obtenerCajasServices from '../../../services/cajas/obtenerCajasServices.jsx';

export const obtenerCajasAction = async (dispatch) => {
	try {
		const data = await obtenerCajasServices();

		dispatch(obtenerCajasAction(data));
	} catch (error) {
		console.log(error);
	}
};
