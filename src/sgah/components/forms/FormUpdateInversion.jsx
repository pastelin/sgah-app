import {
	formatCurrency,
	useSgahInversionStore,
	useForm,
	usePrintMessage,
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

		usePrintMessage(code, message);

		if (code === 200 || code === 201) {
			handleCloseUpdateFormInversion();
			onResetForm();
		}
	};

	return (
		<section
			className={`overlay flex-responsive-row center-x-y ${classNameUpdateFormInversionDisplay}`}
		>
			<div className="contenedor-form">
				<div className="text-end p-1" id="closeMenu">
					<button className="icon-close fz-2" onClick={handleCloseUpdateFormInversion}>
						<i className="fa-regular fa-circle-xmark"></i>
					</button>
				</div>
				<h3>Retirar Inversión!</h3>
				<div className="contenedor-saldo text-center">
					<p>
						Saldo máximo a retirar: <span>{formatCurrency(inversion.monto)}</span>
					</p>
				</div>

				<form className="mt-2" onSubmit={onSubmit}>
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

					<div className="text-center my-2">
						<button className="btn btn-submit" type="submit">
							Actualizar Inversión
						</button>
					</div>
				</form>
			</div>
		</section>
	);
};
