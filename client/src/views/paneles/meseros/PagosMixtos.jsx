import { useFormik } from 'formik';
import * as Yup from 'yup';
import { formatearPesos } from '../../../helpers/formatearPesos';
import { ArrowRightIcon, XIcon } from '../../../components/Icons/Icons';
import { useDispatch } from 'react-redux';
import { crearFacturaAction } from '../../../redux/facturas/actions/crearFacturasAction';

const ModalPagosMixtos = ({
	total,
	carrito,
	setCarrito,
	usuarioId,
	cajaId,
	onClose,
	setFacturaReciente,
	showModalFactura,
}) => {
	const dispatch = useDispatch();
	// Configuración de Formik
	const formik = useFormik({
		initialValues: {
			observaciones: '',
			nequi: 0,
			daviplata: 0,
			efectivo: total, // Inicia con el total
		},
		enableReinitialize: true, // Permite reiniciar si cambia el total
		onSubmit: async (values) => {
			const valNequi = parseInt(values.nequi) || 0;
			const valDavi = parseInt(values.daviplata) || 0;
			const valEfectivoCliente = parseInt(values.efectivo) || 0;

			const metodosConSaldo = [
				{ nombre: 'nequi', valor: valNequi },
				{ nombre: 'daviplata', valor: valDavi },
				{ nombre: 'efectivo', valor: valEfectivoCliente },
			].filter((m) => m.valor > 0);

			let metodoPagoFinal = 'efectivo'; // Default

			if (metodosConSaldo.length > 1) {
				// Si hay más de 1 método usado (ej: Nequi+Efectivo, o Nequi+Daviplata)
				metodoPagoFinal = 'mixto';
			} else if (metodosConSaldo.length === 1) {
				// Si solo hay 1 método usado, tomamos su nombre
				metodoPagoFinal = metodosConSaldo[0].nombre;
			}

			const facturaNueva = {
				metodoPago: metodoPagoFinal,
				caja: cajaId,
				detallePago: {
					efectivoCliente: values.efectivo,
					daviplata: values.daviplata,
					nequi: values.nequi,
					totalPagado: totalPagado,
					cambio: diferencia,
				},
				usuario: usuarioId,
				productos: carrito.map((car) => {
					return {
						producto: car._id,
						cantidad: car.cantidad,
						precioUnitario: car.precio,
						precioTotalProducto: car.cantidad * car.precio,
					};
				}),
				precioVenta: total,
				observaciones: values.observaciones,
			};

			const facturaCreada = await crearFacturaAction(dispatch, facturaNueva);

			setFacturaReciente(facturaCreada);
			setCarrito([]);
			onClose();
			showModalFactura(true);
		},
	});

	// Manejador especial para inputs digitales (Nequi/Daviplata)
	// Recalcula automáticamente el efectivo sugerido
	const handleDigitalChange = (e) => {
		const { name, value } = e.target;
		formik.handleChange(e); // Actualiza el campo digital

		// Obtenemos valores numéricos para calcular
		const valNum = parseInt(value) || 0;
		const currentNequi =
			name === 'nequi' ? valNum : parseInt(formik.values.nequi) || 0;
		const currentDavi =
			name === 'daviplata' ? valNum : parseInt(formik.values.daviplata) || 0;

		// Ajustamos efectivo a lo que falta
		const restante = Math.max(0, total - currentNequi - currentDavi);
		formik.setFieldValue('efectivo', restante);
	};

	// Cálculos Finales para la UI (Barra de estado)
	const valNequi = parseInt(formik.values.nequi) || 0;
	const valDavi = parseInt(formik.values.daviplata) || 0;
	const valEfectivo = parseInt(formik.values.efectivo) || 0;

	const totalPagado = valNequi + valDavi + valEfectivo;
	const diferencia = totalPagado - total; // 0 = exacto, >0 = cambio, <0 = faltante

	const esValido = formik.values.observaciones.trim() !== '';

	// Determinar estilo y texto de la barra de estado
	let statusColor = 'bg-gray-800 text-white';
	let statusText = 'Ingrese montos';

	if (diferencia < 0) {
		statusColor = 'bg-red-900/40 text-red-400 border border-red-900/50';
		statusText = `FALTAN: ${formatearPesos(Math.abs(diferencia))}`;
	} else if (diferencia === 0) {
		statusColor = 'bg-green-900/40 text-green-400 border border-green-900/50';
		statusText = 'PAGO EXACTO (Cambio $0)';
	} else {
		statusColor =
			'bg-yellow-900/40 text-yellow-400 border border-yellow-900/50';
		statusText = `CAMBIO A DEVOLVER: ${formatearPesos(diferencia)}`;
	}

	return (
		<div className='fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/80 backdrop-blur-sm p-0 sm:p-4 animate-fade-in'>
			<div className='bg-[linear-gradient(60deg,#2b0000_0%,#0a0000_50%,#000000_100%)] w-full max-w-sm rounded-t-2xl sm:rounded-2xl border-t sm:border border-gray-700 shadow-2xl flex flex-col max-h-[90dvh]'>
				{/* Header */}
				<div className='p-4 border-b border-white flex justify-between items-center  rounded-t-2xl'>
					<div>
						<h3 className='text-lg font-bold text-white'>Métodos de Pago</h3>
						<p className='text-xs text-green-400'>
							Total a Pagar:{' '}
							<span className='text-green-400 font-black text-sm'>
								{formatearPesos(total)}
							</span>
						</p>
					</div>
					<button onClick={onClose} className='text-white hover:text-white'>
						<XIcon className='w-6 h-6' />
					</button>
				</div>

				<div className='flex-1 overflow-y-auto p-5 custom-scrollbar space-y-4'>
					{/* Referencia */}
					<div>
						<label className='text-[10px] font-bold text-white uppercase mb-1 block'>
							Referencia
						</label>
						<input
							type='text'
							name='observaciones'
							placeholder='Ej: Mesa 5'
							autoFocus
							className='w-full  text-white p-3 rounded-xl border border-white focus:border-red-500 outline-none text-sm font-bold placeholder-gray-600'
							value={formik.values.observaciones}
							onChange={formik.handleChange}
						/>
					</div>

					<div className='space-y-3'>
						{/* Nequi */}
						<div className='flex items-center gap-3  p-2 rounded-xl border border-white'>
							<div className='w-10 h-10  rounded-lg flex items-center justify-center text-xl shadow-inner'>
								📱
							</div>
							<div className='flex-1'>
								<span className='text-[10px] text-white font-bold uppercase block mb-0.5'>
									Nequi
								</span>
								<input
									type='number'
									name='nequi'
									className='bg-transparent w-full text-white outline-none text-base font-bold placeholder-gray-700'
									placeholder='0'
									value={formik.values.nequi}
									onChange={handleDigitalChange}
								/>
							</div>
						</div>

						{/* Daviplata */}
						<div className='flex items-center gap-3  p-2 rounded-xl border border-white'>
							<div className='w-10 h-10 rounded-lg flex items-center justify-center text-xl shadow-inner'>
								🔴
							</div>
							<div className='flex-1'>
								<span className='text-[10px] text-white font-bold uppercase block mb-0.5'>
									Daviplata
								</span>
								<input
									type='number'
									name='daviplata'
									className='bg-transparent w-full text-white outline-none text-base font-bold placeholder-gray-700'
									placeholder='0'
									value={formik.values.daviplata}
									onChange={handleDigitalChange}
								/>
							</div>
						</div>

						{/* Efectivo */}
						<div className='flex items-center gap-3 bg-gray-800 p-2 rounded-xl border border-gray-600 shadow-lg relative overflow-hidden'>
							{/* Glow effect for cash focus */}
							<div className='absolute top-0 left-0 w-1 h-full bg-green-500'></div>
							<div className='w-10 h-10  rounded-lg flex items-center justify-center text-xl'>
								💵
							</div>
							<div className='flex-1'>
								<span className='text-[10px] text-green-400 font-bold uppercase block mb-0.5'>
									Efectivo Recibido
								</span>
								<input
									type='number'
									name='efectivo'
									className='bg-transparent w-full text-white outline-none text-xl font-black placeholder-gray-700'
									placeholder='0'
									value={formik.values.efectivo}
									onChange={formik.handleChange}
								/>
							</div>
						</div>
					</div>

					{/* BARRA DE ESTADO DINÁMICA */}
					<div
						className={`p-3 rounded-xl text-center font-bold text-sm transition-all duration-300 shadow-lg flex items-center justify-center gap-2 ${statusColor}`}>
						{diferencia < 0 && <span>⚠️</span>}
						{diferencia === 0 && <span>👌</span>}
						{diferencia > 0 && <span>🤑</span>}
						{statusText}
					</div>
				</div>

				<div className='p-4 bg-gray-900 border-t border-gray-800'>
					<button
						onClick={formik.handleSubmit}
						disabled={!esValido}
						className={`w-full py-4 rounded-xl font-bold text-sm shadow-xl flex items-center justify-center gap-2 transition-all uppercase tracking-wide ${esValido ? 'bg-red-600 hover:bg-red-500 text-white shadow-red-900/40 active:scale-95' : 'bg-gray-800 text-gray-500 cursor-not-allowed'}`}>
						<span>Confirmar Venta</span>
						<ArrowRightIcon className='w-4 h-4' />
					</button>
				</div>
			</div>
		</div>
	);
};
export default ModalPagosMixtos;
