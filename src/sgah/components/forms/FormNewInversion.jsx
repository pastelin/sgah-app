import { useEffect } from 'react';
import Swal from 'sweetalert2';
import {
	useMessages,
	useForm,
	useInversionUi,
	formatCurrency,
	useSgahInversionStore,
} from '../../../hooks';

const formData = {
	monto: '',
	descripcion: '',
	cdAppInversion: '',
};

export const FormNewInversion = () => {
	const { handleCloseNewFormInversion, classNameNewFormInversionDisplay } = useInversionUi();

	const {
		saldoDisponibleA,
		startLoadingSaldoDisponibleA,
		startLoadingGruposFinancieros,
		gruposFinancieros,
		startSavingInversion,
	} = useSgahInversionStore();

	useEffect(() => {
		if (saldoDisponibleA) return;
		startLoadingSaldoDisponibleA();
	}, []);

	useEffect(() => {
		startLoadingGruposFinancieros();
	}, []);

	const { monto, descripcion, cdAppInversion, onInputChange, onResetForm } = useForm(formData);

	const onSubmit = async (event) => {
		event.preventDefault();

		if (monto > saldoDisponibleA) {
			Swal.fire('Validar monto ingresado', '', 'error');
			return;
		}

		const { code, message } = await startSavingInversion({
			monto,
			descripcion,
			cdAppInversion,
		});

		useMessages(code, message);

		if (code === 200 || code === 201) {
			handleCloseNewFormInversion();
			onResetForm();
		}
	};

	return (
		<section className={`formulario formulario-overlay ${classNameNewFormInversionDisplay}`}>
			<div className="contenedor__formulario-overlay">
				<div id="closeMenu" className="icon__close">
					<button onClick={handleCloseNewFormInversion}>
						<i className="fa-regular fa-circle-xmark"></i>
					</button>
				</div>
				<h3>¡Registrar Inversión!</h3>
				<p>
					Saldo máximo a invertir: <span>{formatCurrency(saldoDisponibleA)}</span>
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
							name="cdAppInversion"
							value={cdAppInversion}
							onChange={onInputChange}
						>
							<option value="">Seleccionar grupo financiero</option>
							{gruposFinancieros.map((grupoFinanciero) => (
								<option
									key={window.crypto.getRandomValues(new Uint32Array(1))[0]}
									value={grupoFinanciero.cdAppInversion}
								>
									{grupoFinanciero.nbAppInversion}
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
							Guardar Inversión
						</button>
					</div>
				</form>
			</div>
		</section>
	);
};
