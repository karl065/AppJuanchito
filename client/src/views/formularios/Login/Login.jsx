import { useFormik } from 'formik';
import { useSelector } from 'react-redux';
import * as Yup from 'yup';
import { CirclesWithBar, FallingLines } from 'react-loader-spinner';
import { loginAction } from '../../../redux/admin/actions/loginAction.jsx';
import { obtenerFingerprint } from '../../../helpers/obtenerFingerPrint.jsx';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import { useState } from 'react';

const LoginForm = ({ dispatch, setStep, set2FAData, navigate }) => {
	const loading = useSelector((state) => state.loading.isLoading);
	const [verContrasena, setVerContrasena] = useState(false);

	// 📌 Validación
	const validationSchema = Yup.object({
		correo: Yup.string().required('Campo obligatorio'),
		password: Yup.string().required('Campo obligatorio'),
	});
	const handleVerContrasena = () => {
		setVerContrasena(!verContrasena);
	};

	// 📌 Formik
	const formik = useFormik({
		initialValues: {
			correo: '',
			password: '',
		},
		validationSchema,
		onSubmit: async (values) => {
			const fingerprint = await obtenerFingerprint(); // fingerprint único del dispositivo
			loginAction(
				{ ...values, fingerprint },
				dispatch,
				navigate,
				setStep,
				set2FAData
			);
		},
	});

	return (
		<div className="flex items-center justify-center h-screen">
			<div className="flex w-full h-full items-center justify-center">
				{/* PANEL METÁLICO  */}
				<div
					className="
					relative flex items-center justify-center p-10
					rounded-2xl 
					bg-transparent 
					overflow-hidden
				">
					{/* Haz de luz superior */}
					<div className="absolute -top-1 left-1/2 -translate-x-1/2 w-1/2 h-1 bg-red-500 blur-md opacity-70"></div>

					{/* LOADING */}
					{loading ? (
						<div className="flex flex-col items-center space-y-5 py-8">
							<CirclesWithBar
								color="red"
								barColor="white"
								innerCircleColor="#a10000"
							/>

							<div className="flex items-center gap-2">
								<h1 className="text-xl font-bold text-red-500 drop-shadow-lg">
									Iniciando Sesión...
								</h1>

								<FallingLines color="red" width="40" visible={true} />
							</div>
						</div>
					) : (
						<div className="flex flex-col items-center justify-center p-2 space-y-4 w-full">
							<img
								src="https://res.cloudinary.com/dpjeltekx/image/upload/v1763975684/juanchito/logoBlancoCuadro_gz5fwi.png"
								alt="logo"
								className="w-[125px] h-[148px]"
							/>
							{/* TITULO METALIZADO */}

							<h1
								className="
								text-3xl font-extrabold uppercase tracking-wide text-center
								bg-linear-to-r from-red-700 via-red-300 to-red-700
								text-transparent bg-clip-text
								drop-shadow-[0_0_10px_rgba(255,0,0,0.7)]
								animate-[shine_3s_linear_infinite]
							">
								Juanchito
							</h1>

							<form
								onSubmit={formik.handleSubmit}
								className="flex flex-col items-center justify-center p-4 space-y-4 w-full">
								{/* INPUT EMAIL */}
								<div className="w-full">
									<input
										type="text"
										name="correo"
										id="correo"
										onChange={formik.handleChange}
										onBlur={formik.handleBlur}
										value={formik.values.correo}
										placeholder="Correo"
										className={`w-full p-3 rounded-xl bg-black/80 text-white 
											placeholder-gray-500 font-semibold focus:ring-2 shadow-[0_0_30px_rgba(255,0,0,0.45)]
											focus:ring-red-500 focus:border-red-500 transition ${
												formik.touched.correo && formik.errors.correo
													? 'border-red-600'
													: 'border-red-900'
											}`}
										autoComplete="off"
									/>
									{formik.touched.correo && formik.errors.correo && (
										<p
											className="text-xs font-semibold text-red-400 
										bg-linear-to-r from-red-900/40 via-red-700/20 to-red-900/40
										border border-red-800/40 rounded-md px-2 py-1 mt-1 
										shadow-[0_0_8px_rgba(255,0,0,0.4)] tracking-wide animate-pulse">
											{formik.errors.correo}
										</p>
									)}
								</div>

								{/* INPUT PASSWORD */}
								<div className="w-full relative">
									<input
										type={verContrasena ? 'text' : 'password'}
										name="password"
										id="password"
										onChange={formik.handleChange}
										onBlur={formik.handleBlur}
										value={formik.values.password}
										placeholder="Contraseña"
										className={`w-full p-3 pr-12 rounded-xl bg-black/80 text-white 
											placeholder-gray-500
											font-semibold focus:ring-2 focus:ring-red-500
											focus:border-red-500 
											transition shadow-[0_0_30px_rgba(255,0,0,0.45)] ${
												formik.touched.password && formik.errors.password
													? 'border-red-600'
													: 'border-red-900'
											}`}
									/>

									{/* BOTÓN DE VER CONTRASEÑA DENTRO DEL INPUT */}
									<button
										type="button"
										onClick={handleVerContrasena}
										className="absolute inset-y-0 right-3 flex items-center text-gray-400">
										{verContrasena ? (
											<AiFillEyeInvisible className="text-xl" />
										) : (
											<AiFillEye className="text-xl" />
										)}
									</button>

									{formik.touched.password && formik.errors.password && (
										<p
											className="text-xs font-semibold text-red-400
											bg-linear-to-r from-red-900/40 via-red-700/20 to-red-900/40
											border border-red-800/40 rounded-md px-2 py-1 mt-1
											shadow-[0_0_8px_rgba(255,0,0,0.4)] tracking-wide animate-pulse">
											{formik.errors.password}
										</p>
									)}
								</div>

								{/* BOTÓN */}
								<button
									type="submit"
									className="w-full p-3 rounded-xl
										bg-linear-to-r from-red-700 to-red-900
										text-white font-bold uppercase tracking-wide
										shadow-[0_0_20px_rgba(255,0,0,0.45)]
										hover:shadow-[0_0_30px_rgba(255,0,0,0.6)]
										active:scale-95 transition
									">
									Iniciar Sesión
								</button>
							</form>
						</div>
					)}
				</div>
			</div>
		</div>
	);
};

export default LoginForm;
