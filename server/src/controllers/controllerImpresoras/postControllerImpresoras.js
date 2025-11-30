
import putControllerUsuario from '../controllersUsuarios/putControllerUsuario.js';
import Impresoras from './../../models/Impresoras.js';

const postControllerImpresoras = async (impresoraNueva) => {
    try {

        console.log("llegada: ", impresoraNueva)
        const impresoraAgregada = await Impresoras.create(impresoraNueva);
        
        console.log("almacenada: ", impresoraAgregada)

        await putControllerUsuario(impresoraAgregada, impresoraNueva.usuario)

        return impresoraAgregada;
    } catch (error) {
        return error;
    }
};

export default postControllerImpresoras;
