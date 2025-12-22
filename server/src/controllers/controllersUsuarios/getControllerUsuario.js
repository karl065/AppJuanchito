import filtroAvanzado from '../../helpers/filtros/filtroAvanzado.js';
import Usuarios from './../../models/Usuarios.js';
import sanitizarUsuario from './../../helpers/sanitizadores/sanitizarUsuario.js';

const getControllerUsuario = async (query) => {
	try {
		if (query.obtenerRoles) {
			const rolesEnum = await Usuarios.schema.path('role').enumValues;
			return rolesEnum;
		}

		// Filtro avanzado
		const filtro = filtroAvanzado(query, Usuarios.schema);

		const usuarios = await Usuarios.find(
			Object.keys(filtro).length > 0 ? filtro : {}
		).populate('facturas');

		const usuariosSanitizados = usuarios.map((u) => sanitizarUsuario(u));

		return usuariosSanitizados;
	} catch (error) {
		return error;
	}
};

export default getControllerUsuario;
