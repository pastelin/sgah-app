import { useSelector } from 'react-redux';
import { SgahResumenPage } from './SgahResumenPage';
import { NavBar } from '../components';
import { SgahGastosPage } from './SgahGastosPage';

export const SgahInicioPage = () => {
	// A hook to access the redux store's state.
    const { menuSelected } = useSelector((state) => state.sgah);
    
    const showComponent = (menuSelected) => {
		switch (menuSelected) {
			case 'Resumen':
				return <SgahResumenPage />;
			case 'Gastos':
				return <SgahGastosPage />;
			default:
				return <SgahResumenPage />;
		}
	};

	return (
		<>
			<NavBar />

			{showComponent(menuSelected)}
		</>
	);
};
