import PrincipalMeseros from '../../views/paneles/meseros/PrincipalMeseros';

const rawRoutes = [{ path: '/caja', element: <PrincipalMeseros /> }];

export const meserosRoutes = rawRoutes.map((route) => ({
	...route,
}));
