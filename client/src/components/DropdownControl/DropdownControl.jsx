import DropdownFiltro from '../DropdownFiltro/DropdownFiltro.jsx';

const DropdownControl = ({ configs }) => {
	return (
		<div className="flex gap-2">
			{configs.map((config) => (
				<DropdownFiltro
					key={config.key}
					label={config.label}
					options={config.options}
					selected={config.selected}
					onChange={config.onChange}
				/>
			))}
		</div>
	);
};
export default DropdownControl;
