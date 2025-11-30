import { useEffect, useState } from 'react';
import { alertSuccess } from '../../../helpers/alertas.jsx';
import { useBluetoothScanner } from '../../../helpers/useBluetoothScanner.jsx';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import {
	getInputClasses,
	getLabelClasses,
} from '../../../helpers/estilosGlobales.jsx';
import { ScanIcon } from '../../../components/Icons/Icons.jsx';
import { useDispatch, useSelector } from 'react-redux';
import { crearImpresorasAction } from '../../../redux/impresoras/actions/crearImpresorasAction.jsx';

const ConfiguracionImpresora = () => {
	const dispatch = useDispatch();
	// 🚨 USAMOS EL HOOK PERSONALIZADO EN LUGAR DE LOS ESTADOS LOCALES DE ESCANEO
	const { dispositivosBT, scanning, iniciarEscaneo } = useBluetoothScanner();

	const login = useSelector((state) => state.login.login);

	// Estado para la configuración global de la impresión
	const [modoImpresion, setModoImpresion] = useState('bluetooth');

	// --- FORMIK Y VALIDACIÓN ---
	const validationSchema = Yup.object().shape({
		macAddress: Yup.string().when('modoImpresion', {
			is: 'bluetooth',
			then: (schema) =>
				schema
					.required('Debe seleccionar un Dispositivo.')
					.matches(
						/^([0-9A-Fa-f]{2}[:-]){5}([0-9A-Fa-f]{2})$/,
						'Formato MAC inválido'
					),
			otherwise: (schema) => schema.notRequired(),
		}),
		ipAddress: Yup.string().when('modoImpresion', {
			is: 'wifi',
			then: (schema) =>
				schema
					.required('La IP es requerida.')
					.matches(
						/^((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/,
						'Formato IP inválido'
					),
			otherwise: (schema) => schema.notRequired(),
		}),
		port: Yup.number().when('modoImpresion', {
			is: 'wifi',
			then: (schema) =>
				schema
					.required('El puerto es requerido.')
					.integer('Debe ser entero')
					.min(1024, 'Mín. 1024')
					.max(65535, 'Máx. 65535'),
			otherwise: (schema) => schema.notRequired(),
		}),
	});

	const formik = useFormik({
		initialValues: {
			nombre: '',
			modoImpresion: 'bluetooth',
			macAddress: '',
			ipAddress: '',
			port: 0,
			usuario: login._id,
		},
		validationSchema: validationSchema,
		onSubmit: (values) => {
			crearImpresorasAction(dispatch, values);
			alertSuccess(
				`Configuración de ${values.modoImpresion.toUpperCase()} guardada con éxito.`
			);
		},
	});

	// Sincronizar el modo de visualización con Formik
	useEffect(() => {
		formik.setFieldValue('modoImpresion', modoImpresion, false);
	}, [formik, modoImpresion]);

	// --- RENDERIZADO DE LA VISTA ---
	return (
		<form
			onSubmit={formik.handleSubmit}
			className="flex-1 flex-col h-full overflow-y-auto">
			{/* --- 1. CONTENIDO SCROLLABLE (Todo el formulario menos el footer) --- */}
			<div className="flex-1 overflow-y-auto space-y-5 px-4 pt-4 pb-1 pr-6">
				{/* 🚨 NUEVO: CAMPO NOMBRE */}
				<div>
					<label className={getLabelClasses('text-yellow-400')}>
						Nombre de la Conexión (Ej: Caja Principal)
					</label>
					<input
						type="text"
						name="nombre"
						placeholder="Nombre único para identificar esta impresora"
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
						value={formik.values.nombre}
						className={getInputClasses(
							formik.touched.nombre && formik.errors.nombre
						)}
					/>
					{formik.touched.nombre && formik.errors.nombre && (
						<p className="text-xs text-red-400 mt-1">{formik.errors.nombre}</p>
					)}
				</div>

				{/* 1. SELECCIÓN DE MODO */}
				<div>
					<label className={getLabelClasses()}>Modo de Conexión</label>
					<div className="flex gap-4 mt-2 bg-black/80 p-2 rounded-xl border border-red-900/50">
						<button
							type="button"
							onClick={() => setModoImpresion('bluetooth')}
							className={`flex-1 py-2 rounded-lg font-bold transition-all ${
								modoImpresion === 'bluetooth'
									? 'bg-red-600 shadow-lg shadow-red-900/50'
									: 'bg-gray-700/50 text-gray-400 hover:bg-gray-700'
							}`}>
							Bluetooth
						</button>
						<button
							type="button"
							onClick={() => setModoImpresion('wifi')}
							className={`flex-1 py-2 rounded-lg font-bold transition-all ${
								modoImpresion === 'wifi'
									? 'bg-red-600 shadow-lg shadow-red-900/50'
									: 'bg-gray-700/50 text-gray-400 hover:bg-gray-700'
							}`}>
							Wi-Fi / LAN
						</button>
					</div>
				</div>

				{/* 2. CONFIGURACIÓN BLUETOOTH */}
				{modoImpresion === 'bluetooth' && (
					<div className="space-y-3 p-3 border border-gray-700 rounded-xl bg-gray-800/50 shadow-inner">
						<label className={getLabelClasses('text-red-400')}>
							Seleccionar Impresora
						</label>

						{/* Botón Escaneo */}
						<button
							type="button"
							onClick={iniciarEscaneo}
							disabled={scanning}
							className="w-full py-2 rounded-xl bg-blue-600 hover:bg-blue-500 font-bold transition-all disabled:opacity-50 flex items-center justify-center gap-2">
							<ScanIcon
								className={`w-5 h-5 ${scanning ? 'animate-spin' : ''}`}
							/>
							{scanning ? 'Escaneando...' : 'Buscar Impresoras Emparejadas'}
						</button>

						{/* Lista de Dispositivos */}
						<div className="max-h-32 overflow-y-auto border border-gray-600 rounded-lg p-2 bg-black/50 custom-scrollbar">
							{dispositivosBT.length === 0 ? (
								<p className="text-xs text-gray-500 py-2 text-center">
									Inicie el escaneo para ver dispositivos.
								</p>
							) : (
								dispositivosBT.map((device) => (
									<div
										key={device.id}
										onClick={() => {
											formik.setFieldValue('macAddress', device.id);
											alertSuccess(`Dispositivo ${device.name} seleccionado.`); // Retroalimentación visual
										}}
										className={`p-2 my-1 rounded-lg text-xs cursor-pointer hover:bg-red-900/30 transition-colors ${
											formik.values.macAddress === device.id
												? 'bg-red-700/50 border border-red-500'
												: 'bg-gray-700/20'
										}`}>
										<p className="font-bold truncate">{device.name}</p>
									</div>
								))
							)}
						</div>

						{/* 🚨 Mensaje de error (Validación de selección) */}
						{formik.touched.macAddress && formik.errors.macAddress && (
							<p className="text-xs text-red-400 mt-1">
								{formik.errors.macAddress}
							</p>
						)}
					</div>
				)}

				{/* 3. CONFIGURACIÓN WI-FI / LAN */}
				{modoImpresion === 'wifi' && (
					<div className="space-y-3 p-3 border border-gray-700 rounded-xl bg-gray-800/50 shadow-inner">
						<label className={getLabelClasses('text-red-400')}>
							Wi-Fi / LAN (IP y Puerto)
						</label>
						<div>
							<label className={getLabelClasses()}>Dirección IP</label>
							<input
								type="text"
								name="ipAddress"
								placeholder="Ej: 192.168.1.100"
								onChange={formik.handleChange}
								onBlur={formik.handleBlur}
								value={formik.values.ipAddress}
								className={getInputClasses(
									formik.touched.ipAddress && formik.errors.ipAddress
								)}
							/>
							{formik.touched.ipAddress && formik.errors.ipAddress && (
								<p className="text-xs text-red-400 mt-1">
									{formik.errors.ipAddress}
								</p>
							)}
						</div>
						<div>
							<label className={getLabelClasses()}>Puerto (Port)</label>
							<input
								type="number"
								name="port"
								placeholder="9100 (Estándar)"
								onChange={formik.handleChange}
								onBlur={formik.handleBlur}
								value={formik.values.port}
								className={getInputClasses(
									formik.touched.port && formik.errors.port
								)}
							/>
							{formik.touched.port && formik.errors.port && (
								<p className="text-xs text-red-400 mt-1">
									{formik.errors.port}
								</p>
							)}
						</div>
					</div>
				)}
			</div>
			{/* --- FIN DEL CONTENIDO SCROLLABLE --- */}

			{/* 4. BOTONES DE ACCIÓN (FOOTER FIJO) */}
			<div className="flex gap-3 pt-3 border-t border-gray-700 px-4 pb-2 shrink-0">
				<button
					type="submit"
					disabled={formik.isSubmitting || !formik.isValid}
					className={`flex-1 py-3 rounded-xl font-bold text-white shadow-lg transition-all ${
						formik.isValid
							? 'bg-red-600 hover:bg-red-500'
							: 'bg-gray-700 text-gray-500 cursor-not-allowed'
					}`}>
					Guardar Configuración
				</button>
			</div>
		</form>
	);
};

export default ConfiguracionImpresora;
