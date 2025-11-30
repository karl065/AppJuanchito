import getControllerImpresoras from "../../controllers/controllerImpresoras/getControllerImpresoras.js";


const getHandlerImpresoras = async (req, res) => {
    try {

        const impresoras = await getControllerImpresoras()

        return res.status(200).json(impresoras);

    } catch (error) {

        return res.status(400).json({error: error.message});

    }
};

export default getHandlerImpresoras;