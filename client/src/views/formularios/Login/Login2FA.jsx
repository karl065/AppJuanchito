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
		<div className="flex items-center justify-center h-screen flex-col">
			<div className="flex w-full h-full items-center justify-center flex-col">
				<div
					className="
					relative flex items-center justify-center p-10
					rounded-2xl bg-transparent overflow-hidden
					flex-col space-y-4
				">
					<div className="absolute -top-1 left-1/2 -translate-x-1/2 w-1/2 h-1 bg-red-500 blur-md opacity-70"></div>

					<h3
						className="text-3xl font-extrabold uppercase tracking-wide text-center
							bg-linear-to-r from-red-700 via-red-300 to-red-700
							text-transparent bg-clip-text drop-shadow-[0_0_10px_rgba(255,0,0,0.7)]
							animate-[shine_3s_linear_infinite]">
						Ingresa tu código
					</h3>

					<h3
						className="text-3xl font-extrabold uppercase tracking-wide text-center
							bg-linear-to-r from-red-700 via-red-300 to-red-700
							text-transparent bg-clip-text drop-shadow-[0_0_10px_rgba(255,0,0,0.7)]
							animate-[shine_3s_linear_infinite]">
						de Google Authenticator
					</h3>

					<input
						type="number"
						name="code"
						placeholder="Código"
						value={formik.values.code}
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
						className="w-full p-3 rounded-xl bg-black/80 text-white 
										placeholder-gray-500 font-semibold focus:ring-2
										shadow-[0_0_30px_rgba(255,0,0,0.45)]
										focus:ring-red-500 transition"
					/>

					{/* 🔥 CHECKBOX */}
					<label
						className="flex items-center space-x-3 cursor-pointer text-3xl font-extrabold uppercase tracking-wide text-center
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

					<button
						className="w-full p-3 rounded-xl
										bg-linear-to-r from-red-700 to-red-900
										text-white font-bold uppercase tracking-wide
										shadow-[0_0_20px_rgba(255,0,0,0.45)]
										hover:shadow-[0_0_30px_rgba(255,0,0,0.6)]
										active:scale-95 transition"
						onClick={formik.handleSubmit}>
						Verificar
					</button>
				</div>
			</div>
		</div>
	);
};

export default Login2FA;
