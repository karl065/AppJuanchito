/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';
import { alertSuccess, alertWarning } from '../../../helpers/alertas.jsx';
import { generar2FAAction } from '../../../redux/admin/actions/generar2FAAction.jsx';
import { verificar2FAAction } from '../../../redux/admin/actions/verificar2FAAction.jsx';
import { useFormik } from 'formik';
import { useDispatch } from 'react-redux';

const Setup2FA = ({ data, setStep }) => {
	const [qrCode, setQrCode] = useState('');
	const [secret, setSecret] = useState('');
	const dispatch = useDispatch();

	{
		/* --- FORMULARIO FORMik --- */
	}
	const formik = useFormik({
		initialValues: {
			code: '',
			recordar: false,
		},
		onSubmit: async (values) => {
			try {
				const verificado = await verificar2FAAction(
					{
						userId: data.data.userId,
						fingerprint: data.data.fingerprint,
						code: values.code,
						recordar: values.recordar,
					},
					dispatch
				);

				if (verificado) {
					alertSuccess('2FA activado correctamente');
					setStep('login2FA');
				}
			} catch (error) {
				alertWarning(error.message);
			}
		},
	});

	useEffect(async () => {
		// Generar QR + secret desde backend
		await generar2FAAction({ userId: data.data.userId }, setQrCode, setSecret);
	}, []);

	// ✔️ Abrir Google Authenticator o PlayStore en Android/Web
	const handleOpenAuthenticator = () => {
		try {
			const win = window.open(secret);

			if (!win) {
				// no abrió → el navegador bloqueó el popup
				window.open(
					'https://play.google.com/store/apps/details?id=com.google.android.apps.authenticator2',
					'_blank'
				);
			}
		} catch (e) {
			console.log(e);
			window.open(
				'https://play.google.com/store/apps/details?id=com.google.android.apps.authenticator2',
				'_blank'
			);
		}
	};

	return (
		<div className="flex items-center justify-center min-h-screen p-4">
			<div className="flex w-full max-w-md mx-auto items-center justify-center flex-col">
				<div
					className="
					relative flex items-center justify-center p-6 sm:p-10
					rounded-2xl bg-transparent overflow-hidden
					flex-col space-y-4 w-full
				">
					<div className="absolute -top-1 left-1/2 -translate-x-1/2 w-3/4 h-1 bg-red-500 blur-md opacity-70"></div>

					<h2
						className="text-base sm:text-3xl font-extrabold uppercase tracking-wide text-center
							bg-linear-to-r from-red-700 via-red-300 to-red-700
							text-transparent bg-clip-text drop-shadow-[0_0_10px_rgba(255,0,0,0.7)]
							animate-[shine_3s_linear_infinite]">
						Configura tu dispositivo
					</h2>

					{/* QR - versión responsive */}
					<div className="w-full flex justify-center">
						<img
							src={qrCode}
							alt="QR para Google Authenticator"
							className="w-48 h-48 sm:w-56 sm:h-56 rounded-xl shadow-md object-contain"
						/>
					</div>

					{/* Botón abrir Authenticator */}
					<button
						onClick={handleOpenAuthenticator}
						className="w-full p-3 rounded-xl
								bg-linear-to-r from-red-700 to-red-900
								text-white font-bold uppercase tracking-wide
								shadow-[0_0_20px_rgba(255,0,0,0.45)]
								active:scale-95 transition">
						Abrir Google Authenticator
					</button>

					<form
						onSubmit={formik.handleSubmit}
						className="flex flex-col items-center justify-center p-4 space-y-4 w-full">
						{/* Campo código */}
						<input
							type="text"
							name="code"
							placeholder="Ingresa el código de Google"
							value={formik.values.code}
							onChange={formik.handleChange}
							className="w-full p-3 rounded-xl bg-black/80 text-white 
                placeholder-gray-500 font-semibold focus:ring-2 shadow-[0_0_30px_rgba(255,0,0,0.45)]
                focus:ring-red-500 focus:border-red-500 transition"
						/>

						{/* Checkbox */}
						<label
							className="flex items-center space-x-3 cursor-pointer text-base font-extrabold uppercase tracking-wide text-center
							bg-linear-to-r from-red-700 via-red-300 to-red-700
							text-transparent bg-clip-text drop-shadow-[0_0_10px_rgba(255,0,0,0.7)]
							animate-[shine_3s_linear_infinite]">
							<input
								type="checkbox"
								name="recordar"
								checked={formik.values.recordar}
								onChange={formik.handleChange}
								className="w-5 h-5 rounded-md accent-red-600"
							/>
							<span>Recordar este dispositivo</span>
						</label>

						{/* BOTÓN FORMik */}
						<button
							className="w-full p-3 rounded-xl
                bg-linear-to-r from-red-700 to-red-900
                text-white font-bold uppercase tracking-wide
                shadow-[0_0_20px_rgba(255,0,0,0.45)]
                hover:shadow-[0_0_30px_rgba(255,0,0,0.6)]
                active:scale-95 transition"
							onClick={formik.handleSubmit}>
							Verificar y Activar 2FA
						</button>
					</form>
				</div>
			</div>
		</div>
	);
};

export default Setup2FA;
