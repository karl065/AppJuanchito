import { useSelector } from 'react-redux';

const Facturas = () => {
	const facturas = useSelector((state) => state.facturas.facturas);

	console.log(facturas);

	return (
		<div>
			<h1>Facturas</h1>
		</div>
	);
};

export default Facturas;
