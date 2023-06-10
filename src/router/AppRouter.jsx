import { Route, Routes } from 'react-router-dom';
import { SgahRoutes } from '../sgah/routes/SgahRoutes';

export const 
AppRouter = () => {

	return (
		<Routes>
			<Route path="/" element={<SgahRoutes />} />
		</Routes>
	);
};
