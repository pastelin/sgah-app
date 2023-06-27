import { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { startCategorias, startGastoMesActual, startMontos } from '../store/sgah/thunks';
import { onOpenFormGasto, onUpdateOptionSelectedFilterGasto } from '../store';

export const useGastos = () => {
	// A hook to access the redux store's state.
	// This hook takes a selector function as an argument.The selector is called with the store state.
	const {
		filtro,
		categoriaGastos,
		gastos,
		tipoMovimiento,
		montos,
		cabecerasTable,
		properties,
	} = useSelector((state) => state.sgahGasto);

	const dispatch = useDispatch();

	useMemo(() => {
		dispatch(startGastoMesActual());
		dispatch(startCategorias());
		dispatch(startMontos());
	}, []);

    const { optionSelectedFilterGasto } = useSelector((state) => state.ui);

	const hideCategoriaClass = useMemo(() => {
		return optionSelectedFilterGasto === 'Categoria' ? '' : 'display--none';
	}, [optionSelectedFilterGasto]);

	const hideTipoMovimientoClass = useMemo(() => {
		return optionSelectedFilterGasto === 'Tipo Movimiento' ? '' : 'display--none';
	}, [optionSelectedFilterGasto]);

	const hideFechaClass = useMemo(() => {
		return optionSelectedFilterGasto === 'Fecha' ? '' : 'display--none';
	}, [optionSelectedFilterGasto]);

	const handleChangeFilter = ({ target }) => {
		dispatch(onUpdateOptionSelectedFilterGasto(target.value));
	};

    
    const handleOpenForm = () => {
        dispatch(onOpenFormGasto());
        console.log('open');
    }

    return {
		//* Propiedades
		filtro,
		categoriaGastos,
		tipoMovimiento,
		montos,
		cabecerasTable,
		properties,
		gastos,

		//* Metodos
		handleOpenForm,
		hideCategoriaClass,
		hideTipoMovimientoClass,
		hideFechaClass,
		handleChangeFilter,
	};
};
