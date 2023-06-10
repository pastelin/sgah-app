import { Route, Routes } from 'react-router-dom';
import { SgahInicioPage } from '../pages/SgahInicioPage';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { startCategorias, startDetalle, startGastoMesActual, startMontos } from '../../store/sgah/thunks';

export const SgahRoutes = () => {
	const dispatch = useDispatch();

	const { uriCategoria, uriGastoMesActual, uriMontos } = useSelector((state) => state.sgahGasto);
	
    useEffect(() => {
		console.time();
		dispatch(startDetalle());
		dispatch(startCategorias(uriCategoria));
		dispatch(startGastoMesActual(uriGastoMesActual));
		dispatch(startMontos(uriMontos));
		console.timeEnd();
	}, []);

	return (
		<Routes>
			<Route path="/" element={<SgahInicioPage />} />
		</Routes>
	);
};
