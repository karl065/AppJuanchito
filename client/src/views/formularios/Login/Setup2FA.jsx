/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';
import { alertInfo, alertSuccess } from '../../../helpers/alertas.jsx';
import { generar2FAAction } from '../../../redux/admin/actions/generar2FAAction.jsx';
import { verificar2FAAction } from '../../../redux/admin/actions/verificar2FAAction.jsx';
import { useFormik } from 'formik';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Setup2FA = ({ data }) => {
	const [qrCode, setQrCode] = useState('');
	const [secret, setSecret] = useState('');
	const dispatch = useDispatch();
	const navigate = useNavigate();

	/* --- FORMULARIO FORMik --- */
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

				if (verificado.autorizado) {
					alertSuccess(
						`2FA activado correctamente, Bienvenido ${verificado.nombre}`
					);
					verificado.role === 'Mesero' ? navigate('/caja') : navigate('/admin');
				}
			} catch (error) {
				alertInfo(error.message);
			}
		},
	});

	// ✔️ SOLUCIÓN AL ERROR DE useEffect: Envuelve la lógica async dentro de una función interna
	useEffect(() => {
		const setup2FA = async () => {
			// Generar QR + secret desde backend
			await generar2FAAction(
				{ userId: data.data.userId },
				setQrCode,
				setSecret
			);
		};

		// Llama a la función asíncrona inmediatamente
		setup2FA();

		// Opcional: Puedes devolver una función de limpieza aquí si es necesario
		// return () => { ... };
	}, []); // Dependencias vacías para que se ejecute solo una vez

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
		// 📱 OPTIMIZACIÓN: Contenedor con scroll y altura dinámica
		<div className='flex items-center justify-center min-h-dvh w-full overflow-y-auto bg-black py-4'>
			<div className='flex w-full h-full items-center justify-center max-w-md mx-auto'>
				<div
					className='
                    relative flex flex-col items-center justify-center 
                    p-6 sm:p-10 /* 📱 Padding reducido en móvil */
                    w-[95%] sm:w-auto /* 📱 Ancho adaptativo */
                    rounded-2xl bg-transparent 
                    space-y-5 sm:space-y-6
                '>
					{/* Haz de luz superior */}
					<div className='absolute -top-1 left-1/2 -translate-x-1/2 w-3/4 h-1 bg-red-500 blur-md opacity-70'></div>

					{/* TITULO */}
					<h2
						className='
                            text-xl sm:text-3xl /* 📱 Texto más pequeño en móvil */
                            font-extrabold uppercase tracking-wide text-center
                            bg-linear-to-r from-red-700 via-red-300 to-red-700
                            text-transparent bg-clip-text drop-shadow-[0_0_10px_rgba(255,0,0,0.7)]
                            animate-[shine_3s_linear_infinite]
                            leading-tight
                        '>
						Configura tu dispositivo
					</h2>

					{/* QR - Adaptable */}
					<div className='w-full flex justify-center bg-white/5 p-2 rounded-xl border border-red-900/30'>
						{qrCode ? (
							<img
								src={qrCode}
								alt='QR para Google Authenticator'
								className='w-40 h-40 sm:w-56 sm:h-56 rounded-lg object-contain bg-white'
							/>
						) : (
							<div className='w-40 h-40 sm:w-56 sm:h-56 flex items-center justify-center text-red-500 animate-pulse'>
								Cargando QR...
							</div>
						)}
					</div>

					{/* Botón abrir Authenticator */}
					<button
						onClick={handleOpenAuthenticator}
						type='button'
						className='
                            w-full p-3 rounded-xl
                            bg-linear-to-r from-red-800 to-red-950 border border-red-700/50
                            text-white font-bold uppercase tracking-wide text-xs sm:text-sm
                            shadow-[0_0_15px_rgba(255,0,0,0.3)]
                            hover:bg-red-900 active:scale-95 transition
                        '>
						Abrir Google Authenticator
					</button>

					{/* FORMULARIO */}
					<form
						onSubmit={formik.handleSubmit}
						className='flex flex-col items-center justify-center space-y-4 w-full'>
						{/* Campo código */}
						<input
							type='text' // Cambiado a text para evitar flechas de número, pero con inputMode
							name='code'
							inputMode='numeric' // 📱 Activa teclado numérico en Android
							placeholder='Ingresa el código (Ej: 123456)'
							value={formik.values.code}
							onChange={formik.handleChange}
							className='
                                w-full p-3 rounded-xl bg-black/80 text-white text-center text-lg tracking-widest
                                placeholder-gray-600 font-bold focus:ring-2 
                                shadow-[0_0_30px_rgba(255,0,0,0.45)]
                                focus:ring-red-500 border border-red-900/50 outline-none transition
                            '
						/>

						{/* Checkbox */}
						<label
							className='
                                flex items-center justify-center space-x-3 cursor-pointer 
                                text-sm sm:text-base font-bold uppercase tracking-wide text-center
                                p-2 hover:opacity-80 transition select-none
                            '>
							<input
								type='checkbox'
								name='recordar'
								checked={formik.values.recordar}
								onChange={formik.handleChange}
								className='w-5 h-5 rounded accent-red-600 bg-gray-900 border-red-500'
							/>
							<span className='text-red-200 bg-clip-text bg-linear-to-r from-red-400 to-red-200 drop-shadow-[0_0_5px_rgba(255,0,0,0.5)]'>
								Recordar dispositivo
							</span>
						</label>

						{/* BOTÓN VERIFICAR */}
						<button
							type='submit'
							className='
                                w-full p-3 rounded-xl
                                bg-linear-to-r from-red-700 to-red-900
                                text-white font-bold uppercase tracking-wide text-sm sm:text-base
                                shadow-[0_0_20px_rgba(255,0,0,0.45)]
                                hover:shadow-[0_0_30px_rgba(255,0,0,0.6)]
                                active:scale-95 transition
                                touch-manipulation
                            '>
							Verificar y Activar 2FA
						</button>
					</form>
				</div>
			</div>
		</div>
	);
};

export default Setup2FA;
