import { useDispatch, useSelector } from 'react-redux';
import { useForm } from '../useForm';
import { useMemo } from 'react';
import { startUpdatePrestamo } from '../../store/sgah/thunks';
import { onCloseFormUpdatePrestamo } from '../../store';

export const usePrestamoFormUpdate = () => {
	const newPrestamo = ({ folio, montoPrestado, descripcion, fechaCreacion, newMontoPagado }) => {
		return { folio, montoPrestado, descripcion, fechaCreacion, montoPagado: newMontoPagado };
	};

	const dispatch = useDispatch();

	const { montos } = useSelector((state) => state.sgahGasto);

	const { prestamo, uriPrestamosActivos, uriSaldoUtilizado, uriActualizaPrestamo } = useSelector(
		(state) => state.sgahPrestamo
	);

	const { isFormUpdatePrestamoOpen } = useSelector((state) => state.ui);

	const {
		folio,
		newMontoPagado,
		montoPrestado,
		fechaCreacion,
		montoPagado,
		descripcion,
		onInputChange,
		onResetForm,
	} = useForm(prestamo);

	const hideFormUpdatePrestamoClass = useMemo(() => {
		return isFormUpdatePrestamoOpen ? '' : 'display__none';
	}, [isFormUpdatePrestamoOpen]);

	const handleCloseUpdateFormPrestamo = () => {
		dispatch(onCloseFormUpdatePrestamo());
	};

	const onSubmit = (event) => {
		event.preventDefault();

		dispatch(
			startUpdatePrestamo(
				newPrestamo({ folio, montoPrestado, descripcion, fechaCreacion, newMontoPagado }),
				uriPrestamosActivos,
				uriSaldoUtilizado,
				uriActualizaPrestamo
			)
		);

		handleCloseUpdateFormPrestamo();

		onResetForm();
	};

	return {
		onSubmit,
		montos,
		newMontoPagado,
		montoPrestado,
		montoPagado,
		descripcion,
		hideFormUpdatePrestamoClass,
		onInputChange,
		handleCloseUpdateFormPrestamo,
	};
};
