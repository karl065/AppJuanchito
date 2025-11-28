import { useState } from 'react';
const UserGroupIcon = (props) => (
	<svg {...props} fill="none" viewBox="0 0 24 24" stroke="currentColor">
		<path
			strokeLinecap="round"
			strokeLinejoin="round"
			strokeWidth={2}
			d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
		/>
	</svg>
);
const CollectionIcon = (props) => (
	<svg {...props} fill="none" viewBox="0 0 24 24" stroke="currentColor">
		<path
			strokeLinecap="round"
			strokeLinejoin="round"
			strokeWidth={2}
			d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
		/>
	</svg>
);
const ReceiptTaxIcon = (props) => (
	<svg {...props} fill="none" viewBox="0 0 24 24" stroke="currentColor">
		<path
			strokeLinecap="round"
			strokeLinejoin="round"
			strokeWidth={2}
			d="M9 14l6-6m-5.5.5h.01m4.99 5h.01M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16l3.5-2 3.5 2 3.5-2 3.5 2zM10 8.5a.5.5 0 11-1 0 .5.5 0 011 0zm5 5a.5.5 0 11-1 0 .5.5 0 011 0z"
		/>
	</svg>
);
const CashIcon = (props) => (
	<svg {...props} fill="none" viewBox="0 0 24 24" stroke="currentColor">
		<path
			strokeLinecap="round"
			strokeLinejoin="round"
			strokeWidth={2}
			d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"
		/>
	</svg>
);
const ChartPieIcon = (props) => (
	<svg {...props} fill="none" viewBox="0 0 24 24" stroke="currentColor">
		<path
			strokeLinecap="round"
			strokeLinejoin="round"
			strokeWidth={2}
			d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z"
		/>
		<path
			strokeLinecap="round"
			strokeLinejoin="round"
			strokeWidth={2}
			d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z"
		/>
	</svg>
);
const SwitchHorizontalIcon = (props) => (
	<svg {...props} fill="none" viewBox="0 0 24 24" stroke="currentColor">
		<path
			strokeLinecap="round"
			strokeLinejoin="round"
			strokeWidth={2}
			d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"
		/>
	</svg>
);
const ChevronDoubleDownIcon = (props) => (
	<svg {...props} fill="none" viewBox="0 0 24 24" stroke="currentColor">
		<path
			strokeLinecap="round"
			strokeLinejoin="round"
			strokeWidth={2}
			d="M19 13l-7 7-7-7m14-8l-7 7-7-7"
		/>
	</svg>
);
const ChevronDoubleUpIcon = (props) => (
	<svg {...props} fill="none" viewBox="0 0 24 24" stroke="currentColor">
		<path
			strokeLinecap="round"
			strokeLinejoin="round"
			strokeWidth={2}
			d="M5 11l7-7 7 7M5 19l7-7 7 7"
		/>
	</svg>
);

import Usuarios from './Usuarios.jsx';
import Inventario from './Inventario.jsx'; // Asegúrate de tener este componente o comenta si no
import Facturas from './Facturas.jsx'; // Asegúrate de tener este componente o comenta si no
import Cajas from './Cajas.jsx'; // Asegúrate de tener este componente o comenta si no
import Informes from './Informes.jsx';
import Movimientos from './Movimientos.jsx';

const Principal = () => {
	const [tab, setTab] = useState(2); // Iniciamos en 2 (Facturas)
	const [showMenu, setShowMenu] = useState(true);

	const renderView = () => {
		switch (tab) {
			case 0:
				return <Usuarios />;
			case 1:
				return <Inventario />;
			case 2:
				return <Facturas />;
			case 3:
				return <Cajas />;
			case 4:
				return <Movimientos />;
			case 5:
				return <Informes />;
			default:
				return <Usuarios />;
		}
	};

	return (
		// 1. CAMBIO CLAVE: h-screen y overflow-hidden para bloquear scroll global
		<div className="flex flex-col w-full h-full overflow-hidden bg-transparent font-sans">
			{/* CONTENEDOR DE VISTAS 
               - Usamos padding-bottom (pb) condicional.
               - overflow-hidden aquí es crucial para contener las tablas largas.
            */}
			<div
				className={`flex-1 relative w-full h-full overflow-hidden transition-all duration-300 ease-in-out ${
					showMenu ? 'pb-[72px]' : 'pb-0'
				}`}>
				{/* El renderView ocupa el 100% de este espacio y maneja su propio scroll */}
				<div className="h-full w-full">{renderView()}</div>
			</div>

			{/* BOTÓN FLOTANTE (TOGGLE) */}
			<button
				onClick={() => setShowMenu(!showMenu)}
				className={`fixed right-4 z-50 p-3 rounded-full shadow-[0_4px_10px_rgba(0,0,0,0.5)] 
                bg-linear-to-r from-red-800 to-red-600 text-white border border-red-400/30 
                transform transition-all duration-300 hover:scale-110 active:scale-95 flex items-center justify-center
                ${showMenu ? 'bottom-[85px]' : 'bottom-6'}`}
				aria-label={showMenu ? 'Ocultar menú' : 'Mostrar menú'}>
				{showMenu ? (
					<ChevronDoubleDownIcon className="h-5 w-5" />
				) : (
					<ChevronDoubleUpIcon className="h-5 w-5" />
				)}
			</button>

			{/* BARRA DE NAVEGACIÓN INFERIOR */}
			<div
				className={`fixed bottom-0 left-0 w-full z-40 transition-transform duration-300 ease-in-out
                border-t border-red-900/50 shadow-[0_-5px_15px_rgba(0,0,0,0.5)]
                bg-linear-to-tr from-[#1a0000] to-[#000000] text-white py-2 flex justify-around items-center h-[72px]
                ${showMenu ? 'translate-y-0' : 'translate-y-full'}`}>
				<NavButton
					icon={<UserGroupIcon className="h-6 w-6" />}
					index={0}
					tab={tab}
					setTab={setTab}
					label="Usuarios"
				/>
				<NavButton
					icon={<CollectionIcon className="h-6 w-6" />}
					index={1}
					tab={tab}
					setTab={setTab}
					label="Productos"
				/>
				<NavButton
					icon={<ReceiptTaxIcon className="h-6 w-6" />}
					index={2}
					tab={tab}
					setTab={setTab}
					label="Facturas"
				/>
				<NavButton
					icon={<CashIcon className="h-6 w-6" />}
					index={3}
					tab={tab}
					setTab={setTab}
					label="Cajas"
				/>
				<NavButton
					icon={<SwitchHorizontalIcon className="h-6 w-6" />}
					index={4}
					tab={tab}
					setTab={setTab}
					label="Movim."
				/>
				<NavButton
					icon={<ChartPieIcon className="h-6 w-6" />}
					index={5}
					tab={tab}
					setTab={setTab}
					label="Informes"
				/>
			</div>
		</div>
	);
};

const NavButton = ({ icon, label, index, tab, setTab }) => (
	<button
		className={`flex flex-col items-center justify-center w-full h-full transition-all duration-200 active:scale-95 ${
			tab === index
				? 'text-red-500 scale-105 drop-shadow-[0_0_8px_rgba(220,38,38,0.5)]'
				: 'text-gray-400 hover:text-gray-200'
		}`}
		onClick={() => setTab(index)}>
		{icon}
		<span
			className={`text-[10px] mt-1 transition-opacity duration-200 ${
				tab === index ? 'font-bold' : 'font-normal'
			}`}>
			{label}
		</span>
	</button>
);

export default Principal;
