import { Route, Routes } from 'react-router-dom';
import { SgahInicioPage } from '../pages/SgahInicioPage';

export const SgahRoutes = () => {

	return (
		<Routes>
			<Route path="/" element={<SgahInicioPage />} />
		</Routes>
	);
};
