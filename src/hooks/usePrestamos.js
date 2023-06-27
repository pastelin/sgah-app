import { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { startDetallePrestamos, startSaldoUtilizado } from '../store/sgah/thunks';
import { onOpenFormNewPrestamo } from '../store';

export const usePrestamos = () => {
	// A hook to access the redux store's state.
	// This hook takes a selector function as an argument.The selector is called with the store state.
	const {
		filtro,
		prestamos,
		saldoUtilizado,
	} = useSelector((state) => state.sgahPrestamo);

	const dispatch = useDispatch();

	const handleOpenFormNewPrestamo = () => {
		dispatch(onOpenFormNewPrestamo());
	};

	useMemo(() => {
		dispatch(startSaldoUtilizado());
		dispatch(startDetallePrestamos());
	}, []);

	return {
		filtro,
		prestamos,
		saldoUtilizado,

		//* Metodos
		handleOpenFormNewPrestamo,
	};
};
