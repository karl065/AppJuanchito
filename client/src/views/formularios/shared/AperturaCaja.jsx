import { useFormik } from 'formik';
import * as Yup from 'yup';
import { CheckIcon, LockIcon } from '../../../components/Icons/Icons.jsx';

const AperturaCaja = ({ usuario, onAbrirCaja }) => {
	const formik = useFormik({
		initialValues: {
			baseInicial: '',
		},
		validationSchema: Yup.object({
			baseInicial: Yup.number()
				.typeError('Debe ser un número')
				.required('La base inicial es obligatoria')
				.min(0, 'No puede ser negativa'),
		}),
		onSubmit: (values) => {
			// Estructura del Payload solicitada
			const payload = {
				usuario: usuario._id,
				apertura: {
					baseInicial: Number(values.baseInicial),
				},
			};
			onAbrirCaja(payload);
		},
	});

	return (
		<div className="flex flex-col items-center justify-center h-full p-6 bg-black">
			<div className="w-full max-w-sm relative">
				{/* Haz de luz decorativo */}
				<div className="absolute -top-10 left-1/2 -translate-x-1/2 w-3/4 h-32 bg-red-600/20 blur-3xl rounded-full pointer-events-none"></div>

				<div className="bg-gray-900/80 backdrop-blur-md border border-red-900/30 p-8 rounded-3xl shadow-2xl relative z-10">
					<div className="flex justify-center mb-6">
						<div className="w-20 h-20 bg-linear-to-br from-red-600 to-black rounded-full flex items-center justify-center shadow-lg border-2 border-red-500/50">
							<LockIcon className="text-4xl text-white" />
						</div>
					</div>

					<h2 className="text-2xl font-black text-center text-white mb-2 uppercase tracking-wide">
						Apertura de Caja
					</h2>
					<p className="text-gray-400 text-center text-xs mb-8">
						Hola,{' '}
						<span className="text-red-400 font-bold">{usuario.nombre}</span>.
						<br />
						Ingresa la base inicial para comenzar tu turno.
					</p>

					<form onSubmit={formik.handleSubmit} className="space-y-6">
						<div className="space-y-2">
							<label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest ml-1">
								Base Inicial en Efectivo
							</label>
							<div className="relative">
								<span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 text-xl font-bold">
									$
								</span>
								<input
									type="number"
									name="baseInicial"
									inputMode="numeric"
									placeholder="0"
									value={formik.values.baseInicial}
									onChange={formik.handleChange}
									onBlur={formik.handleBlur}
									className={`
                                        w-full bg-black text-white text-3xl font-black text-center p-4 rounded-xl 
                                        border-2 outline-none transition-all placeholder-gray-700
                                        ${
																					formik.touched.baseInicial &&
																					formik.errors.baseInicial
																						? 'border-red-500 focus:ring-4 focus:ring-red-900/20'
																						: 'border-gray-800 focus:border-red-600 focus:ring-4 focus:ring-red-900/20'
																				}
                                    `}
								/>
							</div>
							{formik.touched.baseInicial && formik.errors.baseInicial && (
								<p className="text-red-400 text-xs text-center font-bold animate-pulse">
									{formik.errors.baseInicial}
								</p>
							)}
						</div>

						<button
							type="submit"
							className="w-full py-4 bg-linear-to-r from-red-700 to-red-600 hover:from-red-600 hover:to-red-500 text-white font-bold rounded-xl shadow-lg shadow-red-900/40 active:scale-95 transition-all text-sm uppercase tracking-widest flex items-center justify-center gap-2">
							<CheckIcon className="text-lg" />
							Abrir Caja
						</button>
					</form>
				</div>
			</div>
		</div>
	);
};
export default AperturaCaja;
