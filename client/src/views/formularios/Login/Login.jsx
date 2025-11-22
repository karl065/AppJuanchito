import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { CirclesWithBar, FallingLines } from 'react-loader-spinner';
import { loadingAction } from '../../../redux/app/actions/loadingAction.jsx';
import { loginAction } from '../../../redux/admin/actions/loginAction.jsx';

const LoginForm = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const loading = useSelector((state) => state.loading.isLoading);

	// 📌 Validación
	const validationSchema = Yup.object({
		email: Yup.string().required('Campo obligatorio'),
		password: Yup.string().required('Campo obligatorio'),
	});

	// 📌 Formik
	const formik = useFormik({
		initialValues: {
			email: '',
			password: '',
		},
		validationSchema,
		onSubmit: (values) => {
			loadingAction(true, dispatch);
			loginAction(values, dispatch, navigate);
		},
	});

	return (
		<div className="flex items-center justify-center h-screen">
			<div className="flex w-full h-full items-center justify-center">
				{/* PANEL METÁLICO  */}
				<div
					className="
					relative flex items-center justify-center p-10
					rounded-2xl border 
					bg-linear-to-br from-black via-gray-900 to-black
					border-red-700/60 shadow-[0_0_30px_rgba(255,0,0,0.45)]
					overflow-hidden
				">
					{/* EFECTO DE BRILLO METÁLICO */}
					<div className="absolute inset-0 bg-linear-to-br from-red-900/20 via-transparent to-red-900/20 pointer-events-none"></div>

					{/* Haz de luz superior */}
					<div className="absolute -top-1 left-1/2 -translate-x-1/2 w-1/2 h-1 bg-red-500 blur-md opacity-70"></div>

					{/* Borde luminoso dinámico */}
					<div className="absolute inset-0 rounded-2xl border border-red-800/40 shadow-[0_0_40px_rgba(255,0,0,0.3)] pointer-events-none"></div>

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
						<div className="flex flex-col p-2 space-y-4 w-full">
							{/* TITULO METALIZADO */}
							<h1
								className="
								text-3xl font-extrabold uppercase tracking-wide text-center
								bg-linear-to-r from-red-700 via-red-300 to-red-700
								text-transparent bg-clip-text
								drop-shadow-[0_0_10px_rgba(255,0,0,0.7)]
								animate-[shine_3s_linear_infinite]
							">
								Juanchito App
							</h1>

							<form
								onSubmit={formik.handleSubmit}
								className="flex flex-col items-center justify-center p-4 space-y-4 w-full">
								{/* INPUT EMAIL */}
								<div className="w-full">
									<input
										type="text"
										name="email"
										id="email"
										onChange={formik.handleChange}
										onBlur={formik.handleBlur}
										value={formik.values.email}
										placeholder="Email"
										className={`w-full p-3 rounded-xl bg-black/80 text-white placeholder-gray-500 font-semibold border-2 focus:ring-2 focus:ring-red-500 focus:border-red-500 transition ${
											formik.touched.email && formik.errors.email
												? 'border-red-600'
												: 'border-red-900'
										}`}
										autoComplete="off"
									/>
									{formik.touched.email && formik.errors.email && (
										<p
											className="text-xs font-semibold text-red-400 
										bg-linear-to-r from-red-900/40 via-red-700/20 to-red-900/40
										border border-red-800/40 rounded-md px-2 py-1 mt-1 
										shadow-[0_0_8px_rgba(255,0,0,0.4)] tracking-wide animate-pulse">
											{formik.errors.email}
										</p>
									)}
								</div>

								{/* INPUT PASSWORD */}
								<div className="w-full">
									<input
										type="password"
										name="password"
										id="password"
										onChange={formik.handleChange}
										onBlur={formik.handleBlur}
										value={formik.values.password}
										placeholder="Contraseña"
										className={`w-full p-3 rounded-xl bg-black/80 text-white placeholder-gray-500 font-semibold border-2 focus:ring-2 focus:ring-red-500 focus:border-red-500 transition ${
											formik.touched.password && formik.errors.password
												? 'border-red-600'
												: 'border-red-900'
										}`}
									/>
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
