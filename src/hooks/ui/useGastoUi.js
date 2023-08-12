import { useDispatch, useSelector } from 'react-redux';
import { useMemo } from 'react';
import {
	onToggleAbleEditGasto,
	onToggleShowFormGasto,
	onUpdateSelectedFilterGasto,
} from '../../store/ui/gastoUiSlice';

export const useGastoUi = () => {
	const { isShowFormGasto, isAbleEditGasto, selectedFilterGasto } = useSelector(
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

	const handleAbleEditGasto = () => {
		dispatch(onToggleAbleEditGasto(true));
	};

	const handleDisableEditGasto = () => {
		dispatch(onToggleAbleEditGasto(false));
	};

	return {
		// * Propiedades
		isShowFormGasto,
		isAbleEditGasto,
		// * Metodos
		classNameDisplay,
		handleOpenFormGasto,
		handleCloseFormGasto,
		handleAbleEditGasto,
		handleDisableEditGasto,
		classNameCategoriaDisplay,
		classNameTipoDisplay,
		classNameFechaDisplay,
		handleUpdatingSelectedFilterGasto,
	};
};
