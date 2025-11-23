import { useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setLogin } from '../../../redux/admin/slices/loginSlice.jsx';
import server from '../../../conexiones/conexiones.jsx';
import { alertSuccess, alertWarning } from '../../../helpers/Alertas.jsx';

const Login2FA = ({ data }) => {
	const dispatch = useDispatch();
	const [code, setCode] = useState('');

	const handleSubmit = () => {
		axios
			.post(`${server.api.baseURL}auth/login-2fa`, {
				userId: data.userId,
				fingerprint: data.fingerprint,
				code,
			})
			.then((res) => {
				dispatch(setLogin(res.data));
				alertSuccess(`Bienvenido ${res.data.usuario.primerNombre}`);
				// redirigir según rol
				window.location.href =
					res.data.usuario.role === 'View' ? '/view' : '/admin';
			})
			.catch((err) => alertWarning(err.response?.data || err.message));
	};

	return (
		<div className="flex flex-col items-center justify-center h-screen space-y-4">
			<h2>Ingresa tu código de Google Authenticator</h2>
			<input
				type="text"
				placeholder="Código 2FA"
				value={code}
				onChange={(e) => setCode(e.target.value)}
			/>
			<button onClick={handleSubmit}>Verificar 2FA</button>
		</div>
	);
};

export default Login2FA;
