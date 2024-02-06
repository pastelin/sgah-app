import { useEffect, useMemo, useState } from 'react';
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
	const [isHoverFlipCard, setIsHoverFlipCard] = useState(false);

	const onToggleFlipCard = () => {
		setIsHoverFlipCard(!isHoverFlipCard);
	};

	const styleFlipCardHover = useMemo(() => {
		console.log(isHoverFlipCard);
		return isHoverFlipCard ? 'flip-card-hover' : '';
	}, [isHoverFlipCard]);

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
		<aside className="ingresos">
			<h2>Ingresos</h2>

			<div className="flex-responsive justify-center align-end">
				<div className="form__group">
					<label htmlFor="saldoIngreso">Saldo a inicial</label>
					<input
						type="number"
						name="saldoIngreso"
						id="saldoIngreso"
						value={saldoIngreso}
						onChange={onInputChangeIngreso}
						required
						disabled={!isAbleEditSaldoIngreso}
					/>
				</div>

				<button
					onClick={handleDisableEditSaldoIngreso}
					className="btn btn-submit"
					disabled={!isAbleEditSaldoIngreso}
				>
					Actualizar
				</button>
			</div>

			<div className="contenedor-saldo">
				<p>
					Saldo disponible: <span>{formatCurrency(saldoIngreso - saldoUsado)}</span>
				</p>
			</div>

			<section className={`contenedor-forms-ingresos flip-card ${styleFlipCardHover}`}>
				<section className="contenedor-form flip-face flip-front">
					<div className="position-end">
						<button className="btn btn-toggle" onClick={onToggleFlipCard}>
							Ahorro
						</button>
					</div>
					<h3>Gastos</h3>
					<form className="formulario" onSubmit={onSubmitGastos}>
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

						<div className="text-center mt-2">
							<button
								className="btn btn-submit"
								type="submit"
								disabled={!isAbleEditGasto}
							>
								Guardar Gasto
							</button>
						</div>
					</form>
				</section>

				<section className="contenedor-form flip-face flip-back">
					<div className="position-end">
						<button className="btn btn-toggle" onClick={onToggleFlipCard}>
							Gasto
						</button>
					</div>
					<h3>Ahorro</h3>
					<form className="formulario" onSubmit={onSubmitAhorro}>
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

						<div className="text-center mt-2">
							<button
								className="btn btn-submit"
								type="submit"
								disabled={!isAbleEditAhorro}
							>
								Guardar Ahorro
							</button>
						</div>
					</form>
				</section>
			</section>
		</aside>
	);
};
