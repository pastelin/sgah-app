import { useEffect, useState } from 'react';
import { formatCurrency, useForm } from '../../hooks';
import { useDispatch, useSelector } from 'react-redux';
import {
	onActiveFormAhorro,
	onActiveFormGastos,
	onActiveSaldoIngreso,
	onDisabledFormAhorro,
	onDisabledFormGastos,
	onDisabledSaldoIngreso,
	startAgregarAhorro,
} from '../../store';
import { useSgahGastoStore } from '../../hooks/store/useSgahGastoStore';

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
	const { isSaldoIngresoDisabled, isFormGastosSubmitted, isFormAhorroSubmitted } = useSelector(
		(state) => state.ui
	);

	const { startSavingGasto } = useSgahGastoStore();

	const dispatch = useDispatch();

	const [saldoIngreso, setSaldoIngreso] = useState(0);
	const [saldoUsado, setSaldoUsado] = useState(0);

	useEffect(() => {
		dispatch(onActiveSaldoIngreso());
		dispatch(onActiveFormGastos());
		dispatch(onActiveFormAhorro());
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

	const handleActualizarIngreso = () => {
		dispatch(onDisabledSaldoIngreso());
	};

	const onSubmitGastos = (event) => {
		event.preventDefault();

		const updateSaldoUsado = parseFloat(saldoUsado) + parseFloat(montoGasto);
		if (updateSaldoUsado > parseFloat(saldoIngreso)) return;

		startSavingGasto({
			monto: montoGasto,
			cdGastoRecurrente,
			descripcion,
			cdTipoMovimiento,
		});
        
		setSaldoUsado(updateSaldoUsado);
		dispatch(onDisabledFormGastos());
	};

	const onSubmitAhorro = (event) => {
		event.preventDefault();

		const updateSaldoUsado = parseFloat(saldoUsado) + parseFloat(montoAhorro);
		if (updateSaldoUsado > parseFloat(saldoIngreso)) return;

		dispatch(startAgregarAhorro({ monto: montoAhorro, descripcion: descripcionAhorro }));
		setSaldoUsado(updateSaldoUsado);
		dispatch(onDisabledFormAhorro());
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
						disabled={isSaldoIngresoDisabled}
					/>
				</div>

				<button
					onClick={handleActualizarIngreso}
					className="button btn-ingreso-actualiza"
					disabled={isSaldoIngresoDisabled}
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
									disabled={isFormGastosSubmitted}
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
									disabled={isFormGastosSubmitted}
								></textarea>
							</div>

							<div className="contenedor__btn">
								<button
									className="button"
									type="submit"
									disabled={isFormGastosSubmitted}
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
									disabled={isFormAhorroSubmitted}
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
									disabled={isFormAhorroSubmitted}
								></textarea>
							</div>

							<div className="contenedor__btn">
								<button
									className="button"
									type="submit"
									disabled={isFormAhorroSubmitted}
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
