import { useState } from 'react';
import {
	HiUserGroup,
	HiCollection,
	HiReceiptTax,
	HiCash,
	HiChartPie,
} from 'react-icons/hi';

import Usuarios from './Usuarios.jsx';
import Inventario from './Inventario.jsx';
import Facturas from './Facturas.jsx';
import Cajas from './Cajas.jsx';
import Informes from './Informes.jsx';

const Principal = () => {
	const [tab, setTab] = useState(0);

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
				return <Informes />;
			default:
				return <Usuarios />;
		}
	};

	return (
		<div className="flex flex-col h-screen overflow-hidden">
			{/* CONTENIDO DE LA VISTA */}
			<div className="flex-1 overflow-y-auto p-2">{renderView()}</div>

			{/* BOTTOM NAVIGATION */}
			<div className="w-full border-t bg-[linear-gradient(60deg,#2b0000_0%,#0a0000_50%,#000000_100%)] text-white py-2 fixed bottom-0 left-0 flex justify-around">
				<NavButton
					icon={<HiUserGroup size={26} />}
					index={0}
					tab={tab}
					setTab={setTab}
					label="Usuarios"
				/>
				<NavButton
					icon={<HiCollection size={26} />}
					index={1}
					tab={tab}
					setTab={setTab}
					label="Inventario"
				/>
				<NavButton
					icon={<HiReceiptTax size={26} />}
					index={2}
					tab={tab}
					setTab={setTab}
					label="Facturas"
				/>
				<NavButton
					icon={<HiCash size={26} />}
					index={3}
					tab={tab}
					setTab={setTab}
					label="Cajas"
				/>
				<NavButton
					icon={<HiChartPie size={26} />}
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
		className={`flex flex-col items-center transition-all ${
			tab === index ? 'text-red-500 scale-110' : 'text-gray-400'
		}`}
		onClick={() => setTab(index)}>
		{icon}
		{/* texto solo en pantallas medianas o tablets */}
		<span className="text-[10px] hidden md:block">{label}</span>
	</button>
);

export default Principal;
