import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
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
import Facturas from '../admin/Facturas.jsx';

const PrincipalMeseros = () => {
	const dispatch = useDispatch();

	// 1. ESTADOS PRINCIPALES
	const login = useSelector((state) => state.login.login);
	const cajaActual = useSelector((state) => state.cajas.cajaActual);

	console.log(cajaActual);

	// Estado UI
	const [vistaActual, setVistaActual] = useState('vender');

	// HANDLERS
	const handleAbrirCaja = async (nuevaCaja) => {
		crearCajasAction(dispatch, nuevaCaja);
	};

	// Si no hay caja abierta, forzar vista de apertura
	if (!cajaActual) {
		return <AperturaCaja usuario={login} onAbrirCaja={handleAbrirCaja} />;
	}

	const renderContent = () => {
		switch (vistaActual) {
			case 'vender':
				return <PanelVentas usuarioId={login._id} cajaActual={cajaActual} />;
			case 'historial':
				return <Facturas facturas={cajaActual.facturas} />;
			case 'caja':
				return (
					<MiCajaView facturas={cajaActual.facturas} cajaActual={cajaActual} />
				);
			default:
				return <PanelVentas />;
		}
	};

	return (
		<div className='flex flex-col h-dvh text-white font-sans overflow-hidden'>
			{/* Header */}
			<PerfilSuperior />

			{/* Main */}
			<main className='flex-1 overflow-hidden relative '>
				{renderContent()}
			</main>

			{/* Nav */}
			<nav className='h-16  backdrop-blur-md  flex justify-around items-center px-1 pb-1 shrink-0 z-30 shadow-[0_-4px_10px_rgba(0,0,0,0.5)]'>
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
				/>
				<NavButton
					active={vistaActual === 'caja'}
					onClick={() => setVistaActual('caja')}
					icon={<CashIcon2 className='text-xl' />}
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
