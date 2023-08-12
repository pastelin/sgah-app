import { useEffect, useState } from 'react';
import {
	formatCurrency,
	useAhorroUi,
	useForm,
	useGastoUi,
	useSgahAhorroStore,
	useSgahGastoStore,
} from '../../hooks';
import { useMessages } from '../../hooks/useMessages';

const formDataGasto = {
	monto: '',
	cdGastoRecurrente: 0,
	descripcion: '',
	cdTipoMovimiento: 1,
};

const formDataAhorro = {
	monto: '',
	descripcion: '',
};

export const SgahIngresosPage = () => {
	const {
		isAbleEditAhorro,
		isAbleEditSaldoIngreso,
		handleDisableEditAhorro,
		handleAbleEditAhorro,
		handleDisableEditSaldoIngreso,
		handleAbleEditSaldoIngreso,
	} = useAhorroUi();

	const { isAbleEditGasto, handleDisableEditGasto, handleAbleEditGasto } = useGastoUi();

	const { startSavingGasto } = useSgahGastoStore();
	const { startSavingAhorro } = useSgahAhorroStore();

	const [saldoIngreso, setSaldoIngreso] = useState(0);
	const [saldoUsado, setSaldoUsado] = useState(0);

	useEffect(() => {
		handleAbleEditSaldoIngreso();
		handleAbleEditGasto();
		handleAbleEditAhorro();
	}, []);

	const {
		monto: montoGasto,
		cdGastoRecurrente,
		descripcion,
		cdTipoMovimiento,
		onInputChange,
	} = useForm(formDataGasto);

	const {
		monto: montoAhorro,
		descripcion: descripcionAhorro,
		onInputChange: onInputChangeAhorro,
	} = useForm(formDataAhorro);

	const onInputChangeIngreso = ({ target }) => {
		setSaldoIngreso(formatCurrency(target.value));
	};

	const onSubmitGastos = async (event) => {
		event.preventDefault();

		const updateSaldoUsado = parseFloat(saldoUsado) + parseFloat(montoGasto);
		if (updateSaldoUsado > parseFloat(saldoIngreso)) return;

		const { code, message } = await startSavingGasto({
			monto: montoGasto,
			cdGastoRecurrente,
			descripcion,
			cdTipoMovimiento,
		});

		useMessages(code, message);

		if (code === 200 || code === 201) {
			setSaldoUsado(updateSaldoUsado);
			handleDisableEditGasto();
		}
	};

	const onSubmitAhorro = (event) => {
		event.preventDefault();

		const updateSaldoUsado = parseFloat(saldoUsado) + parseFloat(montoAhorro);
		if (updateSaldoUsado > parseFloat(saldoIngreso)) return;

		startSavingAhorro({ monto: montoAhorro, descripcion: descripcionAhorro });
		setSaldoUsado(updateSaldoUsado);
		handleDisableEditAhorro();
	};

	return (
		<aside className="contenedor__ingresos">
			<h2>Ingresos</h2>

			<div className="group__ingresos">
				<div className="group__input">
					<label htmlFor="saldoIngreso">Saldo a distribuir:</label>
					<input
						type="number"
						name="saldoIngreso"
						id="saldoIngreso"
						placeholder="0.0"
						value={saldoIngreso}
						onChange={onInputChangeIngreso}
						required
						disabled={!isAbleEditSaldoIngreso}
					/>
				</div>

				<button
					onClick={handleDisableEditSaldoIngreso}
					className="button btn-ingreso-actualiza"
					disabled={!isAbleEditSaldoIngreso}
				>
					Actualizar
				</button>
			</div>
			<div className="contenedor__monto">
				<p>
					Saldo disponible: <span>{formatCurrency(saldoIngreso - saldoUsado)}</span>
				</p>
			</div>

			<hr />

			<section className="contenedor__formularios">
				<section className="formulario">
					<div className="contenedor__formulario-ingresos">
						<h3>Gastos</h3>
						<form onSubmit={onSubmitGastos}>
							<div className="form__group">
								<label htmlFor="monto">Monto:</label>
								<input
									type="number"
									name="monto"
									id="monto"
									value={montoGasto}
									onChange={onInputChange}
									required
									disabled={!isAbleEditGasto}
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
									disabled={!isAbleEditGasto}
								></textarea>
							</div>

							<div className="contenedor__btn">
								<button
									className="button"
									type="submit"
									disabled={!isAbleEditGasto}
								>
									Guardar Gasto
								</button>
							</div>
						</form>
					</div>
				</section>

				{/* <hr /> */}

				<section className="formulario">
					<div className="contenedor__formulario-ingresos">
						<h3>Ahorro</h3>
						<form onSubmit={onSubmitAhorro}>
							<div className="form__group">
								<label htmlFor="monto">Monto:</label>
								<input
									type="number"
									name="monto"
									id="monto"
									value={montoAhorro}
									onChange={onInputChangeAhorro}
									required
									disabled={!isAbleEditAhorro}
								/>
							</div>

							<div className="form__group">
								<label htmlFor="descripcion">Descripción:</label>
								<textarea
									name="descripcion"
									id="descripcion"
									value={descripcionAhorro}
									onChange={onInputChangeAhorro}
									required
									disabled={!isAbleEditAhorro}
								></textarea>
							</div>

							<div className="contenedor__btn">
								<button
									className="button"
									type="submit"
									disabled={!isAbleEditAhorro}
								>
									Guardar Ahorro
								</button>
							</div>
						</form>
					</div>
				</section>
			</section>
		</aside>
	);
};
