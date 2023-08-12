import { useEffect } from 'react';
import {
	useForm,
	formatCurrency,
	usePrestamoUi,
	useSgahAhorroStore,
	useSgahPrestamoStore,
	useMessages,
} from '../../../hooks';
import Swal from 'sweetalert2';

const formData = {
	montoPrestado: '',
	descripcion: '',
};

export const FormNewPrestamo = () => {
	// A hook to access the redux store's state. This hook takes a selector function as an argument.
	// The selector is called with the store state.
	const { startSavingPrestamo } = useSgahPrestamoStore();

	const { startLoadingSaldoDisponibleA, saldoDisponibleA } = useSgahAhorroStore();

	const { classNameNewFormPrestamoDisplay, handleCloseNewFormPrestamo } = usePrestamoUi();

	useEffect(() => {
		startLoadingSaldoDisponibleA();
	}, []);

	const { montoPrestado, descripcion, onInputChange, onResetForm } = useForm(formData);

	const onSubmit = async (event) => {
		event.preventDefault();

		if (montoPrestado > saldoDisponibleA) {
			Swal.fire('Validar monto ingresado', '', 'error');
			return;
		}

		const { code, message } = await startSavingPrestamo({ montoPrestado, descripcion });

		useMessages(code, message);

		if (code === 200) {
			handleCloseNewFormPrestamo();
			onResetForm();
		}
	};

	return (
		<section className={`formulario formulario-overlay ${classNameNewFormPrestamoDisplay}`}>
			<div className="contenedor__formulario-overlay">
				<div id="closeMenu" className="icon__close">
					<button onClick={handleCloseNewFormPrestamo}>
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
