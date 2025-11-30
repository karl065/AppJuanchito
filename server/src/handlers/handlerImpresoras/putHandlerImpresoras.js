import putControllerImpresoras from "../../controllers/controllerImpresoras/putControllerImpresoras.js";


const putHandlerImpresoras = async (req, res) => {
    try {

        const {id} = req.params;

        const dataUpdate = req.body;

        const impresoraActualizada = await putControllerImpresoras(dataUpdate, id)

        return res.status(200).json(impresoraActualizada);

    } catch (error) {

        return res.status(400).json({error: error.message});

    }
};

export default putHandlerImpresoras;
