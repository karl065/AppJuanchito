import filtroAvanzado from '../../helpers/filtros/filtroAvanzado.js';
import sanitizarDispositivoFull from '../../helpers/sanitizadores/satinizarDispositivosFull.js';
import Dispositivos from './../../models/DispositivosConfiables.js';

const getControllerDispositivo = async (query) => {
	try {
		const filtro = filtroAvanzado(query, Dispositivos.schema);

		const dispositivos = await Dispositivos.find(
			Object.keys(filtro).length > 0 ? filtro : {}
		).populate('userId');

		const dispositivosSatinizado = dispositivos.map((d) =>
			sanitizarDispositivoFull(d)
		);

		return dispositivosSatinizado;
	} catch (error) {
		return error;
	}
};

export default getControllerDispositivo;
