import { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { onOpenFormGasto, onUpdateOptionSelectedFilterGasto } from '../store';

export const useGastos = () => {

	const dispatch = useDispatch();

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
    }

    return {
		//* Propiedades
		//* Metodos
		handleOpenForm,
		hideCategoriaClass,
		hideTipoMovimientoClass,
		hideFechaClass,
		handleChangeFilter,
	};
};
