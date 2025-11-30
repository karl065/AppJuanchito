
import putControllerUsuario from '../controllersUsuarios/putControllerUsuario.js';
import Impresoras from './../../models/Impresoras.js';

const postControllerImpresoras = async (impresoraNueva) => {
    try {

        const impresoraAgregada = await Impresoras.create(impresoraNueva);

        await putControllerUsuario(impresoraAgregada, impresoraNueva.usuario)

        return impresoraAgregada;
    } catch (error) {
        return error;
    }
};

export default postControllerImpresoras;
