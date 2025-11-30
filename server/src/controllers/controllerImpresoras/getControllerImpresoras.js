import Impresoras from './../../models/Impresoras.js';

const getControllerImpresoras = async () => {
    try {
        const impresoras = await Impresoras.find();
        return impresoras;
    } catch (error) {
        return error;
    }
};

export default getControllerImpresoras;
