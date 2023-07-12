import { useSelector } from 'react-redux';
import { NavBar } from '../components';
import { SgahGastosPage, SgahResumenPage, SgahPrestamosPage, SgahIngresosPage } from './';

export const SgahInicioPage = () => {
	// A hook to access the redux store's state.
    const { menuSelected } = useSelector((state) => state.ui);
    
    const showComponent = (menuSelected) => {
		switch (menuSelected) {
			case 'Resumen':
				return <SgahResumenPage />;
			case 'Gastos':
                return <SgahGastosPage />;
            case 'Prestamos': 
                return <SgahPrestamosPage />
            case 'Ingresos':
                return <SgahIngresosPage />
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
