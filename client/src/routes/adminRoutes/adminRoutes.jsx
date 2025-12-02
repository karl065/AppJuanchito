import Principal from '../../views/paneles/admin/Principal.jsx';
import PrincipalMeseros from '../../views/paneles/meseros/PrincipalMeseros.jsx';

const rawRoutes = [
	{ path: '/admin', element: <Principal /> },
	{ path: '/caja', element: <PrincipalMeseros /> },
];

export const adminRoutes = rawRoutes.map((route) => ({
	...route,
}));
