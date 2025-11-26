import Layout from '../../layout/Layout.jsx';
import Cajas from '../../views/paneles/admin/Cajas.jsx';
import Facturas from '../../views/paneles/admin/Facturas.jsx';
import Informes from '../../views/paneles/admin/Informes.jsx';
import Inventario from '../../views/paneles/admin/Inventario.jsx';
import Principal from '../../views/paneles/admin/Principal.jsx';
import Usuarios from '../../views/paneles/admin/Usuarios.jsx';

const rawRoutes = [
	{ path: '/admin', element: <Principal /> },
	{ path: '/informes', element: <Informes /> },
	{ path: '/usuarios', element: <Usuarios /> },
	{ path: '/inventario', element: <Inventario /> },
	{ path: '/facturas', element: <Facturas /> },
	{ path: '/cajas', element: <Cajas /> },
];

export const adminRoutes = rawRoutes.map((route) => ({
	...route,
	layout: Layout,
}));
