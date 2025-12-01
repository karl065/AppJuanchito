import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import {
	getErrorClasses,
	getInputClasses,
	getLabelClasses,
} from '../../../../helpers/estilosGlobales.jsx';
import { Dropdown, DropdownItem } from 'flowbite-react';
import { useState } from 'react';
import { XIcon } from '../../../../components/Icons/Icons.jsx';
import { formatearLabel } from '../../../../helpers/formatearLabel.jsx';
import { crearMovimientosAction } from '../../../../redux/movimientos/actions/crearMovimientosAction.jsx';
import { alertSuccess } from '../../../../helpers/alertas.jsx';

const FormularioCrearMovimientos = ({ onClose }) => {
	const dispatch = useDispatch();

	const tipos = useSelector((state) => state.movimientos.tiposMovimiento); // Excluimos ventas y devoluciones directas en el formulario
	const productos = useSelector((state) => state.productos.productos);
	const login = useSelector((state) => state.login.login);

	const tiposDisponibles = tipos.filter((tipo) => tipo !== 'venta');

	// Estado local para mostrar el nombre seleccionado en el botón del Dropdown
	const [tipoSeleccionado, setTipoSeleccionado] =
		useState('Seleccione un tipo');
	const [productoSeleccionado, setProductoSeleccionado] = useState(
		'Seleccione un producto'
	);

	const validationSchema = Yup.object().shape({
		tipo: Yup.string().required('El tipo es obligatorio'),
		producto: Yup.string().required('El producto es obligatorio'),
		cantidad: Yup.number()
			.min(1, 'La cantidad debe ser mayor a 0')
			.required('La cantidad es obligatoria'),
		descripcion: Yup.string()
			.min(5, 'La descripción es muy corta')
			.max(100, 'La descripción es muy larga')
			.required('La descripción es obligatoria'),
		usuario: Yup.string().required('El usuario es obligatorio'),
	});

	const formik = useFormik({
		initialValues: {
			// Utilizamos 'entrada' como valor por defecto, aunque la lógica de entrada/salida se ajustará en el backend
			tipo: 'entrada',
			producto: '',
			cantidad: 0,
			descripcion: '',
			usuario: login._id,
		},
		validationSchema: validationSchema,
		onSubmit: async (values, { setSubmitting }) => {
			const esSalida =
				values.tipo.includes('salida') ||
				values.tipo.includes('negativo') ||
				values.tipo === 'cortesía';

			const payload = {
				[esSalida ? 'salida' : 'entrada']: values.cantidad,
				descripcion: values.descripcion,
				tipo: values.tipo,
				producto: values.producto, // ID del producto
				usuario: values.usuario, // ID del usuario
			};

			await crearMovimientosAction(dispatch, payload);

			// 🚨 Simulación de Envío a API
			setTimeout(() => {
				alertSuccess(
					`✅ Movimiento de tipo "${values.tipo}" guardado para ${values.cantidad} unds.`
				);
				setSubmitting(false);
				onClose();
			}, 1000);
		},
	});

	// Manejador para el Dropdown
	const handleTipoSelect = (tipo) => {
		// Seteamos el ID en formik (lo que va al back)
		formik.setFieldValue('tipo', tipo);
		// Seteamos el Nombre visualmente
		setTipoSeleccionado(tipo);
	};
	// Manejador para el Dropdown
	const handleProductosSelect = (producto) => {
		// Seteamos el ID en formik (lo que va al back)
		formik.setFieldValue('producto', producto._id);
		// Seteamos el Nombre visualmente
		setProductoSeleccionado(`${producto.nombre} ${producto.unidadMedida}`);
	};

	// Determinar si el campo a mostrar es 'Entrada' o 'Salida' basado en el tipo seleccionado
	const isSalida =
		formik.values.tipo.includes('salida') ||
		formik.values.tipo.includes('negativo') ||
		formik.values.tipo === 'cortesía';

	const colorTheme = isSalida ? 'red' : 'green';

	return (
		<div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/80 backdrop-blur-sm p-0 sm:p-4 animate-fade-in">
			{/* Contenedor optimizado para Android (Bottom Sheet feel en móviles) */}
			<div className="bg-[linear-gradient(180deg,#2b0000_0%,#0a0000_50%,#000000_100%)] w-full max-w-lg sm:rounded-2xl rounded-t-2xl border-t sm:border border-gray-700 shadow-2xl relative flex flex-col max-h-[90dvh]">
				{/* Cabecera */}
				<div className="flex justify-between items-center p-4 border-b border-gray-700 shrink-0">
					<h3 className={`text-xl font-bold text-${colorTheme}-400`}>
						{isSalida ? 'Registrar Salida' : 'Registrar Entrada'}
					</h3>
					<button
						onClick={onClose}
						className="p-2 rounded-full hover:bg-gray-800 text-gray-400 hover:text-white transition-colors active:scale-90">
						<XIcon className="w-6 h-6" />
					</button>
				</div>

				{/* Formulario Scrollable */}
				<form
					onSubmit={formik.handleSubmit}
					className="flex flex-col p-5 space-y-5 overflow-y-auto custom-scrollbar pb-8 sm:pb-5">
					{/* Grid Tipo y Producto */}
					<div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
						{/* Tipo */}
						<div className="space-y-1">
							<label className={getLabelClasses(`text-${colorTheme}-400`)}>
								Tipo de Movimiento
							</label>
							<Dropdown
								label={tipoSeleccionado}
								className={`uppercase bg-[linear-gradient(180deg,#2b0000_0%,#0a0000_50%,#000000_100%)] border ${
									formik.touched.tipo && formik.errors.tipo
										? 'border-red-600 ring-1 ring-red-600'
										: 'border-gray-700 focus:ring-red-500'
								}`}>
								<div className="max-h-56 overflow-y-auto custom-scrollbar">
									{tiposDisponibles.map((tipo, i) => (
										<DropdownItem
											key={i}
											onClick={() => handleTipoSelect(tipo)}
											className="uppercase text-gray-300">
											{formatearLabel(tipo)}
										</DropdownItem>
									))}
								</div>
							</Dropdown>
							{formik.touched.tipo && formik.errors.tipo && (
								<p className={getErrorClasses}>{formik.errors.tipo}</p>
							)}
						</div>

						{/* Producto */}
						<div className="space-y-1">
							<label className={getLabelClasses('text-blue-400')}>
								Producto
							</label>
							<Dropdown
								label={productoSeleccionado}
								className={`uppercase bg-[linear-gradient(180deg,#2b0000_0%,#0a0000_50%,#000000_100%)] border ${
									formik.touched.producto && formik.errors.producto
										? 'border-red-600 ring-1 ring-red-600'
										: 'border-gray-700 focus:ring-red-500'
								}`}>
								<div className="max-h-56 overflow-y-auto custom-scrollbar">
									{productos.map((prod) => (
										<DropdownItem
											key={prod._id}
											onClick={() => handleProductosSelect(prod)}
											className="text-gray-300">
											<div className="flex justify-between uppercase w-full">
												<span>{`${prod.nombre} ${prod.unidadMedida}`}</span>
												<span className="text-xs text-gray-500 ml-2 pt-1">
													{prod.stock} stock
												</span>
											</div>
										</DropdownItem>
									))}
								</div>
							</Dropdown>
							{formik.touched.producto && formik.errors.producto && (
								<p className={getErrorClasses}>{formik.errors.producto}</p>
							)}
						</div>
					</div>

					{/* Grid Cantidad */}
					<div className="space-y-1">
						<label className={getLabelClasses('text-white')}>Cantidad</label>
						<input
							type="number"
							inputMode="numeric" // 📱 Android: Fuerza teclado numérico
							pattern="[0-9]*"
							enterKeyHint="next" // 📱 Android: Botón 'Siguiente'
							placeholder="0"
							{...formik.getFieldProps('cantidad')}
							className={`${getInputClasses(
								formik.touched.cantidad && formik.errors.cantidad
							)} `}
						/>
						{formik.touched.cantidad && formik.errors.cantidad && (
							<p className={getErrorClasses}>{formik.errors.cantidad}</p>
						)}
					</div>

					{/* Descripción */}
					<div className="space-y-1">
						<label className={getLabelClasses()}>Descripción</label>
						<textarea
							rows="3"
							enterKeyHint="done" // 📱 Android: Botón 'Listo' o 'Enviar'
							placeholder="Motivo del movimiento..."
							{...formik.getFieldProps('descripcion')}
							className={`${getInputClasses(
								formik.touched.descripcion && formik.errors.descripcion
							)} `}
						/>
						{formik.touched.descripcion && formik.errors.descripcion && (
							<p className={getErrorClasses}>{formik.errors.descripcion}</p>
						)}
					</div>

					{/* Botón Submit */}
					<button
						type="submit"
						disabled={formik.isSubmitting || !formik.isValid}
						className={`w-full py-4 mt-2 rounded-xl font-bold text-white shadow-lg transition-all active:scale-95 touch-manipulation ${
							formik.isValid
								? `bg-${colorTheme}-600 hover:bg-${colorTheme}-500 shadow-${colorTheme}-900/30`
								: 'bg-gray-800 text-gray-500 cursor-not-allowed'
						}`}>
						{formik.isSubmitting
							? 'Guardando...'
							: `CONFIRMAR ${isSalida ? 'SALIDA' : 'ENTRADA'}`}
					</button>
				</form>
			</div>
		</div>
	);
};
export default FormularioCrearMovimientos;
