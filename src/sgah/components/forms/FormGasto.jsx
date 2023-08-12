import Swal from 'sweetalert2';
import {
	useForm,
	useSgahGastoStore,
	formatCurrency,
	useMessages,
	useGastoUi,
} from '../../../hooks';

const formData = {
	monto: '',
	cdGastoRecurrente: '',
	descripcion: '',
	cdTipoMovimiento: 2,
};

export const FormGasto = () => {
	const { categoriasGasto, saldoDisponible, startSavingGasto } = useSgahGastoStore();

	const { classNameDisplay, handleCloseFormGasto } = useGastoUi();

	const { monto, cdGastoRecurrente, descripcion, cdTipoMovimiento, onInputChange, onResetForm } =
		useForm(formData);

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

		useMessages(code, message);

		if (code === 200) {
			onResetForm();
			handleCloseFormGasto();
		}
	};

	return (
		<section className={`formulario formulario-overlay ${classNameDisplay}`}>
			<div className="contenedor__formulario-overlay">
				<div className="icon__close">
					<button onClick={handleCloseFormGasto} id="closeForm">
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
						<button type="submit" className="btn button">
							Guardar Gasto
						</button>
					</div>
				</form>
			</div>
		</section>
	);
};
