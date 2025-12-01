import Principal from '../../views/paneles/admin/Principal.jsx';

const rawRoutes = [{ path: '/admin', element: <Principal /> }];

export const adminRoutes = rawRoutes.map((route) => ({
	...route,
}));
