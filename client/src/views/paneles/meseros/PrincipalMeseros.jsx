import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
	CashIcon,
	CashIcon2,
	HistoryIcon,
	HomeIcon,
} from '../../../components/Icons/Icons.jsx';
import PanelVentas from './PanelVentas.jsx';
import HistorialView from './HistoriasVista.jsx';
import MiCajaView from './Caja.jsx';
import PerfilSuperior from '../../../components/PerfilSuperior/PerfilSuperior.jsx';
import AperturaCaja from '../../formularios/shared/AperturaCaja.jsx';
import { crearCajasAction } from '../../../redux/cajas/actions/crearCajasAction.jsx';

const PrincipalMeseros = () => {
	const dispatch = useDispatch();

	// 1. ESTADOS PRINCIPALES
	const login = useSelector((state) => state.login.login);
	const cajaActual = useSelector((state) => state.cajas.cajaActual);
	const [facturasTurno, setFacturasTurno] = useState([]); // Array de facturas devueltas por Back

	console.log(cajaActual);

	// Estado UI
	const [vistaActual, setVistaActual] = useState('vender');
	const [facturaReciente, setFacturaReciente] = useState(null); // Para mostrar modal de éxito

	// HANDLERS
	const handleAbrirCaja = async (nuevaCaja) => {
		console.log('🚀 CREANDO CAJA EN BACKEND:', nuevaCaja);
		crearCajasAction(dispatch, nuevaCaja);
	};

	const handleProcesarVenta = (datosVenta) => {
		console.log('🚀 ENVIANDO VENTA AL BACKEND...', datosVenta);

		// MOCK: El backend procesa y RETORNA la factura creada
		// Aquí se simula el delay y la respuesta
		setTimeout(() => {
			const nuevaFactura = {
				_id: datosVenta._id,
				cajaId: cajaActual._id,
				mesa: datosVenta.mesa,
				total: datosVenta.total,
				metodos: datosVenta.metodos,
				cambio: datosVenta.cambio,
				items: datosVenta.carrito, // Guardamos detalle de items
				hora: new Date().toLocaleTimeString('es-CO', {
					hour: '2-digit',
					minute: '2-digit',
				}),
				fecha: new Date().toISOString(),
			};

			// 1. Guardamos en historial local
			setFacturasTurno((prev) => [nuevaFactura, ...prev]);
			// 2. Mostramos el modal de éxito con la factura retornada
			setFacturaReciente(nuevaFactura);
		}, 500);
	};

	// Si no hay caja abierta, forzar vista de apertura
	if (!cajaActual) {
		return <AperturaCaja usuario={login} onAbrirCaja={handleAbrirCaja} />;
	}

	const renderContent = () => {
		switch (vistaActual) {
			case 'vender':
				return (
					<PanelVentas
						onProcesarVenta={handleProcesarVenta}
						facturaReciente={facturaReciente}
						onCerrarFactura={() => setFacturaReciente(null)}
					/>
				);
			case 'historial':
				return <HistorialView facturas={facturasTurno} />;
			case 'caja':
				return <MiCajaView facturas={facturasTurno} cajaActual={cajaActual} />;
			default:
				return <PanelVentas />;
		}
	};

	return (
		<div className='flex flex-col h-dvh bg-gray-900 text-white font-sans overflow-hidden'>
			{/* Header */}
			<PerfilSuperior />

			{/* Main */}
			<main className='flex-1 overflow-hidden relative bg-black'>
				{renderContent()}
			</main>

			{/* Nav */}
			<nav className='h-16 bg-black/95 backdrop-blur-md border-t border-gray-800 flex justify-around items-center px-1 pb-1 shrink-0 z-30 shadow-[0_-4px_10px_rgba(0,0,0,0.5)]'>
				<NavButton
					active={vistaActual === 'vender'}
					onClick={() => setVistaActual('vender')}
					icon={<HomeIcon className='text-xl' />}
					label='Carta'
				/>
				<NavButton
					active={vistaActual === 'historial'}
					onClick={() => setVistaActual('historial')}
					icon={<HistoryIcon className='text-xl' />}
					label='Ventas'
					badge={facturasTurno.length}
				/>
				<NavButton
					active={vistaActual === 'caja'}
					onClick={() => setVistaActual('caja')}
					icon={<CashIcon className='text-xl' />}
					label='Mi Caja'
				/>
			</nav>
		</div>
	);
};

const NavButton = ({ active, onClick, icon, label, badge }) => (
	<button
		onClick={onClick}
		className={`flex flex-col items-center justify-center w-full h-full space-y-0.5 transition-all active:scale-95 touch-manipulation ${
			active ? 'text-red-500' : 'text-gray-500'
		}`}>
		<div
			className={`p-1.5 rounded-xl transition-all relative ${
				active ? 'bg-red-900/20 -translate-y-0.5' : 'translate-y-0'
			}`}>
			{icon}
			{badge > 0 && (
				<span className='absolute -top-1 -right-1 min-w-4 h-4 flex items-center justify-center bg-gray-700 text-white text-[9px] font-bold rounded-full border-2 border-black px-0.5'>
					{badge}
				</span>
			)}
		</div>
		<span
			className={`text-[9px] font-bold uppercase tracking-wide transition-opacity ${
				active ? 'opacity-100' : 'opacity-70'
			}`}>
			{label}
		</span>
	</button>
);

export default PrincipalMeseros;
