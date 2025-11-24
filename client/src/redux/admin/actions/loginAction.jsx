import { alertSuccess, alertWarning } from '../../../helpers/Alertas.jsx';
import { loadingAction } from '../../app/actions/loadingAction.jsx';
import { setLogin } from '../slices/loginSlice.jsx';
import { obtenerFingerprint } from '../../../helpers/obtenerFingerPrint.jsx'; // función que veremos abajo
import loginServices from '../../../services/auth/loginServices.jsx';

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

		const data = await loginServices({
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
			console.log(data);
			// Login completo
			dispatch(setLogin(data));
			data.usuario.role === 'View' ? navigate('/view') : navigate('/admin');
			alertSuccess(`Bienvenido ${data.usuario.nombre}`);
		}

		loadingAction(false, dispatch);
	} catch (error) {
		alertWarning(error.response?.data.error || error.message);
		loadingAction(false, dispatch);
	}
};
