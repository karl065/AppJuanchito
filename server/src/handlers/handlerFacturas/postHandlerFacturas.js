import procesarVenta from '../../helpers/ventas/procesarVentas';

const postHandlerFacturas = async (req, res) => {
	try {
		const factura = req.body;

		const facturaNueva = await procesarVenta(factura);

		return res.status(200).json(facturaNueva);
	} catch (error) {
		return res.status(400).json({ error: error.message });
	}
};

export default postHandlerFacturas;
