import obtenerCajasServices from '../../../services/cajas/obtenerCajasServices.jsx';
import { cargarCajas, cargarCajaActual } from '../slices/cajasSlices.jsx';

export const obtenerCajasAction = async (dispatch, query) => {
	try {
		const data = await obtenerCajasServices(query);

		dispatch(cargarCajas(data));

		const cajaActual = data.filter((caja)=> caja.estado === "abierta")

		if(cajaActual.length > 0){

		dispatch(cargarCajaActual(cajaActual[0]))

		}
	} catch (error) {
		console.log(error);
	}
};
