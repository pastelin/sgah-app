import { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from '../../hooks/useForm';
import { onCloseFormGasto } from '../../store';
import { useSgahGastoStore } from '../../hooks/store/useSgahGastoStore';

const formData = {
	monto: '',
	cdGastoRecurrente: '',
	descripcion: '',
	cdTipoMovimiento: 2,
};

export const FormGastos = () => {
	// A hook to access the redux dispatch function.
	const dispatch = useDispatch();

	const { categoriasGasto, disponible, startSavingGasto } = useSgahGastoStore();

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

		startSavingGasto({ monto, cdGastoRecurrente, descripcion, cdTipoMovimiento }, onResetForm);
	};

	return (
		<section className={`formulario formulario-overlay ${hideFormClass}`}>
			<div className="contenedor__formulario-overlay">
				<div className="icon__close">
					<button onClick={handleCloseForm} id="closeForm">
						<i className="fa-regular fa-circle-xmark"></i>
					</button>
				</div>
				<h3>¡Registrar Gasto!</h3>
				<p>
					Saldo máximo a gastar: <span>{disponible}</span>
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
							{categoriasGasto.map(({ cdGasto, nbGasto }) => (
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
						<button type="submit" className="button">
							Guardar Gasto
						</button>
					</div>
				</form>
			</div>
		</section>
	);
};
