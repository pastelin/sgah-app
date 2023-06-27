import { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from '../../hooks/useForm';
import { startAgregarGasto } from '../../store/sgah/thunks';
import { onCloseFormGasto } from '../../store';

const formData = {
	monto: '',
	cdGastoRecurrente: '',
	descripcion: '',
	cdTipoMovimiento: 2,
};

export const FormGastos = () => {
	// A hook to access the redux dispatch function.
	const dispatch = useDispatch();

	// A hook to access the redux store's state. This hook takes a selector function as an argument.
	// The selector is called with the store state.
	const { categoriaGastos, montos, uriGastoMesActual, uriMontos, uriAgregaGasto } = useSelector(
		(state) => state.sgahGasto
	);

	const { isFormGastoOpen } = useSelector((state) => state.ui);

	const { monto, cdGastoRecurrente, descripcion, cdTipoMovimiento, onInputChange, onResetForm } =
		useForm(formData);

	const hideFormClass = useMemo(() => {
		return isFormGastoOpen ? '' : 'display__none';
	}, [isFormGastoOpen]);

	const handleCloseForm = () => {
		dispatch(onCloseFormGasto());
	};

	const onSubmit = (event) => {
		event.preventDefault();

		dispatch(
			startAgregarGasto(
				{ monto, cdGastoRecurrente, descripcion, cdTipoMovimiento },
				uriGastoMesActual,
				uriMontos,
				uriAgregaGasto
			)
		);

		handleCloseForm();
		onResetForm();
	};

	return (
		<section className={`formulario ${hideFormClass}`}>
			<div className="contenedor__formulario">
				<div className="icon__close">
					<button onClick={handleCloseForm} id="closeForm">
						<i className="fa-regular fa-circle-xmark"></i>
					</button>
				</div>
				<h3>¡Registrar Gasto!</h3>
				<p>
					Monto máximo a gastar: <span>{montos.disponible}</span>
				</p>

				<form onSubmit={onSubmit}>
					<div className="form__group">
						<label htmlFor="monto">Monto:</label>
						<input
							type="number"
							name="monto"
							id="monto"
							value={monto}
							onChange={onInputChange}
							required
						/>
					</div>

					<div className="form__group">
						<select
							name="cdGastoRecurrente"
							id="cdGastoRecurrente"
							value={cdGastoRecurrente}
							onChange={onInputChange}
							required
						>
							<option value="">Seleccionar tipo de gasto</option>
							{categoriaGastos.map(({ cdGasto, nbGasto }) => (
								<option
									key={window.crypto.getRandomValues(new Uint32Array(1))[0]}
									value={cdGasto}
								>
									{nbGasto}
								</option>
							))}
						</select>
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
						<button type="submit">Guardar Gasto</button>
					</div>
				</form>
			</div>
		</section>
	);
};
