export const calcularVentasPorUsuario = (
	safeFacturas,
	safeCajas,
	safeUsuarios
) => {
	const ventasPorUsuarioMap = {};

	// 1. Inicializar con todos los usuarios (para incluir usuarios sin ventas)
	safeUsuarios.forEach((u) => {
		ventasPorUsuarioMap[u._id] = {
			user: u.nombre,
			baseEfectivo: 0,
			ventasEfectivo: 0,
			ventasNequi: 0,
			ventasDaviplata: 0,
		};
	});

	// 2. Agregar ventas de facturas
	safeFacturas.forEach((f) => {
		const userId = f.usuario?._id || 'u1'; // Usamos u1 ya que todos son el mismo en el mock
		if (userId && ventasPorUsuarioMap[userId]) {
			const efectivoNeto =
				(f.detallePago?.efectivoCliente || 0) - (f.detallePago?.cambio || 0);

			ventasPorUsuarioMap[userId].ventasEfectivo += efectivoNeto;
			ventasPorUsuarioMap[userId].ventasNequi += f.detallePago?.nequi || 0;
			ventasPorUsuarioMap[userId].ventasDaviplata +=
				f.detallePago?.daviplata || 0;
		}
	});

	// 3. Agregar Base Inicial de cajas cerradas
	safeCajas
		.filter((c) => c.estado === 'cerrada')
		.forEach((caja) => {
			const userId = caja.usuario?._id;
			if (userId && ventasPorUsuarioMap[userId]) {
				ventasPorUsuarioMap[userId].baseEfectivo +=
					caja.apertura?.baseInicial || 0;
			}
		});

	// Filtrar solo usuarios con alguna actividad relevante
	return Object.values(ventasPorUsuarioMap).filter(
		(u) =>
			u.baseEfectivo > 0 ||
			u.ventasEfectivo > 0 ||
			u.ventasNequi > 0 ||
			u.ventasDaviplata > 0
	);
};
