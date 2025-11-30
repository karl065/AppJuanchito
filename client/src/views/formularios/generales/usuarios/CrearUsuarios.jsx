import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';
import { crearUsuariosAction } from '../../../../redux/admin/actions/crearUsuariosAction';
import { useState } from 'react';
import { Dropdown, DropdownItem } from 'flowbite-react';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';

const FormularioCrearUsuario = ({ onSuccess, onClose }) => {
	const dispatch = useDispatch();

	// Selector de Roles (Simulado en este entorno)
	const roles = useSelector((state) => state.roles?.roles) || [];

	const [roleSeleccionado, setRoleSeleccionado] = useState('Rol');
	const [verContrasena, setVerContrasena] = useState(false);

	const handleVerContrasena = () => {
		setVerContrasena(!verContrasena);
	};

	const validationSchema = Yup.object({
		nombre: Yup.string()
			.min(3, 'El nombre es muy corto')
			.required('El nombre es obligatorio'),
		correo: Yup.string()
			.email('Correo electrónico inválido')
			.required('El correo es obligatorio'),
		celular: Yup.string()
			.matches(/^[0-9]+$/, 'Solo se permiten números')
			.min(10, 'Debe tener al menos 10 dígitos')
			.max(10, 'Máximo 10 dígitos')
			.required('El celular es obligatorio'),
		password: Yup.string()
			.min(6, 'La contraseña debe tener al menos 6 caracteres')
			.required('La contraseña es obligatoria'),
		role: Yup.string().required('Debes seleccionar un rol'),
	});

	// Configuración de Formik
	const formik = useFormik({
		initialValues: {
			nombre: '',
			correo: '',
			celular: '',
			password: '',
			role: '', // Valor inicial vacío para obligar a seleccionar
		},
		validationSchema,
		onSubmit: async (values, { setSubmitting, resetForm }) => {
			try {
				// Preparar objeto tal cual lo requiere el backend
				const nuevoUsuario = {
					nombre: values.nombre,
					correo: values.correo,
					celular: values.celular,
					password: values.password,
					role: values.role,
				};

				crearUsuariosAction(dispatch, nuevoUsuario);

				// 🚨 Despachar acción de Redux (Ejemplo)
				// await dispatch(crearUsuario(nuevoUsuario));

				// Callback de éxito
				if (onSuccess) onSuccess(nuevoUsuario);

				resetForm();
			} catch (error) {
				console.error('Error al crear usuario', error);
			} finally {
				setSubmitting(false);
			}
		},
	});

	const handleDropdownSelect = (rol) => {
		// Actualiza el valor que Formik enviará
		formik.setFieldValue('role', rol);
		// Actualiza el texto visible del botón
		setRoleSeleccionado(rol);
	};

	return (
		<form
			onSubmit={formik.handleSubmit}
			className="flex flex-col gap-4 p-1 w-full max-w-sm mx-auto">
			{/* --- CAMPO: NOMBRE --- */}
			<div>
				<div className="relative">
					<input
						type="text"
						name="nombre"
						placeholder="Nombre"
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
						value={formik.values.nombre}
						className={`w-full p-3 pr-12 rounded-xl bg-black/80 text-white 
											placeholder-gray-500
											font-semibold focus:ring-2 focus:ring-red-500
											focus:border-red-500 
											transition shadow-[0_0_30px_rgba(255,0,0,0.45)] ${
												formik.touched.nombre && formik.errors.nombre
													? 'border-red-600'
													: 'border-red-900'
											}`}
					/>
				</div>
				{formik.touched.nombre && formik.errors.nombre && (
					<p
						className="text-xs font-semibold text-red-400 
										bg-linear-to-r from-red-900/40 via-red-700/20 to-red-900/40
										border border-red-800/40 rounded-md px-2 py-1 mt-1 
										shadow-[0_0_8px_rgba(255,0,0,0.4)] tracking-wide animate-pulse">
						{formik.errors.nombre}
					</p>
				)}
			</div>

			{/* --- CAMPO: CORREO --- */}
			<div>
				<input
					type="email"
					name="correo"
					placeholder="Correo"
					onChange={formik.handleChange}
					onBlur={formik.handleBlur}
					value={formik.values.correo}
					className={`w-full p-3 pr-12 rounded-xl bg-black/80 text-white 
											placeholder-gray-500
											font-semibold focus:ring-2 focus:ring-red-500
											focus:border-red-500 
											transition shadow-[0_0_30px_rgba(255,0,0,0.45)] ${
												formik.touched.correo && formik.errors.correo
													? 'border-red-600'
													: 'border-red-900'
											}`}
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

			{/* --- GRUPO: CELULAR Y ROL --- */}
			<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
				{/* CELULAR */}
				<div>
					<input
						type="tel"
						name="celular"
						placeholder="Celular"
						maxLength={10}
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
						value={formik.values.celular}
						className={`w-full p-3 pr-12 rounded-xl bg-black/80 text-white 
											placeholder-gray-500
											font-semibold focus:ring-2 focus:ring-red-500
											focus:border-red-500 
											transition shadow-[0_0_30px_rgba(255,0,0,0.45)] ${
												formik.touched.celular && formik.errors.celular
													? 'border-red-600'
													: 'border-red-900'
											}`}
					/>
					{formik.touched.celular && formik.errors.celular && (
						<p
							className="text-xs font-semibold text-red-400
											bg-linear-to-r from-red-900/40 via-red-700/20 to-red-900/40
											border border-red-800/40 rounded-md px-2 py-1 mt-1
											shadow-[0_0_8px_rgba(255,0,0,0.4)] tracking-wide animate-pulse">
							{formik.errors.celular}
						</p>
					)}
				</div>

				{/* ROL (Select desde Mock/Redux) */}
				<div>
					<div className="relative">
						<Dropdown
							label={roleSeleccionado}
							dismissOnClick={true}
							className={`bg-[linear-gradient(180deg,#2b0000_0%,#0a0000_50%,#000000_100%)] border-none 
                            ${
															formik.touched.role && formik.errors.role
																? 'border-red-600 focus:ring-red-600'
																: 'border-red-900 focus:ring-red-500'
														}`}>
							{/* Estiliza los elementos de la lista del Dropdown (estos sí aceptan clases) */}
							{roles.map((rol) => (
								<DropdownItem
									key={rol}
									onClick={() => handleDropdownSelect(rol)}
									// Clases para las opciones individuales
									className="bg-transparent text-white rounded border-none hover:bg-black! focus:bg-black! active:bg-black!">
									{rol}
								</DropdownItem>
							))}
						</Dropdown>
						{formik.touched.role && formik.errors.role && (
							<p
								className="text-xs font-semibold text-red-400
											bg-linear-to-r from-red-900/40 via-red-700/20 to-red-900/40
											border border-red-800/40 rounded-md px-2 py-1 mt-1
											shadow-[0_0_8px_rgba(255,0,0,0.4)] tracking-wide animate-pulse">
								{formik.errors.role}
							</p>
						)}
					</div>
				</div>
			</div>
			{/* --- CAMPO: PASSWORD --- */}
			<div>
				<div className="relative">
					{' '}
					{/* CONTENEDOR RELATIVE PARA POSICIONAR EL BOTÓN */}
					<input
						type={verContrasena ? 'text' : 'password'}
						name="password"
						placeholder="Contraseña"
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
						value={formik.values.password}
						className={`w-full p-3 pr-12 rounded-xl bg-black/80 text-white 
                                    placeholder-gray-500
                                    font-semibold focus:ring-2 focus:ring-red-500
                                    focus:border-red-500 
                                    transition shadow-[0_0_30px_rgba(255,0,0,0.45)] ${
																			formik.touched.password &&
																			formik.errors.password
																				? 'border-red-600'
																				: 'border-red-900'
																		}`}
					/>
					{/* BOTÓN ABSOLUTO DENTRO DEL INPUT */}
					<button
						type="button"
						onClick={handleVerContrasena}
						className="absolute inset-y-0 right-3 flex items-center text-gray-400 hover:text-white transition-colors cursor-pointer"
						style={{ zIndex: 10 }}>
						{verContrasena ? (
							<AiFillEyeInvisible className="text-xl" />
						) : (
							<AiFillEye className="text-xl" />
						)}
					</button>
				</div>
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

			{/* --- BOTONES DE ACCIÓN --- */}
			<div className="flex gap-3 mt-4 pt-2 border-t border-gray-800">
				{onClose && (
					<button
						type="button"
						onClick={onClose}
						className="flex-1 py-3 rounded-xl border border-gray-600 text-gray-300 font-bold hover:bg-gray-800 transition-colors active:scale-95">
						Cancelar
					</button>
				)}
				<button
					type="submit"
					disabled={formik.isSubmitting || !formik.isValid}
					className={`flex-1 py-3 rounded-xl font-bold text-white shadow-lg flex justify-center items-center gap-2 transition-all active:scale-95 ${
						formik.isValid && !formik.isSubmitting
							? 'bg-red-600 hover:bg-red-500 shadow-red-900/50'
							: 'bg-gray-700 text-gray-500 cursor-not-allowed'
					}`}>
					{formik.isSubmitting ? (
						// Spinner
						<svg
							className="animate-spin h-5 w-5 text-white"
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24">
							<circle
								className="opacity-25"
								cx="12"
								cy="12"
								r="10"
								stroke="currentColor"
								strokeWidth="4"></circle>
							<path
								className="opacity-75"
								fill="currentColor"
								d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
						</svg>
					) : (
						'Crear Usuario'
					)}
				</button>
			</div>
		</form>
	);
};

export default FormularioCrearUsuario;
