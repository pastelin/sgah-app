import { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { startCategorias, startDetallePrestamos, startGastoMesActual, startMontos, startSaldoUtilizado } from '../store/sgah/thunks';

export const usePrestamos = () => {
	// A hook to access the redux store's state.
	// This hook takes a selector function as an argument.The selector is called with the store state.
	const {
		filtro,
		cabecerasTable,
		uriPrestamosActivos,
		uriSaldoUtilizado,
		properties,
		prestamos,
		saldoUtilizado,
	} = useSelector((state) => state.sgahPrestamo);
    
    const dispatch = useDispatch();
    
    useMemo(
        () => {
            dispatch(startSaldoUtilizado(uriSaldoUtilizado));
            dispatch(startDetallePrestamos(uriPrestamosActivos));
        },[]
	);
    ;
	

	useEffect(() => {
		// Referencia de elemento para agregar gasto
		const btnAgregarPrestamo = document.querySelector('#btnAgregarPrestamo');
		const formularioPrestamoElement = document.querySelector('#formularioPrestamo');

		btnAgregarPrestamo.addEventListener('click', () => {
			formularioPrestamoElement.classList.remove('display__none');
		});
	}, []);

	return {
		filtro,
		cabecerasTable,
		properties,
		prestamos,
		saldoUtilizado,
	};
};
