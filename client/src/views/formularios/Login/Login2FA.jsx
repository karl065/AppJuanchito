import { useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import { login2FAAction } from '../../../redux/admin/actions/login2FAAction.jsx';
import { useNavigate } from 'react-router-dom';

const Login2FA = ({ data }) => {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const formik = useFormik({
		initialValues: {
			code: '',
			recordar: false,
		},
		onSubmit: (values) => {
			dispatch(
				login2FAAction(
					{
						userId: data.userId,
						fingerprint: data.fingerprint,
						code: values.code,
						recordar: values.recordar, // 👈 se envía también
					},
					navigate
				)
			);
		},
	});

	return (
		// 📱 OPTIMIZACIÓN: Contenedor principal scrollable y de altura dinámica
		<div className='flex items-center justify-center min-h-dvh w-full overflow-y-auto  py-4'>
			<div className='flex w-full h-full items-center justify-center max-w-md mx-auto'>
				<div
					className='
                    relative flex flex-col items-center justify-center 
                    p-6 sm:p-10 /* 📱 Padding reducido en móvil */
                    w-[95%] sm:w-auto /* 📱 Ancho adaptativo */
                    rounded-2xl bg-transparent 
                    space-y-6 sm:space-y-8
                '>
					{/* Haz de luz superior */}
					<div className='absolute -top-1 left-1/2 -translate-x-1/2 w-1/2 h-1 bg-red-500 blur-md opacity-70'></div>

					{/* TITULOS */}
					<div className='space-y-1 w-full'>
						<h3
							className='
                                text-xl sm:text-3xl /* 📱 Texto más pequeño en móvil */
                                font-extrabold uppercase tracking-wide text-center
                                bg-linear-to-r from-red-700 via-red-300 to-red-700
                                text-transparent bg-clip-text drop-shadow-[0_0_10px_rgba(255,0,0,0.7)]
                                animate-[shine_3s_linear_infinite]
                                leading-tight
                            '>
							Ingresa tu código
						</h3>

						<h3
							className='
                                text-lg sm:text-2xl /* 📱 Texto más pequeño en móvil */
                                font-extrabold uppercase tracking-wide text-center
                                bg-linear-to-r from-red-700 via-red-300 to-red-700
                                text-transparent bg-clip-text drop-shadow-[0_0_10px_rgba(255,0,0,0.7)]
                                animate-[shine_3s_linear_infinite]
                                leading-tight
                            '>
							de Google Authenticator
						</h3>
					</div>

					{/* INPUT CÓDIGO */}
					<input
						type='number'
						name='code'
						placeholder='Código'
						value={formik.values.code}
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
						// 📱 inputMode="numeric" activa teclado numérico en Android
						inputMode='numeric'
						className='
                            w-full p-4 text-center tracking-[0.5em] text-xl rounded-xl bg-black/80 text-white 
                            placeholder-gray-600 font-bold focus:ring-2
                            shadow-[0_0_30px_rgba(255,0,0,0.45)]
                            focus:ring-red-500 transition outline-none border border-red-900/50
                        '
					/>

					{/* 🔥 CHECKBOX */}
					<label
						className='
                            flex items-center justify-center space-x-3 cursor-pointer 
                            /* 📱 Ajusté el tamaño del texto porque 3xl rompía la pantalla en móviles */
                            text-sm sm:text-lg 
                            font-extrabold uppercase tracking-wide text-center
                            bg-linear-to-r from-red-700 via-red-300 to-red-700
                            text-transparent bg-clip-text drop-shadow-[0_0_5px_rgba(255,0,0,0.5)]
                            animate-[shine_3s_linear_infinite]
                            p-2 hover:opacity-80 transition
                        '>
						<input
							type='checkbox'
							name='recordar'
							checked={formik.values.recordar}
							onChange={formik.handleChange}
							className='
                                w-5 h-5 rounded bg-black border-red-600 
                                checked:bg-red-600 focus:ring-red-500 focus:ring-offset-black
                            '
						/>
						{/* El span necesita color text-red-400 fallback o heredar del gradiente con trucos, 
                            pero al usar bg-clip-text en el padre, el texto se ve bien. 
                            Agrego 'text-red-200' como base por si falla el clip */}
						<span className='text-red-200 bg-clip-text bg-linear-to-r from-red-500 to-red-300'>
							Recordar este dispositivo
						</span>
					</label>

					{/* BOTÓN */}
					<button
						type='submit'
						onClick={formik.handleSubmit}
						className='
                            w-full p-3 rounded-xl
                            bg-linear-to-r from-red-700 to-red-900
                            text-white font-bold uppercase tracking-wide text-sm sm:text-base
                            shadow-[0_0_20px_rgba(255,0,0,0.45)]
                            hover:shadow-[0_0_30px_rgba(255,0,0,0.6)]
                            active:scale-95 transition
                            touch-manipulation
                        '>
						Verificar
					</button>
				</div>
			</div>
		</div>
	);
};

export default Login2FA;
