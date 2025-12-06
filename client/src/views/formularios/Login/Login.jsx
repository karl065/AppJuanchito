import { useFormik } from 'formik';
import { useSelector } from 'react-redux';
import * as Yup from 'yup';
import { CirclesWithBar, FallingLines } from 'react-loader-spinner';
import { loginAction } from '../../../redux/admin/actions/loginAction.jsx';
import { obtenerFingerprint } from '../../../helpers/obtenerFingerPrint.jsx';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import { useState } from 'react';
import { Dropdown, DropdownItem } from 'flowbite-react';

const LoginForm = ({ dispatch, setStep, set2FAData, navigate }) => {
	const loading = useSelector((state) => state.loading.isLoading);
	const usuarios = useSelector((state) => state.usuarios.usuarios);
	const [verContrasena, setVerContrasena] = useState(false);

	// 📌 Estado para el nombre visible en el botón del Dropdown
	const [nombreUsuarioSeleccionado, setNombreUsuarioSeleccionado] = useState(
		'Seleccionar usuario'
	);

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

			console.log(values)

			loginAction(
				{ ...values, fingerprint },
				dispatch,
				navigate,
				setStep,
				set2FAData
			);
		},
	});

	// 📌 Función para manejar la selección del dropdown
	const handleDropdownSelect = (correo, nombre) => {
		// Actualiza el valor que Formik enviará
		formik.setFieldValue('correo', correo);
		// Actualiza el texto visible del botón
		setNombreUsuarioSeleccionado(nombre);
	};

	return (
		// 📱 OPTIMIZACIÓN: min-h-[100dvh] asegura que ocupe toda la pantalla en móviles modernos
		// overflow-y-auto permite scrollear si el teclado tapa el botón
		<div className='flex items-center justify-center min-h-dvh w-full overflow-y-auto  py-4'>
			<div className='flex w-full h-full items-center justify-center max-w-md mx-auto'>
				{/* PANEL METÁLICO */}
				<div
					className='
                    relative flex items-center justify-center 
                    p-6 sm:p-10 /* 📱 Reducimos padding en móvil para ganar espacio */
                    w-[95%] sm:w-auto /* 📱 Ancho adaptativo */
                    rounded-2xl 
                    bg-transparent 
                    overflow-visible /* Permitir que sombras o dropdowns salgan si es necesario */
                '>
					{/* Haz de luz superior */}
					<div className='absolute -top-1 left-1/2 -translate-x-1/2 w-1/2 h-1 bg-red-500 blur-md opacity-70'></div>

					{/* LOADING */}
					{loading ? (
						<div className='flex flex-col items-center space-y-5 py-8'>
							<CirclesWithBar color='red' />

							<div className='flex items-center gap-2'>
								<h1 className='text-xl font-bold text-red-500 drop-shadow-lg'>
									Iniciando Sesión...
								</h1>

								<FallingLines />
							</div>
						</div>
					) : (
						<div className='flex flex-col items-center justify-center space-y-3 sm:space-y-4 w-full'>
							{/* LOGO */}
							<img
								src='https://res.cloudinary.com/dpjeltekx/image/upload/v1763975684/juanchito/logoBlancoCuadro_gz5fwi.png'
								alt='logo'
								// 📱 Ajuste de tamaño responsivo para pantallas pequeñas
								className='w-[100px] h-[118px] sm:w-[125px] sm:h-[148px] object-contain'
							/>

							{/* TITULO METALIZADO */}
							<h1
								className='
                                text-2xl sm:text-3xl font-extrabold uppercase tracking-wide text-center
                                bg-linear-to-r from-red-700 via-red-300 to-red-700
                                text-transparent bg-clip-text
                                drop-shadow-[0_0_10px_rgba(255,0,0,0.7)]
                                animate-[shine_3s_linear_infinite]
                            '>
								Juanchito
							</h1>

							<form
								onSubmit={formik.handleSubmit}
								className='flex flex-col items-center justify-center py-2 space-y-3 sm:space-y-4 w-full'>
								{/* INPUT EMAIL (DROPDOWN) */}
								<div className='w-full flex justify-center'>
									<Dropdown
										label={nombreUsuarioSeleccionado}
										dismissOnClick={true}
										className={`
                                            bg-[linear-gradient(180deg,#2b0000_0%,#0a0000_50%,#000000_100%)] border 
                                            w-full /* Asegurar ancho */
                                            ${
																							formik.touched.correo &&
																							formik.errors.correo
																								? 'border-red-600 focus:ring-red-600 ring-1 ring-red-600'
																								: 'border-red-900 focus:ring-red-500'
																						}
                                        `}
										// Estilo inline para asegurar que el botón del dropdown ocupe el ancho en móviles
										style={{ width: '100%' }}>
										<div className='max-h-48 overflow-y-auto custom-scrollbar'>
											{usuarios.map((usuario) => (
												<DropdownItem
													key={usuario._id}
													onClick={() =>
														handleDropdownSelect(usuario.correo, usuario.nombre)
													}
													className='bg-transparent text-white hover:bg-red-900/50 focus:bg-red-900/50 px-4 py-3 cursor-pointer'>
													{usuario.nombre}
												</DropdownItem>
											))}
										</div>
									</Dropdown>

									{formik.touched.correo && formik.errors.correo && (
										<p className='w-full text-xs font-semibold text-red-400 bg-linear-to-r from-red-900/40 via-red-700/20 to-red-900/40 border border-red-800/40 rounded-md px-2 py-1 mt-1 shadow-[0_0_8px_rgba(255,0,0,0.4)] tracking-wide animate-pulse text-center'>
											{formik.errors.correo}
										</p>
									)}
								</div>

								{/* INPUT PASSWORD */}
								<div className='w-full relative group'>
									<input
										type={verContrasena ? 'text' : 'password'}
										name='password'
										id='password'
										onChange={formik.handleChange}
										onBlur={formik.handleBlur}
										value={formik.values.password}
										placeholder='Contraseña'
										className={`
                                            w-full p-3 pr-12 rounded-xl bg-black/80 text-white 
                                            placeholder-gray-500 text-sm sm:text-base
                                            font-semibold focus:ring-2 focus:ring-red-500
                                            focus:border-red-500 outline-none
                                            transition shadow-[0_0_30px_rgba(255,0,0,0.45)] 
                                            ${
																							formik.touched.password &&
																							formik.errors.password
																								? 'border border-red-600'
																								: 'border border-red-900'
																						}
                                        `}
									/>

									{/* BOTÓN DE VER CONTRASEÑA */}
									<button
										type='button'
										onClick={handleVerContrasena}
										className='absolute inset-y-0 right-3 flex items-center text-gray-400 hover:text-white transition-colors p-2'>
										{verContrasena ? (
											<AiFillEyeInvisible className='w-5 h-5' />
										) : (
											<AiFillEye className='w-5 h-5' />
										)}
									</button>

									{formik.touched.password && formik.errors.password && (
										<p className='text-xs font-semibold text-red-400 bg-linear-to-r from-red-900/40 via-red-700/20 to-red-900/40 border border-red-800/40 rounded-md px-2 py-1 mt-1 shadow-[0_0_8px_rgba(255,0,0,0.4)] tracking-wide animate-pulse'>
											{formik.errors.password}
										</p>
									)}
								</div>

								{/* BOTÓN SUBMIT */}
								<button
									type='submit'
									className='
                                        w-full p-3 rounded-xl mt-2
                                        bg-linear-to-r from-red-700 to-red-900
                                        text-white font-bold uppercase tracking-wide text-sm sm:text-base
                                        shadow-[0_0_20px_rgba(255,0,0,0.45)]
                                        hover:shadow-[0_0_30px_rgba(255,0,0,0.6)]
                                        active:scale-95 transition
                                        touch-manipulation /* Mejora respuesta táctil en móviles */
                                    '>
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
