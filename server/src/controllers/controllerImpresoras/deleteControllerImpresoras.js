
import Impresoras from './../../models/Impresoras.js';

const deleteControllerImpresora = async (id) => {
    try {

        const impresoraEliminada = await Impresoras.findById(id);

        await Impresoras.findByIdAndDelete(id);

        return impresoraEliminada;
    } catch (error) {
        return error;
    }
};

export default deleteControllerImpresora;

