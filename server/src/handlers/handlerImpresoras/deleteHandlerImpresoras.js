import deleteControllerImpresora from "../../controllers/controllerImpresoras/deleteControllerImpresoras.js";


const deleteHandlerImpresoras = async (req, res) => {
    try {

        const {id} = req.params;

        const impresoraEliminada = await deleteControllerImpresora(id)

        return res.status(200).json(impresoraEliminada);

    } catch (error) {

        return res.status(400).json({error: error.message});

    }
};

export default deleteHandlerImpresoras;
