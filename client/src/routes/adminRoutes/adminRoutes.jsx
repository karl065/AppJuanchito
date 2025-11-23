import Informes from '../../views/paneles/admin/informes';

const rawRoutes = [{ path: '/admin', element: <Informes /> }];

export const adminRoutes = rawRoutes.map((route) => ({
	...route,
	layout: null,
}));
