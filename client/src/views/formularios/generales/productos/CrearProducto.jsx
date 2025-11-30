import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Dropdown, DropdownItem } from 'flowbite-react';
import { crearProductosAction } from '../../../../redux/productos/actions/crearProductosAction.jsx';
import {
	getErrorClasses,
	getInputClasses,
} from '../../../../helpers/estilosGlobales.jsx';

const FormularioCrearProducto = ({ onSuccess, onClose }) => {
	const dispatch = useDispatch();

	// Selector de Categorías
	const categorias = useSelector((state) => state.categorias?.categorias) || [];

	// Estado local para mostrar el nombre seleccionado en el botón del Dropdown
	const [categoriaSeleccionada, setCategoriaSeleccionada] = useState(
		'Seleccionar Categoría'
	);

	// Esquema de Validación
	const validationSchema = Yup.object({
		nombre: Yup.string()
			.min(3, 'El nombre es muy corto')
			.required('El nombre es obligatorio'),
		precio: Yup.number()
			.typeError('Debe ser un número')
			.positive('El precio debe ser positivo')
			.required('El precio es obligatorio'),
		descripcion: Yup.string()
			.max(100, 'Máximo 100 caracteres')
			.required('La descripción es obligatoria'),
		categoria: Yup.string().required('Debes seleccionar una categoría'), // Aquí validamos el ID
		stock: Yup.number()
			.typeError('Debe ser un número')
			.integer('El stock debe ser un número entero')
			.min(0, 'El stock no puede ser negativo')
			.required('El stock es obligatorio'),
		unidadMedida: Yup.string().required('La unidad de medida es obligatoria'),
	});

	const formik = useFormik({
		initialValues: {
			nombre: '',
			precio: '',
			descripcion: '',
			categoria: '', // Guardará el _id
			stock: '',
			unidadMedida: '',
		},
		validationSchema,
		onSubmit: async (values, { setSubmitting, resetForm }) => {
			try {
				// Convertir tipos numéricos para asegurar payload correcto
				const nuevoProducto = {
					...values,
					precio: Number(values.precio),
					stock: Number(values.stock),
				};

				// Despachar acción (simulada o real)
				crearProductosAction(dispatch, nuevoProducto);

				if (onSuccess) onSuccess(nuevoProducto);

				// Resetear formulario y estado local
				resetForm();
				setCategoriaSeleccionada('Seleccionar Categoría');
			} catch (error) {
				console.error('Error al crear producto', error);
			} finally {
				setSubmitting(false);
			}
		},
	});

	// Manejador para el Dropdown
	const handleCategoriaSelect = (categoria) => {
		// Seteamos el ID en formik (lo que va al back)
		formik.setFieldValue('categoria', categoria._id);
		// Seteamos el Nombre visualmente
		setCategoriaSeleccionada(categoria.nombre);
	};

	return (
		<form
			onSubmit={formik.handleSubmit}
			className="flex flex-col gap-4 p-1 w-full max-w-md mx-auto">
			{/* --- NOMBRE --- */}
			<div>
				<input
					type="text"
					name="nombre"
					placeholder="Nombre del Producto (Ej: Poker Lata)"
					onChange={formik.handleChange}
					onBlur={formik.handleBlur}
					value={formik.values.nombre}
					className={getInputClasses(
						formik.touched.nombre && formik.errors.nombre
					)}
				/>
				{formik.touched.nombre && formik.errors.nombre && (
					<p className={getErrorClasses}>{formik.errors.nombre}</p>
				)}
			</div>

			{/* --- PRECIO Y STOCK (Grid 2 columnas) --- */}
			<div className="grid grid-cols-2 gap-4">
				<div>
					<input
						type="number"
						name="precio"
						placeholder="Precio venta (Ej: 3500)"
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
						value={formik.values.precio}
						className={getInputClasses(
							formik.touched.precio && formik.errors.precio
						)}
					/>
					{formik.touched.precio && formik.errors.precio && (
						<p className={getErrorClasses}>{formik.errors.precio}</p>
					)}
				</div>
				<div>
					<input
						type="number"
						name="stock"
						placeholder="Stock (Ej: 60)"
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
						value={formik.values.stock}
						className={getInputClasses(
							formik.touched.stock && formik.errors.stock
						)}
					/>
					{formik.touched.stock && formik.errors.stock && (
						<p className={getErrorClasses}>{formik.errors.stock}</p>
					)}
				</div>
			</div>

			{/* --- CATEGORÍA (Dropdown) --- */}
			<div>
				<div className="relative">
					<Dropdown
						label={categoriaSeleccionada}
						className={`bg-[linear-gradient(180deg,#2b0000_0%,#0a0000_50%,#000000_100%)] 
                        ${
													formik.touched.categoria && formik.errors.categoria
														? 'border border-red-600 focus:ring-red-600'
														: 'border border-red-900 focus:ring-red-500'
												}`}>
						{categorias.length > 0 ? (
							categorias.map((cat) => (
								<DropdownItem
									key={cat._id}
									onClick={() => handleCategoriaSelect(cat)}
									className="bg-transparent border-none">
									{cat.nombre}
								</DropdownItem>
							))
						) : (
							<div className="p-2 text-gray-400 text-sm">
								Cargando categorías...
							</div>
						)}
					</Dropdown>
					{formik.touched.categoria && formik.errors.categoria && (
						<p className={getErrorClasses}>{formik.errors.categoria}</p>
					)}
				</div>
			</div>

			{/* --- UNIDAD DE MEDIDA --- */}
			<div>
				<input
					type="text"
					name="unidadMedida"
					placeholder="Unidad de Medida (Ej: 330ml, Botella)"
					onChange={formik.handleChange}
					onBlur={formik.handleBlur}
					value={formik.values.unidadMedida}
					className={getInputClasses(
						formik.touched.unidadMedida && formik.errors.unidadMedida
					)}
				/>
				{formik.touched.unidadMedida && formik.errors.unidadMedida && (
					<p className={getErrorClasses}>{formik.errors.unidadMedida}</p>
				)}
			</div>

			{/* --- DESCRIPCIÓN --- */}
			<div>
				<textarea
					name="descripcion"
					rows="2"
					placeholder="Descripción (Ej: Lata Pequeña)"
					onChange={formik.handleChange}
					onBlur={formik.handleBlur}
					value={formik.values.descripcion}
					className={`${getInputClasses(
						formik.touched.descripcion && formik.errors.descripcion
					)} resize-none`}
				/>
				{formik.touched.descripcion && formik.errors.descripcion && (
					<p className={getErrorClasses}>{formik.errors.descripcion}</p>
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
					{formik.isSubmitting ? 'Guardando...' : 'Crear Producto'}
				</button>
			</div>
		</form>
	);
};
export default FormularioCrearProducto;
