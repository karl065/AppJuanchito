import { useFormik } from 'formik';
import { useState } from 'react';
import * as Yup from 'yup';
import { formatearPesos } from '../../../helpers/formatearPesos.jsx';
import ModalCalculadoraDenominaciones from '../../../components/CalculadoraDenominaciones/CalculadoraDenominaciones.jsx';
import { useDispatch, useSelector } from 'react-redux';
import {
	ArrowRightIcon,
	CalculatorIcon,
	XIcon2,
} from '../../../components/Icons/Icons.jsx';
import { cierreCajasAction } from '../../../redux/cajas/actions/cierreCajaAction.jsx';
import { useNavigate } from 'react-router-dom';
import { logoutAction } from '../../../redux/admin/actions/logoutAction.jsx';

const ModalCierreCaja = ({ onClose }) => {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const [showCalculator, setShowCalculator] = useState(false);
	const [conteoDetallado, setConteoDetallado] = useState({});

	const cajaActual = useSelector((state) => state.cajas.cajaActual);
	const login = useSelector((state) => state.login.login);

	const formik = useFormik({
		initialValues: { conteoFisico: 0 },
		validationSchema: Yup.object({
			conteoFisico: Yup.number()
				.typeError('Debe ser un número')
				.required('Requerido')
				.min(0, 'No negativo'),
		}),
		onSubmit: (values) => {
			const cierre = {
				conteoFisico: values.conteoFisico,
				traspasoDigital: cajaActual.totalNequi + cajaActual.totalDaviplata,
			};

			cierreCajasAction(dispatch, cajaActual._id, cierre);

			logoutAction(login._id, { userStatus: false }, dispatch, navigate);
		},
	});

	const handleCalculatorConfirm = (total, detalle) => {
		formik.setFieldValue('conteoFisico', total);
		setConteoDetallado(detalle);
		setShowCalculator(false);
	};

	const diferencia =
		(Number(formik.values.conteoFisico) || 0) - cajaActual.totalEfectivo;
	let diffColor = 'text-green-400';
	let diffLabel = 'Cuadre Perfecto';
	if (diferencia < 0) {
		diffColor = 'text-red-500';
		diffLabel = 'Faltante';
	} else if (diferencia > 0) {
		diffColor = 'text-blue-400';
		diffLabel = 'Sobrante';
	}

	return (
		<>
			<div className='fixed inset-0 z-50 flex items-end sm:items-center justify-center  backdrop-blur-md p-0 sm:p-4 animate-in fade-in duration-200'>
				<div className='w-full max-w-md rounded-t-2xl sm:rounded-2xl border-t sm:border border-gray-700 shadow-2xl flex flex-col max-h-[95dvh]'>
					<div className='p-4 border-b border-gray-800 flex justify-between items-center shrink-0'>
						<div>
							<h3 className='text-xl font-black text-white uppercase tracking-tight'>
								Cierre de Turno
							</h3>
							<p className='text-xs text-gray-500'>
								Verifica el efectivo en caja
							</p>
						</div>
						<button
							onClick={onClose}
							className='p-2 rounded-full text-gray-400 hover:text-white'>
							<XIcon2 className='text-lg' />
						</button>
					</div>

					<div className='flex-1 overflow-y-auto p-5 custom-scrollbar space-y-6'>
						<div className='grid grid-cols-2 gap-3'>
							<div className='bg-gray-800/50 p-3 rounded-xl border border-gray-700'>
								<span className='text-[10px] text-gray-400 font-bold uppercase block mb-1'>
									Sistema Espera
								</span>
								<span className='text-lg font-bold text-white block'>
									{formatearPesos(cajaActual.totalEfectivo)}
								</span>
							</div>
							<div
								className={`bg-gray-800/50 p-3 rounded-xl border ${diferencia !== 0 ? 'border-gray-600' : 'border-green-900/50'}`}>
								<span className='text-[10px] text-gray-400 font-bold uppercase block mb-1'>
									Diferencia ({diffLabel})
								</span>
								<span className={`text-lg font-black block ${diffColor}`}>
									{diferencia > 0 ? '+' : ''}
									{formatearPesos(diferencia)}
								</span>
							</div>
						</div>

						<form onSubmit={formik.handleSubmit} className='space-y-4'>
							<div>
								<div className='flex justify-between items-end mb-2'>
									<label className='text-xs font-bold text-white uppercase ml-1'>
										Total Efectivo Físico
									</label>
									<button
										type='button'
										onClick={() => setShowCalculator(true)}
										className='px-3 py-1.5 bg-yellow-900/20 hover:bg-yellow-900/40 text-[10px] font-bold text-yellow-400 rounded-lg flex items-center gap-1.5 transition-colors border border-yellow-900/50'>
										<CalculatorIcon className='text-sm' /> Ayuda para Conteo
									</button>
								</div>
								<div className='relative'>
									<div className='absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 font-bold text-xl'>
										$
									</div>
									<input
										type='number'
										name='conteoFisico'
										placeholder='0'
										className='w-full bg-black border-2 border-gray-800 focus:border-red-600 rounded-xl p-4 pl-8 text-3xl font-black text-white outline-none transition-colors placeholder-gray-800 text-right'
										value={formik.values.conteoFisico}
										onChange={formik.handleChange}
									/>
								</div>
								{formik.touched.conteoFisico && formik.errors.conteoFisico && (
									<p className='text-red-500 text-xs font-bold mt-1 ml-1'>
										{formik.errors.conteoFisico}
									</p>
								)}
							</div>
							<div className='relative'>
								<label className='text-xs font-bold text-white uppercase ml-1'>
									Total Nequi:
								</label>

								{/* Contenedor Flex para alinear el signo $ y el valor */}
								<div className='w-full  border-2 border-white rounded-xl p-4 pl-4 text-white outline-none flex items-center gap-2'>
									<span className='font-bold text-xl text-gray-500'>$</span>
									<span className='text-3xl font-black text-right flex-1'>
										{formatearPesos(cajaActual.totalNequi)}
									</span>
								</div>
							</div>
							<div className='relative'>
								<label className='text-xs font-bold text-white uppercase ml-1'>
									Total Daviplata:
								</label>

								{/* Contenedor Flex para alinear el signo $ y el valor */}
								<div className='w-full  border-2 border-white rounded-xl p-4 pl-4 text-white outline-none flex items-center gap-2'>
									<span className='font-bold text-xl text-gray-500'>$</span>
									<span className='text-3xl font-black text-right flex-1'>
										{formatearPesos(cajaActual.totalDaviplata)}
									</span>
								</div>
							</div>
						</form>
					</div>

					<div className='p-4  border-t border-gray-800 shrink-0'>
						<button
							onClick={formik.handleSubmit}
							disabled={!formik.isValid || !formik.dirty}
							className={`w-full py-4 rounded-xl font-bold text-sm shadow-xl flex items-center justify-center gap-2 uppercase tracking-wide transition-all ${formik.isValid && formik.dirty ? 'bg-red-600 hover:bg-red-500 text-white shadow-red-900/30 active:scale-95' : 'bg-gray-800 text-gray-600 cursor-not-allowed'}`}>
							Confirmar Cierre <ArrowRightIcon className='text-lg' />
						</button>
					</div>
				</div>
			</div>
			{showCalculator && (
				<ModalCalculadoraDenominaciones
					initialData={conteoDetallado}
					onClose={() => setShowCalculator(false)}
					onConfirm={handleCalculatorConfirm}
				/>
			)}
		</>
	);
};

export default ModalCierreCaja;
