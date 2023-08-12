import { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from '../../hooks/useForm';
import { onCloseFormNewPrestamo } from '../../store';
import { formatCurrency, useSgahAhorroStore, useSgahPrestamoStore } from '../../hooks';
import Swal from 'sweetalert2';
import { useMessages } from '../../hooks/useMessages';

const formData = {
	montoPrestado: '',
	descripcion: '',
};

export const FormNewPrestamos = () => {
	// A hook to access the redux dispatch function.
	const dispatch = useDispatch();

	// A hook to access the redux store's state. This hook takes a selector function as an argument.
	// The selector is called with the store state.
	const { startSavingPrestamo } = useSgahPrestamoStore();

	const { startLoadingSaldoDisponibleA, saldoDisponibleA } = useSgahAhorroStore();

	useEffect(() => {
		startLoadingSaldoDisponibleA();
	}, []);

	const { isFormNewPrestamoOpen } = useSelector((state) => state.ui);

	const { montoPrestado, descripcion, onInputChange, onResetForm } = useForm(formData);

	const hideFormNewPrestamoClass = useMemo(() => {
		return isFormNewPrestamoOpen ? '' : 'display__none';
	}, [isFormNewPrestamoOpen]);

	const handleCloseForm = () => {
		dispatch(onCloseFormNewPrestamo());
	};

	const onSubmit = async (event) => {
		event.preventDefault();

		if (montoPrestado > saldoDisponibleA) {
			Swal.fire('Validar monto ingresado', '', 'error');
			return;
		}

		const { code, message } = await startSavingPrestamo({ montoPrestado, descripcion });

		useMessages(code, message);

		if (code === 200) {
			handleCloseForm();
			onResetForm();
		}
	};

	return (
		<section className={`formulario formulario-overlay ${hideFormNewPrestamoClass}`}>
			<div className="contenedor__formulario-overlay">
				<div id="closeMenu" className="icon__close">
					<button onClick={handleCloseForm}>
						<i className="fa-regular fa-circle-xmark"></i>
					</button>
				</div>
				<h3>¡Registrar Prestamo!</h3>
				<p>
					Saldo máximo a tomar prestado: <span>{formatCurrency(saldoDisponibleA)}</span>
				</p>

				<form onSubmit={onSubmit}>
					<div className="form__group">
						<label htmlFor="montoPrestado">Monto:</label>
						<input
							type="number"
							name="montoPrestado"
							id="montoPrestado"
							value={montoPrestado}
							onChange={onInputChange}
							required
						/>
					</div>

					<div className="form__group">
						<label htmlFor="descripcion">Descripción:</label>
						<textarea
							name="descripcion"
							id="descripcion"
							value={descripcion}
							onChange={onInputChange}
							required
						></textarea>
					</div>

					<div className="contenedor__btn">
						<button type="submit" className="btn button">
							Guardar Prestamo
						</button>
					</div>
				</form>
			</div>
		</section>
	);
};
