import eliminarImpresorasServices from '../../../services/impresoras/eliminarImpresorasServices.jsx';
import { eliminarImpresora } from '../slices/impresorasSlice.jsx';

export const eliminarImpresorasAction = async (dispatch, id) => {
	try {
		const token = localStorage.getItem('token');
		const { _id } = await eliminarImpresorasServices(id, token);
		dispatch(eliminarImpresora(_id));
	} catch (error) {
		console.log(error);
	}
};
