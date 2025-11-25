/* eslint-disable react-hooks/exhaustive-deps */
import { Link, useLocation, useNavigate } from 'react-router-dom';
// import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useCallback } from 'react';

const Sidebar = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const location = useLocation();
	const login = useSelector((state) => state.login.login);

	const handleLogout = useCallback(
		(e) => {
			e.preventDefault();
			// logout(dispatch, navigate, login._id, login.connectedDB);
		},
		[dispatch, navigate, login._id]
	);

	// useEffect(() => {
	// 	if (
	// 		login.role === 'Propietario' ||
	// 		login.role === 'Propietario-Empoderado' ||
	// 		login.role === 'Empoderado'
	// 	)
	// 		navigate('/usuario');
	// }, []);

	return (
		<div>
			<nav className="p-2 bg-black rounded-lg opacity-70">
				<div className="bg-white rounded-lg shadow dark:border dark:bg-gray-800 dark:border-gray-700">
					<div className="flex justify-center p-2 border-2 border-black rounded-lg">
						<div className="p-2">
							<div className="font-bold text-white">
								<span>{login.primerNombre}</span>
							</div>
							<hr className="my-2 border-2" />

							<ul className="m2">
								<li
									className={`flex w-full ${
										location.pathname === '/admin'
											? 'opacity-60 cursor-not-allowed'
											: ''
									} `}>
									{location.pathname === '/admin' ? (
										<span className="grow text-white ">Conjuntos</span>
									) : (
										<Link to="/admin" className="grow text-white">
											<span>Conjuntos</span>
										</Link>
									)}
								</li>

								<hr className="my-2" />
								<li
									className={`flex w-full ${
										location.pathname === '/CrearConjunto'
											? 'opacity-60 cursor-not-allowed'
											: ''
									}`}>
									{location.pathname === '/CrearConjunto' ? (
										<span className="grow text-white ">Crear Conjunto</span>
									) : (
										<Link to="/CrearConjunto" className="grow text-white">
											<span>Crear Conjunto</span>
										</Link>
									)}
								</li>
								<hr className="my-2" />
								<li
									className={`flex w-full ${
										location.pathname === '/GestionarConjunto'
											? 'opacity-60 cursor-not-allowed'
											: ''
									}`}>
									{location.pathname === '/GestionarConjunto' ? (
										<span className="grow text-white ">Gestionar Conjunto</span>
									) : (
										<Link to="/GestionarConjunto" className="grow text-white">
											<span>Gestionar Conjunto</span>
										</Link>
									)}
								</li>
								<hr className="my-2" />
								<li
									className={`flex w-full ${
										location.pathname === '/CrearUsuario'
											? 'opacity-60 cursor-not-allowed'
											: ''
									}`}>
									{location.pathname === '/CrearUsuario' ? (
										<span className="grow text-white ">Crear Usuario</span>
									) : (
										<Link to="/CrearUsuario" className="grow text-white">
											<span>Crear Usuario</span>
										</Link>
									)}
								</li>
								<hr className="my-2" />
								<li
									className={`flex w-full ${
										location.pathname === '/actualizarUsuario'
											? 'opacity-60 cursor-not-allowed'
											: ''
									}`}>
									{location.pathname === '/actualizarUsuario' ? (
										<span className="grow text-white ">Actualizar Usuario</span>
									) : (
										<Link to="/actualizarUsuario" className="grow text-white">
											<span>Actualizar Usuario</span>
										</Link>
									)}
								</li>
								<hr className="my-2" />
								<li
									className={`flex w-full ${
										location.pathname === '/CrearPredio'
											? 'opacity-60 cursor-not-allowed'
											: ''
									}`}>
									{location.pathname === '/CrearPredio' ? (
										<span className="grow text-white ">Crear Predio</span>
									) : (
										<Link to="/CrearPredio" className="grow text-white">
											<span>Crear Predio</span>
										</Link>
									)}
								</li>
								<hr className="my-2" />
								<li
									className={`flex w-full ${
										location.pathname === '/crearTema'
											? 'opacity-60 cursor-not-allowed'
											: ''
									}`}>
									{location.pathname === '/crearTema' ? (
										<span className="grow text-white ">Crear Tema</span>
									) : (
										<Link to="/crearTema" className="grow text-white">
											<span>Crear Tema</span>
										</Link>
									)}
								</li>
								<hr className="my-2" />
								<li
									className={`flex w-full ${
										location.pathname === '/CrearPreguntas'
											? 'opacity-60 cursor-not-allowed'
											: ''
									}`}>
									{location.pathname === '/CrearPreguntas' ? (
										<span className="grow text-white ">Crear Preguntas</span>
									) : (
										<Link to="/CrearPreguntas" className="grow text-white">
											<span>Crear Preguntas</span>
										</Link>
									)}
								</li>
								<hr className="my-2" />
								<li
									className={`flex w-full ${
										location.pathname === '/GestionarPreguntas'
											? 'opacity-60 cursor-not-allowed'
											: ''
									}`}>
									{location.pathname === '/GestionarPreguntas' ? (
										<span className="grow text-white ">
											Gestionar Preguntas
										</span>
									) : (
										<Link to="/GestionarPreguntas" className="grow text-white">
											<span>Gestionar Preguntas</span>
										</Link>
									)}
								</li>
								<hr className="my-2" />
								<li
									className={`flex w-full ${
										location.pathname === '/ActualizarPreguntas'
											? 'opacity-60 cursor-not-allowed'
											: ''
									}`}>
									{location.pathname === '/ActualizarPreguntas' ? (
										<span className="grow text-white ">
											Actualizar Preguntas
										</span>
									) : (
										<Link to="/ActualizarPreguntas" className="grow text-white">
											<span>Actualizar Preguntas</span>
										</Link>
									)}
								</li>
								<hr className="my-2" />
								<li
									className={`flex w-full ${
										location.pathname === '/ControlAsambleas'
											? 'opacity-60 cursor-not-allowed'
											: ''
									}`}>
									{location.pathname === '/ControlAsambleas' ? (
										<span className="grow text-white ">
											Monitoreo Asambleas
										</span>
									) : (
										<Link to="/ControlAsambleas" className="grow text-white">
											<span>Monitoreo Asambleas</span>
										</Link>
									)}
								</li>
								<hr className="my-2" />
								<li className="flex w-full">
									<button
										type="submit"
										onClick={(e) => handleLogout(e)}
										className="w-full py-2 text-white bg-red-600 rounded-lg hover:bg-red-700">
										<Link to="/">
											<span>Salir</span>
										</Link>
									</button>
								</li>
							</ul>
						</div>
					</div>
				</div>
			</nav>
		</div>
	);
};

export default Sidebar;
