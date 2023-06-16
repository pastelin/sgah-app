import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from '../../hooks/useForm';
import { startAgregarPrestamo } from '../../store/sgah/thunks';

const formData = {
	montoPrestado: '',
	descripcion: '',
};

export const FormPrestamos = () => {
	// A hook to access the redux store's state. This hook takes a selector function as an argument.
	// The selector is called with the store state.
	const { uriPrestamosActivos, uriSaldoUtilizado, uriAgregaPrestamo } = useSelector(
		(state) => state.sgahPrestamo
	);
    
    const { resumen } = useSelector((state) => state.sgah);

	// A hook to access the redux dispatch function.
	const dispatch = useDispatch();

	useEffect(() => {
		const closeFormElement = document.querySelector('#closeForm');
		const formularioPrestamoElement = document.querySelector('#formularioPrestamo');

		closeFormElement.addEventListener('click', () => {
			formularioPrestamoElement.classList.add('display__none');
		});
	}, []);

	const { montoPrestado, descripcion, onInputChange, onResetForm } = useForm(formData);

	const onSubmit = (event) => {
		event.preventDefault();

		dispatch(
			startAgregarPrestamo(
				{ montoPrestado, descripcion },
				uriPrestamosActivos,
				uriSaldoUtilizado,
				uriAgregaPrestamo
			)
		);

		const formularioPrestamoElement = document.querySelector('#formularioPrestamo');
		formularioPrestamoElement.classList.add('display__none');
		onResetForm();
	};

	return (
		<section id="formularioPrestamo" className="formulario display__none">
			<div className="contenedor__formulario">
				<div id="closeMenu" className="icon__close">
					<button id="closeForm">
						<i className="fa-regular fa-circle-xmark"></i>
					</button>
				</div>
				<h3>¡Registrar Prestamo!</h3>
				<p>
					Monto máximo a tomar prestado: <span>{resumen.montoAhorro}</span>
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
						<button type="submit">Guardar Prestamo</button>
					</div>
				</form>
			</div>
		</section>
	);
};
