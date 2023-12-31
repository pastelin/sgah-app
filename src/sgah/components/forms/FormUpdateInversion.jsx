import {
	formatCurrency,
	useSgahInversionStore,
	useForm,
	useMessages,
	useInversionUi,
} from '../../../hooks';
import Swal from 'sweetalert2';

const formDada = {
	monto: 0,
};

export const FormUpdateInversion = () => {
	const { handleCloseUpdateFormInversion, classNameUpdateFormInversionDisplay } =
		useInversionUi();
	const { inversion, startUpdatingInversion } = useSgahInversionStore();

	const { monto, onInputChange, onResetForm } = useForm(formDada);

	const onSubmit = async (event) => {
		event.preventDefault();

		if (monto > inversion.monto) {
			Swal.fire('Validar monto a retirar', '', 'error');
			return;
		}

		const { code, message } = await startUpdatingInversion({
			...inversion,
			monto: monto,
		});

		useMessages(code, message);

		if (code === 200 || code === 201) {
			handleCloseUpdateFormInversion();
			onResetForm();
		}
	};

	return (
		<section className={`formulario formulario-overlay ${classNameUpdateFormInversionDisplay}`}>
			<div className="contenedor__formulario-overlay">
				<div id="closeMenu" className="icon__close">
					<button onClick={handleCloseUpdateFormInversion}>
						<i className="fa-regular fa-circle-xmark"></i>
					</button>
				</div>
				<h3>Retirar Inversión!</h3>
				<p>
					Saldo máximo a retirar: <span>{formatCurrency(inversion.monto)}</span>
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

					<div className="contenedor__btn">
						<button type="submit" className="btn button">
							Actualizar Inversión
						</button>
					</div>
				</form>
			</div>
		</section>
	);
};
