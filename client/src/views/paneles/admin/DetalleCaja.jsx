import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { formatearFechaHora } from '../../../helpers/formatearFechaHora.jsx';
import { actualizarCajasAction } from '../../../redux/cajas/actions/actualizarCajasAction.jsx';
import { getLabelClasses } from '../../../helpers/estilosGlobales.jsx';
import { formatearPesos } from '../../../helpers/formatearPesos.jsx';
import VerificacionCaja from '../../formularios/generales/usuarios/VerificacionCaja.jsx';
import {
	AlertIcon,
	CheckIcon,
	XIcon,
} from '../../../components/Icons/Icons.jsx';

const DetalleCaja = ({ caja, onClose }) => {
	const dispatch = useDispatch();
	// Estado para controlar el modal de verificación
	const [isVerificationModalOpen, setIsVerificationModalOpen] = useState(false);

	const login = useSelector((state) => state.login.login);

	if (!caja) return null;

	const {
		apertura,
		cierre,
		usuario,
		estado,
		totalEfectivo,
		totalNequi,
		totalDaviplata,
		totalVentas,
		facturas,
	} = caja;

	const horaApertura = formatearFechaHora(apertura.horaApertura);
	const horaCierre = cierre?.horaCierre
		? formatearFechaHora(cierre.horaCierre)
		: 'N/A';

	// Calculamos el totalSistema con BaseInicial + TotalEfectivo de las ventas (que es lo que se tiene que cotejar)
	const totalSistemaEfectivo = apertura.baseInicial + totalEfectivo;

	// 🚨 Función para manejar la verificación (Llamada desde el Submodal)
	const handleVerificarCierre = async (verificationData) => {
		try {
			console.log(caja);
			// 1. Lógica de Negocio (Aquí llamarías a tu API/Firestore)
			await actualizarCajasAction(dispatch, caja._id, {
				cierre: {
					verificado: true,
				},
				resultadoCierre: verificationData,
				estado: 'verificada',
			});

			console.log(
				`Caja ${caja._id} marcada como verificada con nota: ${verificationData.notas}`
			);
		} catch (error) {
			console.error('Error al verificar la caja:', error);
			alert('Fallo al guardar la verificación. Intente de nuevo.');
		} finally {
			setIsVerificationModalOpen(false);
		}
	};

	// Determinar el estado visual de la diferencia
	const diferenciaClase =
		cierre.diferencia === 0
			? 'text-green-400'
			: cierre.diferencia > 0
			? 'text-yellow-400'
			: 'text-red-400';

	const diferenciaIcono =
		cierre.diferencia === 0 ? (
			<CheckIcon className="w-5 h-5 text-green-500" />
		) : (
			<AlertIcon className="w-5 h-5 text-yellow-500" />
		);

	return (
		<div className="flex flex-col h-full bg-[linear-gradient(180deg,#1a0000_0%,#000000_100%)] w-full max-w-md mx-auto rounded-xl shadow-2xl border border-gray-800 overflow-hidden">
			{/* HEADER */}
			<div className="flex justify-between items-center p-4 border-b border-red-900/30 bg-black/40 backdrop-blur-sm shrink-0">
				<div>
					<h3 className="text-lg font-bold text-white">Detalle de Caja</h3>
					<p className="text-[10px] text-gray-500 font-mono">
						ID: {caja._id ? caja._id.slice(-6).toUpperCase() : 'N/A'}
					</p>
				</div>
				<button
					onClick={onClose}
					className="p-2 rounded-full hover:bg-red-900/20 text-gray-400 hover:text-white transition-colors">
					<XIcon className="w-5 h-5" />
				</button>
			</div>

			{/* CONTENIDO SCROLLABLE */}
			<div className="flex-1 overflow-y-auto p-4 custom-scrollbar space-y-6">
				{/* INFO USUARIO Y ESTADO */}
				<div className="bg-gray-900/50 p-4 rounded-xl border border-red-900/20 shadow-md">
					<p className="text-sm font-bold text-white mb-1">
						Cajero: {usuario.nombre}
					</p>
					<p className="text-xs text-gray-400">Rol: {usuario.role}</p>
					<p
						className={`mt-2 text-xs font-bold uppercase ${
							caja.estado === 'cerrada' ? 'text-red-500' : 'text-green-500'
						}`}>
						Estado: {caja.estado} {cierre.verificado && '(Verificada)'}
					</p>
					{/* Mostrar nota de verificación si existe */}
					{cierre.verificado && cierre.notasSupervisor && (
						<div className="mt-3 p-2 bg-green-900/20 border border-green-700/50 rounded-lg">
							<p className="text-[10px] font-bold text-green-400">
								NOTA DE SUPERVISOR:
							</p>
							<p className="text-xs text-green-200 italic">
								{cierre.notasSupervisor}
							</p>
						</div>
					)}
				</div>

				{/* RESUMEN DE TIEMPO Y BASES */}
				<div className="grid grid-cols-2 gap-3">
					<div className="p-3 bg-gray-900/50 rounded-lg border border-gray-700">
						<label className={getLabelClasses('text-gray-400')}>Apertura</label>
						<p className="text-sm font-semibold text-white truncate">
							{horaApertura}
						</p>
					</div>
					<div className="p-3 bg-gray-900/50 rounded-lg border border-gray-700">
						<label className={getLabelClasses('text-gray-400')}>Cierre</label>
						<p className="text-sm font-semibold text-white truncate">
							{horaCierre}
						</p>
					</div>
					<div className="p-3 bg-gray-900/50 rounded-lg border border-gray-700">
						<label className={getLabelClasses('text-green-400')}>
							Base Inicial
						</label>
						<p className="text-sm font-bold text-white">
							{formatearPesos(apertura.baseInicial)}
						</p>
					</div>
					<div className="p-3 bg-gray-900/50 rounded-lg border border-gray-700">
						<label className={getLabelClasses('text-blue-400')}>
							Total Ventas
						</label>
						<p className="text-sm font-bold text-white">
							{formatearPesos(totalVentas)}
						</p>
					</div>
				</div>

				{/* RESUMEN DE INGRESOS (SISTEMA) */}
				<div className="space-y-2">
					<label className={getLabelClasses('text-white')}>
						Totales según Sistema (Ventas + Base)
					</label>
					<div className="bg-black/40 rounded-xl p-4 border border-red-900/20 space-y-2">
						<div className="flex justify-between items-center text-xs">
							<span className="text-gray-400">Total Efectivo (Ventas):</span>
							<span className="font-bold text-white">
								{formatearPesos(totalEfectivo)}
							</span>
						</div>
						<div className="flex justify-between items-center text-xs">
							<span className="text-gray-400">Total Nequi:</span>
							<span className="font-bold text-white">
								{formatearPesos(totalNequi)}
							</span>
						</div>
						<div className="flex justify-between items-center text-xs">
							<span className="text-gray-400">Total Daviplata:</span>
							<span className="font-bold text-white">
								{formatearPesos(totalDaviplata)}
							</span>
						</div>
						<div className="flex justify-between items-center pt-2 border-t border-gray-700/50">
							<span className="text-sm font-bold text-yellow-400">
								TOTAL ESPERADO EN EFECTIVO (Base + Efectivo):
							</span>
							<span className="text-lg font-black text-yellow-400">
								{formatearPesos(totalSistemaEfectivo)}
							</span>
						</div>
					</div>
				</div>

				{/* RESULTADOS DEL CIERRE */}
				{cierre && estado === 'cerrada' && (
					<div className="space-y-2">
						<label className={getLabelClasses('text-red-400')}>
							Resultado del Cierre
						</label>
						<div className="bg-black/40 rounded-xl p-4 border border-red-900/40 space-y-2">
							<div className="flex justify-between items-center text-xs">
								<span className="text-gray-400">Conteo Físico (Efectivo):</span>
								<span className="font-bold text-white">
									{formatearPesos(cierre.conteoFisico)}
								</span>
							</div>
							<div className="flex justify-between items-center text-xs">
								<span className="text-gray-400">
									Total Sistema (Efectivo + Base):
								</span>
								<span className="font-bold text-white">
									{formatearPesos(totalSistemaEfectivo)}
								</span>
							</div>

							<div className="flex justify-between items-center pt-2 border-t border-gray-700/50">
								<span className="text-sm font-bold text-white flex items-center gap-2">
									Diferencia {diferenciaIcono}
								</span>
								<span className={`text-xl font-black ${diferenciaClase}`}>
									{formatearPesos(cierre.diferencia)}
								</span>
							</div>
						</div>
					</div>
				)}

				{/* LISTA DE FACTURAS */}
				<div className="space-y-2">
					<label className={getLabelClasses('text-white')}>
						Facturas de la Caja ({facturas?.length})
					</label>
					{/* Contenedor de Facturas con Scroll y Altura Fija/Máxima */}
					<div className="bg-black/40 rounded-xl p-3 border border-gray-700 shadow-inner max-h-64 overflow-y-auto custom-scrollbar space-y-2">
						{facturas?.length > 0 ? (
							facturas.map(
								(
									f // Iteramos sobre todas las facturas
								) => (
									<div
										key={f._id}
										className="bg-gray-900/50 p-3 rounded-lg border border-gray-800 flex justify-between items-center text-xs hover:bg-red-900/20 transition-colors">
										<p className="font-mono text-gray-500">
											ID: {f._id.slice(-6).toUpperCase()}
										</p>
										<p
											className={`font-bold ${
												f.metodoPago === 'efectivo'
													? 'text-green-400'
													: 'text-blue-400'
											} uppercase`}>
											{f.metodoPago}
										</p>
										<p className="font-bold text-white">
											{formatearPesos(f.precioVenta)}
										</p>
									</div>
								)
							)
						) : (
							<p className="text-center text-gray-500 text-sm py-4">
								No hay facturas registradas en esta caja.
							</p>
						)}
					</div>
				</div>
			</div>

			{/* FOOTER - BOTÓN DE ACCIÓN */}
			<div className="p-4 border-t border-gray-800 bg-black/40 backdrop-blur-md flex gap-3 shrink-0">
				{cierre && estado === 'cerrada' && !cierre.verificado && (
					<button
						onClick={() => setIsVerificationModalOpen(true)}
						className="flex-1 py-3 rounded-xl bg-red-600 hover:bg-red-500 border border-red-700 text-white font-bold transition-all active:scale-95 shadow-lg flex justify-center items-center gap-2">
						Verificar Cierre (Supervisor)
					</button>
				)}
				{cierre && cierre.verificado && (
					<button
						disabled
						className="flex-1 py-3 rounded-xl bg-green-900/40 border border-green-700 text-green-300 font-bold cursor-default">
						Caja Verificada
					</button>
				)}

				<button
					onClick={onClose}
					className="py-3 px-6 rounded-xl bg-gray-800 hover:bg-gray-700 border border-gray-600 text-white font-bold transition-all active:scale-95 shadow-lg shrink-0">
					Cerrar
				</button>
			</div>

			{/* 🚨 MODAL DE VERIFICACIÓN */}
			{isVerificationModalOpen && (
				<VerificacionCaja
					cajaId={caja._id}
					userId={login._id}
					onVerificar={handleVerificarCierre}
					onClose={() => setIsVerificationModalOpen(false)}
				/>
			)}
		</div>
	);
};

export default DetalleCaja;
