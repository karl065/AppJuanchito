import { useState } from 'react';
import {
	HiUserGroup,
	HiCollection,
	HiReceiptTax,
	HiCash,
	HiChartPie,
	HiChevronDoubleDown,
	HiChevronDoubleUp,
} from 'react-icons/hi';

import Usuarios from './Usuarios.jsx';
import Inventario from './Inventario.jsx'; // Asegúrate de tener este componente o comenta si no
import Facturas from './Facturas.jsx'; // Asegúrate de tener este componente o comenta si no
import Cajas from './Cajas.jsx'; // Asegúrate de tener este componente o comenta si no
import Informes from './Informes.jsx';

const Principal = () => {
	const [tab, setTab] = useState(1); // Iniciamos en 1 (Inventario/Productos) para ver tu componente nuevo
	const [showMenu, setShowMenu] = useState(true);

	const renderView = () => {
		switch (tab) {
			case 0:
				return <Usuarios />;
			case 1:
				return <Inventario />; // Usamos Productos aquí en lugar de Inventario por ahora
			case 2:
				return <Facturas />;
			case 3:
				return <Cajas />;
			case 4:
				return <Informes />;
			default:
				return <Productos />;
		}
	};

	return (
		<div className="flex flex-col h-screen w-full">
			{/* CONTENEDOR DE VISTAS 
               - flex-1: Ocupa todo el espacio disponible.
               - mb-[...]: Aquí está la magia. Si el menú está visible, le damos un margen inferior
                 de 70px (altura aprox del menú) para que el contenido NUNCA quede detrás.
                 Si está oculto, el margen es 0 y ocupa toda la pantalla.
            */}
			<div
				className={`flex-1 relative transition-all duration-300 ease-in-out ${
					showMenu ? 'mb-[72px]' : 'mb-0'
				}`}>
				{/* Renderizamos la vista dentro de un contenedor h-full. 
                   Como ajustamos el margen del padre, los componentes con 'h-full' (como Productos.jsx)
                   se redimensionarán perfectamente para encajar en el área visible.
                */}
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
					<HiChevronDoubleDown size={20} />
				) : (
					<HiChevronDoubleUp size={20} />
				)}
			</button>

			{/* BARRA DE NAVEGACIÓN INFERIOR */}
			<div
				className={`fixed bottom-0 left-0 w-full z-40 transition-transform duration-300 ease-in-out
                border-t border-red-900/50 shadow-[0_-5px_15px_rgba(0,0,0,0.5)]
                bg-[linear-gradient(60deg,#1a0000_0%,#000000_100%)] text-white py-2 flex justify-around items-center h-[72px]
                ${showMenu ? 'translate-y-0' : 'translate-y-full'}`}>
				<NavButton
					icon={<HiUserGroup size={24} />}
					index={0}
					tab={tab}
					setTab={setTab}
					label="Usuarios"
				/>
				<NavButton
					icon={<HiCollection size={24} />}
					index={1}
					tab={tab}
					setTab={setTab}
					label="Productos"
				/>
				<NavButton
					icon={<HiReceiptTax size={24} />}
					index={2}
					tab={tab}
					setTab={setTab}
					label="Facturas"
				/>
				<NavButton
					icon={<HiCash size={24} />}
					index={3}
					tab={tab}
					setTab={setTab}
					label="Cajas"
				/>
				<NavButton
					icon={<HiChartPie size={24} />}
					index={4}
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
