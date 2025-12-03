import { useState } from 'react';
import Usuarios from './Usuarios.jsx';
import Inventario from './Inventario.jsx'; // Asegúrate de tener este componente o comenta si no
import Facturas from './Facturas.jsx'; // Asegúrate de tener este componente o comenta si no
import Cajas from './Cajas.jsx'; // Asegúrate de tener este componente o comenta si no
import Informes from './Informes.jsx';
import Movimientos from './Movimientos.jsx';
import {
	CashIcon,
	ChartPieIcon,
	ChevronDoubleDownIcon,
	ChevronDoubleUpIcon,
	CogIcon,
	CollectionIcon,
	ReceiptTaxIcon,
	SwitchHorizontalIcon,
	UserGroupIcon,
} from '../../../components/Icons/Icons.jsx';
import ConfiguracionImpresora from '../../formularios/generales/ConfiguracionImpresora.jsx';
import { useSelector } from 'react-redux';

const Principal = () => {
	const [showMenu, setShowMenu] = useState(true);
	const facturas = useSelector((state) => state.facturas.facturas);
	const login = useSelector((state) => state.login.login);
	const [tab, setTab] = useState(login.role === 'Administrador' ? 0 : 1);
	const renderView = () => {
		switch (tab) {
			case 0:
				return login.role === 'Administrador' && <Usuarios />;
			case 1:
				return <Inventario />;
			case 2:
				return <Facturas facturas={facturas} />;
			case 3:
				return <Cajas />;
			case 4:
				return <Movimientos />;
			case 5:
				return login.role === 'Administrador' && <Informes />;
			case 6:
				return <ConfiguracionImpresora />;
			default:
				return login.role === 'Administrador' ? <Usuarios /> : <Inventario />;
		}
	};

	return (
		// 1. CAMBIO CLAVE: h-screen y overflow-hidden para bloquear scroll global
		<div className='flex flex-col w-full h-full overflow-hidden bg-transparent font-sans'>
			{/* CONTENEDOR DE VISTAS 
               - Usamos padding-bottom (pb) condicional.
               - overflow-hidden aquí es crucial para contener las tablas largas.
            */}
			<div
				className={`flex-1 relative w-full h-full overflow-hidden transition-all duration-300 ease-in-out ${
					showMenu ? 'pb-[72px]' : 'pb-0'
				}`}>
				{/* El renderView ocupa el 100% de este espacio y maneja su propio scroll */}
				<div className='h-full w-full'>{renderView()}</div>
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
					<ChevronDoubleDownIcon className='h-5 w-5' />
				) : (
					<ChevronDoubleUpIcon className='h-5 w-5' />
				)}
			</button>

			{/* BARRA DE NAVEGACIÓN INFERIOR */}
			<div
				className={`fixed bottom-0 left-0 w-full z-40 transition-transform duration-300 ease-in-out
                border-t border-red-900/50 shadow-[0_-5px_15px_rgba(0,0,0,0.5)]
                bg-linear-to-tr from-[#1a0000] to-[#000000] text-white py-2 flex justify-around items-center h-[72px]
                ${showMenu ? 'translate-y-0' : 'translate-y-full'}`}>
				{login.role === 'Administrador' && (
					<NavButton
						icon={<UserGroupIcon className='h-6 w-6' />}
						index={0}
						tab={tab}
						setTab={setTab}
						label='Usuarios'
					/>
				)}
				<NavButton
					icon={<CollectionIcon className='h-6 w-6' />}
					index={1}
					tab={tab}
					setTab={setTab}
					label='Productos'
				/>
				<NavButton
					icon={<ReceiptTaxIcon className='h-6 w-6' />}
					index={2}
					tab={tab}
					setTab={setTab}
					label='Facturas'
				/>
				<NavButton
					icon={<CashIcon className='h-6 w-6' />}
					index={3}
					tab={tab}
					setTab={setTab}
					label='Cajas'
				/>
				<NavButton
					icon={<SwitchHorizontalIcon className='h-6 w-6' />}
					index={4}
					tab={tab}
					setTab={setTab}
					label='Movim.'
				/>
				{login.role === 'Administrador' && (
					<NavButton
						icon={<ChartPieIcon className='h-6 w-6' />}
						index={5}
						tab={tab}
						setTab={setTab}
						label='Informes'
					/>
				)}
				<NavButton
					icon={<CogIcon className='h-6 w-6' />}
					index={6}
					tab={tab}
					setTab={setTab}
					label='Impr.'
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
