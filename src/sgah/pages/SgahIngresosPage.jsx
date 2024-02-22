import { formatCurrency } from '../../hooks';
import { useIngreso } from '../../hooks/pages/useIngreso';
import { GastoForm } from '../components/forms/GastoForm';

export const SgahIngresosPage = () => {
	const {
		descripcionAhorro,
		isAbleEditAhorro,
		hasPermissionEdit,
		montoAhorro,
		availablePercentage,
		onInputChangeAhorro,
		onInputChangeIngresos,
		onSubmitAhorro,
		onToggleFlipCard,
		ingresos,
		saldoUtilizado,
		styleFlipCardHover,
	} = useIngreso();

	return (
		<aside className="contenedor-aside">
			<h2>Ingresos</h2>

			<div className="flex-responsive-row justify-center align-end">
				<div className="form__group">
					<input
						type="number"
						id="ingresos"
						value={ingresos}
						onChange={onInputChangeIngresos}
						required
						disabled={!hasPermissionEdit}
					/>
				</div>
			</div>

			<div className="contenedor-saldo flex-responsive-row justify-sa mt-2">
				<p>
					Porcentaje Disponible: <span>{availablePercentage}%</span>
				</p>
				<p>
					Saldo disponible: <span>{formatCurrency(ingresos - saldoUtilizado)}</span>
				</p>
			</div>

			{!ingresos || (
				<section className={`contenedor-forms-ingresos flip-card ${styleFlipCardHover}`}>
					<section className="contenedor-form flip-face flip-front">
						<div className="text-end">
							<button className="btn btn-toggle" onClick={onToggleFlipCard}>
								Ahorro
							</button>
						</div>
						<h3>Gastos</h3>

						<GastoForm />
					</section>

					<section className="contenedor-form flip-face flip-back">
						<div className="text-end">
							<button className="btn btn-toggle" onClick={onToggleFlipCard}>
								Gasto
							</button>
						</div>
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
			)}
		</aside>
	);
};
