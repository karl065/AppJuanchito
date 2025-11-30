import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {
	getErrorClasses,
	getInputClasses,
} from '../../../../helpers/estilosGlobales.jsx';
import { actualizarProductosAction } from '../../../../redux/productos/actions/actualizarProductosAction.jsx';
import { Dropdown, DropdownItem } from 'flowbite-react';

const FormularioActualizarProducto = ({
	productoAEditar,
	onSuccess,
	onClose,
}) => {
	const dispatch = useDispatch();
	const categorias = useSelector((state) => state.categorias?.categorias) || [];

	// Inicializar el nombre de la categoría basado en el objeto que llega
	// Nota: productoAEditar.categoria es un objeto { nombre, _id } según los mocks
	const [categoriaSeleccionada, setCategoriaSeleccionada] = useState(
		productoAEditar?.categoria?.nombre || 'Seleccionar Categoría'
	);

	const validationSchema = Yup.object({
		nombre: Yup.string()
			.min(3, 'El nombre es muy corto')
			.required('El nombre es obligatorio'),
		precio: Yup.number()
			.typeError('Debe ser un número')
			.positive('Debe ser positivo')
			.required('Requerido'),
		descripcion: Yup.string()
			.max(100, 'Máximo 100 caracteres')
			.required('Requerido'),
		categoria: Yup.string().required('Debes seleccionar una categoría'),
		stock: Yup.number()
			.typeError('Debe ser un número')
			.integer('Entero')
			.min(0, 'No negativo')
			.required('Requerido'),
		unidadMedida: Yup.string().required('Requerido'),
	});

	const formik = useFormik({
		enableReinitialize: true, // 🚨 Clave para cargar los datos nuevos si cambias de producto
		initialValues: {
			nombre: productoAEditar?.nombre || '',
			precio: productoAEditar?.precio || '',
			descripcion: productoAEditar?.descripcion || '',
			categoria: productoAEditar?.categoria?._id || '', // Extraemos el ID
			stock: productoAEditar?.stock || 0, // Asegurar que sea número, aunque llegue 0
			unidadMedida: productoAEditar?.unidadMedida || '',
		},
		validationSchema,
		onSubmit: async (values, { setSubmitting }) => {
			try {
				const productoActualizado = {
					...values,
					_id: productoAEditar._id, // Mantenemos el ID original
					precio: Number(values.precio),
					stock: Number(values.stock),
				};

				actualizarProductosAction(
					dispatch,
					productoAEditar._id,
					productoActualizado
				);

				if (onSuccess) onSuccess(productoActualizado);
			} catch (error) {
				console.error('Error al actualizar producto', error);
			} finally {
				setSubmitting(false);
			}
		},
	});

	const handleCategoriaSelect = (categoria) => {
		formik.setFieldValue('categoria', categoria._id);
		setCategoriaSeleccionada(categoria.nombre);
	};

	return (
		<form onSubmit={formik.handleSubmit} className="flex flex-col gap-4 p-1">
			{/* NOMBRE */}
			<div>
				<input
					type="text"
					name="nombre"
					placeholder="Nombre del Producto"
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

			{/* PRECIO Y STOCK */}
			<div className="grid grid-cols-2 gap-4">
				<div>
					<input
						type="number"
						name="precio"
						placeholder="Precio"
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
						placeholder="Stock"
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

			{/* CATEGORÍA */}
			<div>
				<div className="relative">
					<Dropdown
						label={categoriaSeleccionada}
						className={`bg-[linear-gradient(180deg,#2b0000_0%,#0a0000_50%,#000000_100%)] ${
							formik.touched.categoria && formik.errors.categoria
								? 'border-red-600'
								: 'border-red-900'
						}`}>
						{categorias.map((cat) => (
							<DropdownItem
								key={cat._id}
								onClick={() => handleCategoriaSelect(cat)}>
								{cat.nombre}
							</DropdownItem>
						))}
					</Dropdown>
					{formik.touched.categoria && formik.errors.categoria && (
						<p className={getErrorClasses}>{formik.errors.categoria}</p>
					)}
				</div>
			</div>

			{/* UNIDAD Y DESCRIPCIÓN */}
			<div>
				<input
					type="text"
					name="unidadMedida"
					placeholder="Unidad de Medida"
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
			<div>
				<textarea
					name="descripcion"
					rows="2"
					placeholder="Descripción"
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
					{formik.isSubmitting ? 'Guardando...' : 'Actualizar'}
				</button>
			</div>
		</form>
	);
};
export default FormularioActualizarProducto;
