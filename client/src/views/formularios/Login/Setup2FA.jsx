/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';
import axios from 'axios';
import server from '../../../conexiones/conexiones.jsx';
import { alertSuccess, alertWarning } from '../../../helpers/Alertas.jsx';

const Setup2FA = ({ data, setStep }) => {
	const [qrCode, setQrCode] = useState('');
	const [secret, setSecret] = useState('');
	const [code, setCode] = useState('');

	useEffect(() => {
		// Generar QR + secret desde backend
		axios
			.post(`${server.api.baseURL}auth/generar-2fa`, { userId: data.userId })
			.then((res) => {
				setQrCode(res.data.qrCode);
				setSecret(res.data.secret);
			})
			.catch((err) => alertWarning(err.response?.data || err.message));
	}, []);

	const handleVerify = () => {
		axios
			.post(`${server.api.baseURL}auth/verificar-2fa-setup`, {
				userId: data.userId,
				code,
			})
			.then(() => {
				alertSuccess('2FA activado correctamente');
				setStep('login2FA'); // pasar al paso de login 2FA
			})
			.catch((err) => alertWarning(err.response?.data || err.message));
	};

	return (
		<div className="flex flex-col items-center justify-center h-screen space-y-4">
			<h2>Configura tu dispositivo</h2>
			<img src={qrCode} alt="QR para Google Authenticator" />
			<p>Secret: {secret}</p>
			<input
				type="text"
				placeholder="Ingresa el código de Google Authenticator"
				value={code}
				onChange={(e) => setCode(e.target.value)}
			/>
			<button onClick={handleVerify}>Verificar y Activar 2FA</button>
		</div>
	);
};

export default Setup2FA;
