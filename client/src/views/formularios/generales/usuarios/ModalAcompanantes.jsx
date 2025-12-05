import { useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import {
	CheckIcon2,
	MinusIcon,
	PlusIcon,
	SearchIcon,
	XIcon2,
} from '../../../../components/Icons/Icons.jsx';

const ModalAcompanantes = ({ onClose, onConfirm, productoPrincipal }) => {
	const productos = useSelector((state) => state.productos.productos);

	const [busqueda, setBusqueda] = useState('');
	const [seleccionados, setSeleccionados] = useState([]);

	// Filtramos productos para no mostrar el mismo producto principal ni productos sin stock
	const productosDisponibles = useMemo(() => {
		return productos.filter(
			(p) =>
				p._id !== productoPrincipal._id &&
				p.stock > 0 &&
				p.nombre.toLowerCase().includes(busqueda.toLowerCase())
		);
	}, [productos, busqueda, productoPrincipal]);

	const handleAdd = (prod) => {
		setSeleccionados((prev) => {
			const existe = prev.find((p) => p._id === prod._id);
			if (existe) {
				return prev.map((p) =>
					p._id === prod._id ? { ...p, cantidad: p.cantidad + 1 } : p
				);
			}
			return [...prev, { ...prod, cantidad: 1 }];
		});
	};

	const handleRemove = (prodId) => {
		setSeleccionados((prev) => {
			const existe = prev.find((p) => p._id === prodId);
			if (existe.cantidad > 1) {
				return prev.map((p) =>
					p._id === prodId ? { ...p, cantidad: p.cantidad - 1 } : p
				);
			}
			return prev.filter((p) => p._id !== prodId);
		});
	};

	// Handler local para cerrar si estamos en preview
	const handleClose = () => {
		if (onClose) onClose();
		else console.log('Cerrar modal');
	};

	// Handler local para confirmar si estamos en preview
	const handleConfirm = () => {
		if (onConfirm) onConfirm(seleccionados);
		else console.log('Confirmar selección:', seleccionados);
	};

	return (
		<div className='fixed inset-0 z-60 flex items-center justify-center bg-black/90 backdrop-blur-sm p-4 animate-fade-in font-sans'>
			<div className='bg-gray-900 w-full max-w-lg rounded-2xl border border-gray-700 shadow-2xl flex flex-col max-h-[85vh]'>
				{/* Header */}
				<div className='p-4 border-b border-gray-800 flex justify-between items-center'>
					<div>
						<h3 className='text-lg font-bold text-white'>
							Seleccionar Acompañantes
						</h3>
						<p className='text-xs text-gray-400'>
							Gratis para:{' '}
							<span className='text-yellow-400 font-bold'>
								{productoPrincipal.nombre}
							</span>
						</p>
					</div>
					<button
						onClick={handleClose}
						className='p-2 bg-gray-800 rounded-full hover:bg-gray-700 transition-colors'>
						<XIcon2 className='text-white text-lg' />
					</button>
				</div>

				{/* Buscador */}
				<div className='p-4 bg-gray-900/50'>
					<div className='flex items-center gap-2 bg-gray-800 p-3 rounded-xl border border-gray-700'>
						<SearchIcon className='text-gray-400 text-lg' />
						<input
							type='text'
							placeholder='Buscar agua, soda, gynger...'
							className='bg-transparent w-full text-white outline-none placeholder-gray-500 text-sm'
							value={busqueda}
							onChange={(e) => setBusqueda(e.target.value)}
							autoFocus
						/>
					</div>
				</div>

				{/* Lista de Productos */}
				<div className='flex-1 overflow-y-auto p-4 custom-scrollbar grid grid-cols-1 gap-2'>
					{productosDisponibles.map((prod) => {
						const enSeleccion = seleccionados.find((s) => s._id === prod._id);
						return (
							<div
								key={prod._id}
								className='flex justify-between items-center p-3 bg-gray-800/40 border border-gray-700/50 rounded-xl hover:bg-gray-800 transition-colors'>
								<div className='flex flex-col'>
									<span className='text-sm font-bold text-white'>
										{prod.nombre}
									</span>
									<span className='text-xs text-gray-500'>
										{prod.unidadMedida} • Stock: {prod.stock}
									</span>
								</div>

								{enSeleccion ? (
									<div className='flex items-center gap-3 bg-gray-900 rounded-lg p-1 border border-gray-700'>
										<button
											onClick={() => handleRemove(prod._id)}
											className='w-8 h-8 flex items-center justify-center bg-gray-800 hover:bg-red-900/30 text-white rounded-md transition-colors'>
											<MinusIcon className='text-sm' />
										</button>
										<span className='font-bold text-white w-4 text-center'>
											{enSeleccion.cantidad}
										</span>
										<button
											onClick={() => handleAdd(prod)}
											className='w-8 h-8 flex items-center justify-center bg-blue-600 hover:bg-blue-500 text-white rounded-md shadow-lg transition-colors'>
											<PlusIcon className='text-sm' />
										</button>
									</div>
								) : (
									<button
										onClick={() => handleAdd(prod)}
										className='px-3 py-2 bg-gray-700 hover:bg-gray-600 text-white text-xs font-bold rounded-lg border border-gray-600 transition-colors'>
										Agregar
									</button>
								)}
							</div>
						);
					})}
				</div>

				{/* Footer */}
				<div className='p-4 border-t border-gray-800 bg-gray-900 rounded-b-2xl'>
					<button
						onClick={handleConfirm}
						disabled={seleccionados.length === 0}
						className={`w-full py-3.5 rounded-xl font-bold text-sm shadow-xl flex items-center justify-center gap-2 uppercase tracking-wide transition-all ${
							seleccionados.length > 0
								? 'bg-blue-600 hover:bg-blue-500 text-white shadow-blue-900/30'
								: 'bg-gray-800 text-gray-500 cursor-not-allowed'
						}`}>
						<CheckIcon2 className='text-lg' />
						Confirmar Acompañantes (
						{seleccionados.reduce((acc, el) => acc + el.cantidad, 0)})
					</button>
				</div>
			</div>
		</div>
	);
};

export default ModalAcompanantes;
