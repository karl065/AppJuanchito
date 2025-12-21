import axios from 'axios';
import server from '../../conexiones/conexiones';

const generar2FAServices = async (id, setQrCode, setSecret) => {
	try {
		const { data } = await axios.post(
			`${server.api.baseURL}auth/generar-2fa`,
			id,
			{ withCredentials: true }
		);

		setQrCode(data.qr);

		setSecret(data.otpauth);
	} catch (error) {
		console.log(error);
	}
};

export default generar2FAServices;
