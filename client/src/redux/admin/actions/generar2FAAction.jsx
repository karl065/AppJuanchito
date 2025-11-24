import generar2FAServices from '../../../services/auth/generar2FAServices';

export const generar2FAAction = async (id, setQrCode, setSecret) => {
	try {
		await generar2FAServices(id, setQrCode, setSecret);
	} catch (error) {
		console.log(error);
	}
};
