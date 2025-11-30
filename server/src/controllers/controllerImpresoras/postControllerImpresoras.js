
import putControllerUsuario from '../controllersUsuarios/putControllerUsuario.js';
import Impresoras from './../../models/Impresoras.js';

const postControllerImpresoras = async (impresoraNueva) => {
    try {

        const impresoraAgregada = await Impresoras.create(impresoraNueva);

        console.log(impresoraAgregada)

        await putControllerUsuario(impresoraAgregada, impresoraNueva.usuario)

        return impresoraAgregada;
    } catch (error) {
        return error;
    }
};

export default postControllerImpresoras;
