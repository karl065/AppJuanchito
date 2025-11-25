import Informes from '../../views/paneles/admin/Informes.jsx';

const rawRoutes = [{ path: '/admin', element: <Informes /> }];

export const adminRoutes = rawRoutes.map((route) => ({
	...route,
	layout: null,
}));
