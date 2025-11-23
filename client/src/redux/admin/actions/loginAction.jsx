import axios from 'axios';
import { alertSuccess, alertWarning } from '../../../helpers/Alertas.jsx';
import { loadingAction } from '../../app/actions/loadingAction.jsx';
import server from '../../../conexiones/conexiones.jsx';
import { setLogin } from '../slices/loginSlice.jsx';
import { obtenerFingerprint } from '../../../helpers/obtenerFingerPrint.jsx'; // función que veremos abajo

export const loginAction = async (
	userLogin,
	dispatch,
	navigate,
	setStep,
	set2FAData
) => {
	try {
		loadingAction(true, dispatch);

		// Obtener fingerprint del dispositivo
		const fingerprint = await obtenerFingerprint();

		const { data } = await axios.post(`${server.api.baseURL}auth/login`, {
			...userLogin,
			fingerprint,
		});

		if (data.require2FASetup) {
			// Paso 1: Usuario necesita configurar 2FA
			set2FAData({ userId: data.userId, qrCode: null, secret: null });
			setStep('setup2FA'); // Cambia la vista al componente de setup2FA
		} else if (data.require2FA) {
			// Paso 2: Usuario necesita ingresar código 2FA
			set2FAData({ userId: data.userId, fingerprint: data.fingerprint });
			setStep('login2FA'); // Cambia la vista al componente de login2FA
		} else if (data.loginApproved) {
			// Login completo
			dispatch(setLogin(data));
			data.role === 'View' ? navigate('/view') : navigate('/admin');
			alertSuccess(`Bienvenido ${data.primerNombre}`);
		}

		loadingAction(false, dispatch);
	} catch (error) {
		alertWarning(error.response?.data || error.message);
		console.log(error.message);
		loadingAction(false, dispatch);
	}
};
