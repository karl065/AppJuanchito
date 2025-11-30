import * as Yup from 'yup';
import { useFormik } from 'formik';
import { alertSuccess } from '../../../../helpers/alertas.jsx';
import { XIcon } from '../../../../components/Icons/Icons.jsx';
import {
	getInputClasses,
	getLabelClasses,
} from '../../../../helpers/estilosGlobales.jsx';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Dropdown, DropdownItem } from 'flowbite-react';

const VerificacionCaja = ({ cajaId, onVerificar, onClose, userId }) => {
	const estadosCierre = useSelector((state) => state.cajas.estadosCierre);
	const [estadoSelect, setEstadoSelect] = useState(
		'Seleccione un estado de cuadre'
	);

	console.log(estadosCierre);

	const validationSchema = Yup.object().shape({
		notas: Yup.string()
			.required('Se requiere una nota o comentario de verificación.')
			.min(10, 'La nota es muy corta.'),
	});

	const formik = useFormik({
		initialValues: {
			notas: '',
			estado: '',
		},
		validationSchema: validationSchema,
		onSubmit: (values) => {
			// Estructura del objeto a enviar:

			const data = {
				estado: values.estado,
				verificadoPor: userId,
				notas: values.notas,
			};

			// Llama a la función principal de DetalleCaja
			onVerificar(data);
			alertSuccess(
				`Caja ${cajaId.slice(-6).toUpperCase()} verificada y cerrada.`
			);
			// No llamamos a onClose aquí porque lo llama el componente padre al finalizar onVerificar
		},
	});

	const handleDropdownSelect = (estado) => {
		// Actualiza el valor que Formik enviará
		formik.setFieldValue('estado', estado);
		// Actualiza el texto visible del botón
		setEstadoSelect(estado);
	};

	return (
		<div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm p-4 animate-fade-in bg-black/50">
			<div className="bg-[linear-gradient(180deg,#2b0000_0%,#0a0000_50%,#000000_100%)] w-full max-w-sm rounded-xl border border-gray-700 shadow-2xl relative flex flex-col">
				{/* Cabecera */}
				<div className="flex justify-between items-center p-4 border-b border-gray-700 shrink-0">
					<h3 className="text-lg font-bold text-red-400">
						Verificar Cierre de Caja
					</h3>
					<button
						onClick={onClose}
						className="p-1 rounded-full hover:bg-gray-700 transition-colors">
						<XIcon className="w-5 h-5 text-gray-400 hover:text-white" />
					</button>
				</div>

				<form
					onSubmit={formik.handleSubmit}
					className="flex flex-col p-4 space-y-4">
					<div className="text-sm text-gray-300">
						<p className="font-semibold mb-2">
							Confirme el conteo físico y registre cualquier observación.
						</p>
					</div>

					{/* ROL (Select desde Mock/Redux) */}
					<div>
						<div className="relative">
							<Dropdown
								label={estadoSelect}
								dismissOnClick={true}
								className={`bg-[linear-gradient(180deg,#2b0000_0%,#0a0000_50%,#000000_100%)] border-none 
												${
													formik.touched.role && formik.errors.role
														? 'border-red-600 focus:ring-red-600'
														: 'border-red-900 focus:ring-red-500'
												}`}>
								{/* Estiliza los elementos de la lista del Dropdown (estos sí aceptan clases) */}
								{estadosCierre.map((estado) => (
									<DropdownItem
										key={estado}
										onClick={() => handleDropdownSelect(estado)}
										// Clases para las opciones individuales
										className="bg-transparent text-white rounded border-none hover:bg-black! focus:bg-black! active:bg-black!">
										{estado}
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

					{/* Campo de Notas */}
					<div>
						<label htmlFor="notas" className={getLabelClasses('text-white')}>
							Notas de Verificación
						</label>
						<textarea
							id="notas"
							name="notas"
							placeholder="Ej: Revisión final, hay un sobrante de..."
							rows="4"
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
							value={formik.values.notas}
							className={`${getInputClasses(
								formik.touched.notas && formik.errors.notas
							)} text-sm resize-none`}
						/>
						{formik.touched.notas && formik.errors.notas && (
							<p
								className="text-xs font-semibold text-red-400 
										bg-linear-to-r from-red-900/40 via-red-700/20 to-red-900/40
										border border-red-800/40 rounded-md px-2 py-1 mt-1 
										shadow-[0_0_8px_rgba(255,0,0,0.4)] tracking-wide animate-pulse">
								{formik.errors.notas}
							</p>
						)}
					</div>

					{/* Botón de Verificación */}
					<button
						type="submit"
						disabled={formik.isSubmitting || !formik.isValid}
						className={`py-3 rounded-xl font-bold text-white shadow-lg transition-all ${
							formik.isValid
								? 'bg-red-600 hover:bg-red-500'
								: 'bg-gray-700 text-gray-500 cursor-not-allowed'
						}`}>
						{formik.isSubmitting
							? 'Verificando...'
							: 'Confirmar Cierre y Verificar'}
					</button>
				</form>
			</div>
		</div>
	);
};
export default VerificacionCaja;
