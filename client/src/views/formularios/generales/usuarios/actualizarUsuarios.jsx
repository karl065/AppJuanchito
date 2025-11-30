import { useFormik } from 'formik';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';
import { actualizarUsuariosAction } from '../../../../redux/admin/actions/actualizarUsuariosAction.jsx';
import { Dropdown, DropdownItem } from 'flowbite-react';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';

const FormularioActualizarUsuario = ({ userToEdit, onSuccess, onClose }) => {
	const dispatch = useDispatch();
	const roles = useSelector((state) => state.roles?.roles) || [];
	const [roleSeleccionado, setRoleSeleccionado] = useState(
		userToEdit?.role || 'Rol'
	);
	const [verContrasena, setVerContrasena] = useState(false);

	// Validación diferente: Password es opcional
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
		// Password opcional: solo valida si tiene valor
		password: Yup.string().min(
			6,
			'La contraseña debe tener al menos 6 caracteres'
		),
		role: Yup.string().required('Debes seleccionar un rol'),
	});

	const formik = useFormik({
		enableReinitialize: true,
		initialValues: {
			nombre: userToEdit?.nombre || '',
			correo: userToEdit?.correo || '',
			celular: userToEdit?.celular || '',
			role: userToEdit?.role || '',
			password: '', // Contraseña inicia vacía
		},
		validationSchema,
		onSubmit: async (values, { setSubmitting, resetForm }) => {
			try {
				// Filtramos la contraseña si está vacía para no enviarla
				const usuarioActualizado = { ...values, _id: userToEdit._id };
				if (!values.password) {
					delete usuarioActualizado.password;
				}
				actualizarUsuariosAction(dispatch, userToEdit._id, usuarioActualizado);
				if (onSuccess) onSuccess(usuarioActualizado);
				resetForm();
			} catch (error) {
				console.error('Error al actualizar usuario', error);
			} finally {
				setSubmitting(false);
			}
		},
	});

	const handleDropdownSelect = (rol) => {
		formik.setFieldValue('role', rol);
		setRoleSeleccionado(rol);
	};

	return (
		<form
			onSubmit={formik.handleSubmit}
			className="flex flex-col gap-4 p-1 w-full max-w-sm mx-auto">
			{/* NOMBRE */}
			<div>
				<input
					type="text"
					name="nombre"
					placeholder="Nombre"
					onChange={formik.handleChange}
					onBlur={formik.handleBlur}
					value={formik.values.nombre}
					className={`w-full p-3 rounded-xl bg-black/80 text-white placeholder-gray-500 font-semibold focus:ring-2 focus:ring-red-500 focus:border-red-500 transition shadow-[0_0_30px_rgba(255,0,0,0.45)] ${
						formik.touched.nombre && formik.errors.nombre
							? 'border-red-600'
							: 'border-red-900'
					}`}
				/>
				{formik.touched.nombre && formik.errors.nombre && (
					<p className="text-xs font-semibold text-red-400 bg-linear-to-r from-red-900/40 via-red-700/20 to-red-900/40 border border-red-800/40 rounded-md px-2 py-1 mt-1 shadow-[0_0_8px_rgba(255,0,0,0.4)] tracking-wide animate-pulse">
						{formik.errors.nombre}
					</p>
				)}
			</div>
			{/* CORREO */}
			<div>
				<input
					type="email"
					name="correo"
					placeholder="Correo"
					onChange={formik.handleChange}
					onBlur={formik.handleBlur}
					value={formik.values.correo}
					className={`w-full p-3 rounded-xl bg-black/80 text-white placeholder-gray-500 font-semibold focus:ring-2 focus:ring-red-500 focus:border-red-500 transition shadow-[0_0_30px_rgba(255,0,0,0.45)] ${
						formik.touched.correo && formik.errors.correo
							? 'border-red-600'
							: 'border-red-900'
					}`}
				/>
				{formik.touched.correo && formik.errors.correo && (
					<p className="text-xs font-semibold text-red-400 bg-linear-to-r from-red-900/40 via-red-700/20 to-red-900/40 border border-red-800/40 rounded-md px-2 py-1 mt-1 shadow-[0_0_8px_rgba(255,0,0,0.4)] tracking-wide animate-pulse">
						{formik.errors.correo}
					</p>
				)}
			</div>
			{/* GRUPO: CELULAR Y ROL */}
			<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
				<div>
					<input
						type="tel"
						name="celular"
						placeholder="Celular"
						maxLength={10}
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
						value={formik.values.celular}
						className={`w-full p-3 rounded-xl bg-black/80 text-white placeholder-gray-500 font-semibold focus:ring-2 focus:ring-red-500 focus:border-red-500 transition shadow-[0_0_30px_rgba(255,0,0,0.45)] ${
							formik.touched.celular && formik.errors.celular
								? 'border-red-600'
								: 'border-red-900'
						}`}
					/>
					{formik.touched.celular && formik.errors.celular && (
						<p className="text-xs font-semibold text-red-400 bg-linear-to-r from-red-900/40 via-red-700/20 to-red-900/40 border border-red-800/40 rounded-md px-2 py-1 mt-1 shadow-[0_0_8px_rgba(255,0,0,0.4)] tracking-wide animate-pulse">
							{formik.errors.celular}
						</p>
					)}
				</div>
				<div>
					<div className="relative">
						<Dropdown
							label={roleSeleccionado}
							className={`bg-[linear-gradient(180deg,#2b0000_0%,#0a0000_50%,#000000_100%)] ${
								formik.touched.role && formik.errors.role
									? 'border border-red-600 focus:ring-red-600'
									: 'border border-red-900 focus:ring-red-500'
							}`}>
							{roles.map((rol) => (
								<DropdownItem
									key={rol}
									onClick={() => handleDropdownSelect(rol)}
									className="bg-transparent text-white border-none">
									{rol}
								</DropdownItem>
							))}
						</Dropdown>
						{formik.touched.role && formik.errors.role && (
							<p className="text-xs font-semibold text-red-400 bg-linear-to-r from-red-900/40 via-red-700/20 to-red-900/40 border border-red-800/40 rounded-md px-2 py-1 mt-1 shadow-[0_0_8px_rgba(255,0,0,0.4)] tracking-wide animate-pulse">
								{formik.errors.role}
							</p>
						)}
					</div>
				</div>
			</div>
			{/* PASSWORD (OPCIONAL EN UPDATE) */}
			<div>
				<label className="block text-xs font-bold text-gray-400 mb-1 ml-1">
					Contraseña (Dejar vacío para no cambiar)
				</label>
				<div className="relative">
					<input
						type={verContrasena ? 'text' : 'password'}
						name="password"
						placeholder="Nueva Contraseña"
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
						value={formik.values.password}
						className={`w-full p-3 pr-12 rounded-xl bg-black/80 text-white placeholder-gray-500 font-semibold focus:ring-2 focus:ring-red-500 focus:border-red-500 transition shadow-[0_0_30px_rgba(255,0,0,0.45)] ${
							formik.touched.password && formik.errors.password
								? 'border-red-600'
								: 'border-red-900'
						}`}
					/>
					<button
						type="button"
						onClick={() => setVerContrasena(!verContrasena)}
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
					<p className="text-xs font-semibold text-red-400 bg-linear-to-r from-red-900/40 via-red-700/20 to-red-900/40 border border-red-800/40 rounded-md px-2 py-1 mt-1 shadow-[0_0_8px_rgba(255,0,0,0.4)] tracking-wide animate-pulse">
						{formik.errors.password}
					</p>
				)}
			</div>
			{/* BOTONES */}
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
					{formik.isSubmitting ? 'Guardando...' : 'Actualizar Usuario'}
				</button>
			</div>
		</form>
	);
};
export default FormularioActualizarUsuario;
