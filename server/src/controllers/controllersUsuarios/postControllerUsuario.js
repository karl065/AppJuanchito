import bcryptjs from 'bcryptjs';
import Usuarios from '../../models/Usuarios.js';

const crearUsuario = async (usuario) => {
	try {
		const verificarCorreo = await Usuarios.findOne({ correo: usuario.correo });

		if (verificarCorreo) {
			throw new Error(`El correo ${usuario.correo} ya está registrado`);
		}

		const { password } = usuario;

		const passCrypt = await bcryptjs.hash(password, 10);

		usuario.password = passCrypt;

		const nuevoUsuario = await Usuarios.create(usuario);

		delete nuevoUsuario.password;

		return nuevoUsuario;
	} catch (error) {
		return error;
	}
};

export default crearUsuario;
