const rolesMiddle = (req, res, next) => {
	try {
		const usuario = req.usuario; // Debe venir del middleware de autenticación JWT

		console.log(usuario);

		if (!usuario) {
			return res.status(401).json({ error: 'Usuario no autenticado.' });
		}

		// Roles permitidos
		const rolesPermitidos = ['Administrador', 'Supervisor'];

		if (!rolesPermitidos.includes(usuario.role)) {
			return res
				.status(403)
				.json({ error: 'No tienes permisos para ver las cajas.' });
		}

		return next();
	} catch (error) {
		return res.status(400).json({ error: 'Error de autorización.' });
	}
};

export default rolesMiddle;
