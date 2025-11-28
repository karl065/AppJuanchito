import { formatearFechaHora } from './formatearFechaHora';

export const calcularHistorialCajas = (safeCajas) => {
	return (
		safeCajas
			// Incluimos cajas abiertas para tener una vista más completa
			.filter((c) => c.estado === 'cerrada' || c.estado === 'abierta')
			.map((caja) => ({
				id: caja._id,
				fecha: formatearFechaHora(
					caja.apertura.horaApertura || caja.cierre.horaCierre
				),
				usuario: caja.usuario?.nombre,
				baseInicial: caja.apertura?.baseInicial || 0,
				ventasEfectivo: caja.totalEfectivo || 0,
				ventasNequi: caja.totalNequi || 0,
				ventasDaviplata: caja.totalDaviplata || 0,
				estado: caja.estado,
			}))
	);
};
