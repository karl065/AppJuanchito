import obtenerFacturasServices from '../../../services/facturas/obtenerFacturasServices.jsx';

export const obtenerFacturasAction = async (dispatch) => {
	try {
		const data = await obtenerFacturasServices();

		dispatch(obtenerFacturasAction(data));
	} catch (error) {
		console.log(error);
	}
};
