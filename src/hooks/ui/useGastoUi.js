import { useDispatch, useSelector } from 'react-redux';
import { useMemo } from 'react';
import {
	onToggleHasPermissionEditG,
	onToggleShowFormGasto,
	onUpdateSelectedFilterGasto,
} from '../../store/ui/gastoUiSlice';

export const useGastoUi = () => {
	const { isShowFormGasto, hasPermissionEdit, selectedFilterGasto } = useSelector(
		(state) => state.gastoUi
	);

	const dispatch = useDispatch();

	const classNameDisplay = useMemo(() => {
		return isShowFormGasto ? '' : 'display__none';
	}, [isShowFormGasto]);

	const classNameCategoriaDisplay = useMemo(() => {
		return selectedFilterGasto === 'Categoria' ? '' : 'display--none';
	}, [selectedFilterGasto]);

	const classNameTipoDisplay = useMemo(() => {
		return selectedFilterGasto === 'Tipo Movimiento' ? '' : 'display--none';
	}, [selectedFilterGasto]);

	const classNameFechaDisplay = useMemo(() => {
		return selectedFilterGasto === 'Fecha' ? '' : 'display--none';
	}, [selectedFilterGasto]);

	const handleUpdatingSelectedFilterGasto = ({ target }) => {
		dispatch(onUpdateSelectedFilterGasto(target.value));
	};

	const handleOpenFormGasto = () => {
		dispatch(onToggleShowFormGasto(true));
	};

	const handleCloseFormGasto = () => {
		dispatch(onToggleShowFormGasto(false));
	};

    const handleHasPermissionEdit = (flag) => {
        dispatch(onToggleHasPermissionEditG(flag));
    };

	return {
		// * Propiedades
		isShowFormGasto,
		hasPermissionEdit,
		// * Metodos
		classNameDisplay,
		handleOpenFormGasto,
		handleCloseFormGasto,
		classNameCategoriaDisplay,
		classNameTipoDisplay,
		classNameFechaDisplay,
		handleUpdatingSelectedFilterGasto,
		handleHasPermissionEdit,
	};
};
