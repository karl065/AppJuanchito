import { useMemo, useState } from 'react';
import ResumenGeneral from './ResumenGeneral.jsx';
import VentasPorUsuario from './VentasPosUsuario.jsx';
import VentasPorCaja from './VentasPorCaja.jsx';
import AnalisisDeStock from './AnalisisDeStock.jsx';
import TimeFilter from '../../../components/TimeFilter/TimeFilter.jsx';
import { useSelector } from 'react-redux';
import { procesarReporteDatos } from '../../../helpers/procesarReporteDatos.jsx';
import {
	BoxIcon,
	CalendarIcon,
	CashIcon,
	ChartPieIcon,
	TrendingUpIcon,
	UsersIcon,
} from '../../../components/Icons/Icons.jsx';
import SubTabButton from '../../../components/SubTabButton/SubTabButton.jsx';
import VentasDiaLaborado from './VentasDiaLaborado.jsx';
import UserFilter from '../../../components/UserFilter/UserFilter.jsx';
import ResumenMovimientos from './ResumenMovimientos.jsx';

const Informes = () => {
	const facturas = useSelector((state) => state.facturas.facturas);
	const cajas = useSelector((state) => state.cajas.cajas);
	const productos = useSelector((state) => state.productos.productos);
	const movimientos = useSelector((state) => state.movimientos.movimientos);
	const usuarios = useSelector((state) => state.usuarios.usuarios);

	console.log(cajas);

	const [subTab, setSubTab] = useState(0);
	const [period, setPeriod] = useState('Turno');
	const [selectedUser, setSelectedUser] = useState('all');

	// 🚨 DETERMINAR SI EL FILTRO DE USUARIO DEBE APLICARSE
	// Solo se aplica si la pestaña activa es 'x Usuario' (1) o 'x Caja' (2).
	const filterByUser = subTab === 1 || subTab === 2 ? selectedUser : 'all';

	const datosProcesados = useMemo(
		() =>
			procesarReporteDatos(
				facturas,
				cajas,
				productos,
				movimientos,
				usuarios,
				period,
				filterByUser
			),
		[facturas, cajas, productos, movimientos, usuarios, period, filterByUser]
	);

	// 🚨 DATOS QUE SE PASAN A CADA SUBCOMPONENTE:
	const {
		resumenKPIs,
		resumenCharts,
		ventasPorUsuario,
		historialCajas,
		ventasDiaLaborado,
		analisisStock,
		resumenMovimientos,
	} = datosProcesados;

	const subTabsConfig = [
		{ index: 0, label: 'Resumen', icon: <ChartPieIcon className='w-4 h-4' /> },
		{ index: 1, label: 'x Usuario', icon: <UsersIcon className='w-4 h-4' /> },
		{ index: 2, label: 'x Caja', icon: <CashIcon className='w-4 h-4' /> },
		{
			index: 3,
			label: 'x Día Laborado',
			icon: <CalendarIcon className='w-4 h-4' />,
		}, // 🚨 NUEVA PESTAÑA
		{ index: 4, label: 'Stock', icon: <BoxIcon className='w-4 h-4' /> },
		{
			index: 5,
			label: 'Movimientos',
			icon: <TrendingUpIcon className='w-4 h-4' />,
		},
	];

	// 🚨 RENDERIZADO DE LAS VISTAS CON PROPS PROCESADAS
	const renderSubView = () => {
		switch (subTab) {
			case 0:
				// RESUMEN GENERAL: Necesita KPIs (resumenKPIs) y datos de gráficos (resumenCharts)
				return (
					<ResumenGeneral
						period={period}
						reportData={resumenKPIs}
						chartData={resumenCharts}
					/>
				);
			case 1:
				// VENTAS POR USUARIO: Necesita el historial agrupado por usuario (ventasPorUsuario)
				return (
					<VentasPorUsuario
						period={period}
						historialVentas={ventasPorUsuario}
					/>
				);
			case 2:
				// VENTAS POR CAJA: Necesita el historial de cajas (historialCajas)
				return (
					<VentasPorCaja period={period} historialCajas={historialCajas} />
				);
			case 3:
				// VENTAS POR DÍA LABORADO: Necesita el resumen de ventas consolidadas por día (ventasDiaLaborado)
				return (
					<VentasDiaLaborado
						period={period}
						ventasPorDiaLaborado={ventasDiaLaborado}
					/>
				);
			case 4:
				// ANÁLISIS DE STOCK: Necesita las métricas de inventario (analisisStock)
				return <AnalisisDeStock analisisStock={analisisStock} />;
			case 5:
				// NUEVA VISTA: RESUMEN DE MOVIMIENTOS
				return (
					<ResumenMovimientos
						period={period}
						resumenMovimientos={resumenMovimientos}
					/>
				);
			default:
				return (
					<ResumenGeneral
						period={period}
						reportData={resumenKPIs}
						chartData={resumenCharts}
					/>
				);
		}
	};

	const showUserFilter = subTab === 1 || subTab === 2;

	return (
		<div className='flex flex-col h-full bg-transparent overflow-hidden'>
			{/* BARRA DE PESTAÑAS Y FILTRO DE TIEMPO (FIJO) */}
			<div className='sticky top-0 z-10  pt-2 px-3 border-b'>
				<TimeFilter selected={period} setSelected={setPeriod} />

				{/* 🚨 Filtro de Usuario (Solo visible en pestañas relevantes) */}
				{showUserFilter && (
					<UserFilter
						users={usuarios}
						selected={selectedUser}
						setSelected={setSelectedUser}
					/>
				)}

				<div className='flex overflow-x-auto whitespace-nowrap -mb-px'>
					{subTabsConfig.map((tab) => (
						<SubTabButton
							key={tab.index}
							index={tab.index}
							label={tab.label}
							icon={tab.icon}
							subTab={subTab}
							setSubTab={setSubTab}
						/>
					))}
				</div>
			</div>

			{/* CONTENIDO DE LA PESTAÑA */}
			<div className='flex-1 min-h-0 overflow-y-auto'>{renderSubView()}</div>
		</div>
	);
};

export default Informes;
