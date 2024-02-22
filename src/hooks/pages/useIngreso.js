import { useEffect, useMemo, useState } from 'react';
import { useSgahAhorroStore, useSgahGastoStore, useSgahIngresoStore } from '../store';
import { useAhorroUi, useGastoUi } from '../ui';
import { useForm } from '../useForm';

const formDataAhorro = {
	monto: '',
	descripcion: '',
};

export const useIngreso = () => {
	const [isHoverFlipCard, setIsHoverFlipCard] = useState(false);

	const {
		ingresos,
		saldoUtilizado,
		availablePercentage,
		hasPermissionEdit,
		startUpdatingIngresos,
		startUpdatingSaldoUtilizado,
		handleHasPermissionEdit,
		startUpdatingAvailablePercentage,
		handleResetInitialState,
	} = useSgahIngresoStore();

	const { isAbleEditAhorro, handleDisableEditAhorro, handleAbleEditAhorro } = useAhorroUi();

	const { startSavingAhorro } = useSgahAhorroStore();

	const onToggleFlipCard = () => {
		setIsHoverFlipCard(!isHoverFlipCard);
    };
    
    useEffect(() => {
        if (availablePercentage === 0) {
            handleResetInitialState();
        }
    }, [availablePercentage]);
    

	const styleFlipCardHover = useMemo(() => {
		console.log(isHoverFlipCard);
		return isHoverFlipCard ? 'flip-card-hover' : '';
	}, [isHoverFlipCard]);

	const {
		monto: montoAhorro,
		descripcion: descripcionAhorro,
		onInputChange: onInputChangeAhorro,
	} = useForm(formDataAhorro);

	const onInputChangeIngresos = ({ target: { value } }) => {
		let parseValue = !value ? '' : parseInt(value);
		startUpdatingIngresos(parseValue);
	};

	const onSubmitAhorro = (event) => {
		event.preventDefault();

		const updateSaldoUsado = parseFloat(saldoUtilizado) + parseFloat(montoAhorro);
		if (updateSaldoUsado > parseFloat(ingresos)) return;

		startSavingAhorro({ monto: montoAhorro, descripcion: descripcionAhorro });
		startUpdatingSaldoUtilizado(updateSaldoUsado);
		handleDisableEditAhorro();
	};

	return {
		ingresos,
		isAbleEditAhorro,
		hasPermissionEdit,
		saldoUtilizado,
		onInputChangeAhorro,
		montoAhorro,
		descripcionAhorro,
		availablePercentage,
		onSubmitAhorro,
		onInputChangeIngresos,
		onToggleFlipCard,
		styleFlipCardHover,
		handleHasPermissionEdit,
		startUpdatingSaldoUtilizado,
		startUpdatingAvailablePercentage,
	};
};
