import { useState } from 'react';
import { useSelector } from 'react-redux';
import {
	CashIcon2,
	HistoryIcon,
	HomeIcon,
	LogoutIcon,
	UsersIcon,
} from '../../../components/Icons/Icons.jsx';
import PanelVentas from './PanelVentas.jsx';
import HistorialView from './HistoriasVista.jsx';
import MiCajaView from './Caja.jsx';
import PerfilSuperior from '../../../components/PerfilSuperior/PerfilSuperior.jsx';

const PrincipalMeseros = () => {
	// Estado de navegación
	const [vistaActual, setVistaActual] = useState('vender');
	const facturas = useSelector((state) => state.facturas.facturas);
	const login = useSelector((state) => state.login.login);

	const facturasUsuario = facturas.filter(
		(factura) => factura.usuario._id === login._id
	);

	// Estado Global (Simulado) de Ventas
	const [historialVentas, setHistorialVentas] = useState(facturasUsuario);

	const handleRealizarVenta = (datosVenta) => {
		const nuevaVenta = {
			_id: `v${Date.now()}`,
			mesa: datosVenta.mesa,
			total: datosVenta.total,
			metodos: datosVenta.metodos, // Objeto {efectivo, nequi, daviplata}
			items: datosVenta.carrito.reduce((acc, i) => acc + i.cantidad, 0),
			hora: new Date().toLocaleTimeString('es-CO', {
				hour: '2-digit',
				minute: '2-digit',
			}),
			imprimirFactura: datosVenta.imprimirFactura,
		};

		// Agregamos al historial (al principio)
		setHistorialVentas((prev) => [nuevaVenta, ...prev]);

		console.log('✅ VENTA REALIZADA:', nuevaVenta);
		if (datosVenta.imprimirFactura) console.log('🖨️ IMPRIMIENDO FACTURA...');
	};

	const totalVentasSesion = historialVentas?.reduce(
		(acc, v) => acc + v.total,
		0
	);

	const renderContent = () => {
		switch (vistaActual) {
			case 'vender':
				return <PanelVentas onRealizarVenta={handleRealizarVenta} />;
			case 'historial':
				return <HistorialView ventas={historialVentas} />;
			case 'caja':
				return <MiCajaView totalVentas={totalVentasSesion} />;
			default:
				return <VenderView />;
		}
	};

	return (
		<div className="flex flex-col h-dvh  text-white font-sans overflow-hidden">
			{/* --- HEADER --- */}
			<PerfilSuperior />

			{/* --- CONTENIDO --- */}
			<main className="flex-1 overflow-hidden relative ">
				{renderContent()}
			</main>

			{/* --- NAV INFERIOR --- */}
			<nav className="h-16  backdrop-blur-md border-t border-gray-800 flex justify-around items-center px-1 pb-1 shrink-0 z-30 shadow-[0_-4px_10px_rgba(0,0,0,0.5)]">
				<NavButton
					active={vistaActual === 'vender'}
					onClick={() => setVistaActual('vender')}
					icon={<HomeIcon className="text-xl" />}
					label="Carta"
				/>

				<NavButton
					active={vistaActual === 'historial'}
					onClick={() => setVistaActual('historial')}
					icon={<HistoryIcon className="text-xl" />}
					label="Ventas"
					badge={historialVentas.length}
				/>

				<NavButton
					active={vistaActual === 'caja'}
					onClick={() => setVistaActual('caja')}
					icon={<CashIcon2 className="text-xl" />}
					label="Mi Caja"
				/>
			</nav>
		</div>
	);
};

// Componente auxiliar de navegación
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
				<span className="absolute -top-1 -right-1 min-w-4 h-4 flex items-center justify-center bg-gray-700 text-white text-[9px] font-bold rounded-full border-2 border-black px-0.5">
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
