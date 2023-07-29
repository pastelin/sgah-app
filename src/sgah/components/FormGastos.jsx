import { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from '../../hooks/useForm';
import { onCloseFormGasto } from '../../store';
import { useSgahGastoStore } from '../../hooks/store/useSgahGastoStore';
import { formatCurrency } from '../../hooks';
import Swal from 'sweetalert2';
import { useMessages } from '../../hooks/useMessages';

const formData = {
	monto: '',
	cdGastoRecurrente: '',
	descripcion: '',
	cdTipoMovimiento: 2,
};

export const FormGastos = () => {
	// A hook to access the redux dispatch function.
	const dispatch = useDispatch();

	const { categoriasGasto, saldoDisponible, startSavingGasto } = useSgahGastoStore();

	const { isFormGastoOpen } = useSelector((state) => state.ui);

	const { monto, cdGastoRecurrente, descripcion, cdTipoMovimiento, onInputChange, onResetForm } =
		useForm(formData);

	const hideFormClass = useMemo(() => {
		return isFormGastoOpen ? '' : 'display__none';
	}, [isFormGastoOpen]);

	const handleCloseForm = () => {
		dispatch(onCloseFormGasto());
	};

	const onSubmit = async (event) => {
		event.preventDefault();

		if (saldoDisponible - monto < 0) {
			Swal.fire('El monto ingresado no debe superar el saldo disponible', '', 'error');
			return;
		}

		const { code, message } = await startSavingGasto({
			monto,
			cdGastoRecurrente,
			descripcion,
			cdTipoMovimiento,
		});

		console.log({ code, message });

		useMessages(code, message);

		if (code === 200) {
			onResetForm();
			handleCloseForm();
		}
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
					Saldo máximo a gastar: <span>{formatCurrency(saldoDisponible)}</span>
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
							// required
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
