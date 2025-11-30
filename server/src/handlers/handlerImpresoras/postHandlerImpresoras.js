
import postControllerImpresoras from './../../controllers/controllerImpresoras/postControllerImpresoras.js';

const postHandlerImpresoras = async (req, res) => {
    try {

        const impresora = req.body;

        const nuevaImpresora = await postControllerImpresoras(impresora)

        return res.status(200).json(nuevaImpresora);

    } catch (error) {

        return res.status(400).json({error: error.message});

    }
};

export default postHandlerImpresoras   ;

