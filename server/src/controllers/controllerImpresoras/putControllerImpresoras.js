import Impresoras from "../../models/Impresoras.js";


const putControllerImpresoras = async (dataUpdate, id) => {
    try {
        await Impresoras.findByIdAndUpdate(id, dataUpdate);
        const impresoraActualizada = await Impresoras.findById(id);
        return impresoraActualizada;
    } catch (error) {
        return error;
    }
};

export default putControllerImpresoras;

