import Layout from '../../layout/Layout.jsx';
import Informes from '../../views/paneles/admin/Informes.jsx';

const rawRoutes = [{ path: '/informes', element: <Informes /> }];

export const adminRoutes = rawRoutes.map((route) => ({
	...route,
	layout: Layout,
}));
