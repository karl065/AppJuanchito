import actualizarCajaEnVenta from '../../helpers/ventas/actualizarCajaEnVentas.js';
import Caja from '../../models/Caja.js';
import Factura from '../../models/Facturas.js';
import Usuarios from '../../models/Usuarios.js';

const postControllerFacturas = async (facturaData) => {
	try {
		const facturaNueva = await Factura.create(facturaData);

		await Caja.findByIdAndUpdate(facturaData.caja, {
			$push: { facturas: facturaNueva._id },
		});

		await Usuarios.findByIdAndUpdate(facturaData.usuario, {
			$push: { facturas: facturaNueva._id },
		});

		await actualizarCajaEnVenta(facturaNueva);

		// Populate opcional: usuario, productos, movimientos
		return facturaNueva;
	} catch (error) {
		console.error('Error al crear factura:', error);
		throw error;
	}
};

export default postControllerFacturas;
