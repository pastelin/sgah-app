import { useEffect } from 'react';
import { formatCurrency, useForm, useSgahPrestamoStore } from '../../hooks';
import { usePrestamoFormUpdate } from '../../hooks/prestamos/usePrestamoFormUpdate';
import Swal from 'sweetalert2';
import { useMessages } from '../../hooks/useMessages';

export const FormUpdatePrestamos = () => {
	useEffect(() => {
		if (!saldoDisponibleGasto) {
			startLoadingSaldoGasto();
		}
	}, []);

	const { hideFormUpdatePrestamoClass, handleCloseUpdateFormPrestamo } = usePrestamoFormUpdate();

	const { prestamo, startUpdatingPrestamo, saldoDisponibleGasto, startLoadingSaldoGasto } =
		useSgahPrestamoStore();

	const {
		folio,
		newMontoPagado,
		montoPrestado,
		fechaCreacion,
		montoPagado,
		descripcion,
		onInputChange,
		onResetForm,
	} = useForm(prestamo);

	const onSubmit = async (event) => {
		event.preventDefault();

		const montoLiquidar = montoPrestado - montoPagado;
		if (newMontoPagado > montoLiquidar) {
			Swal.fire('El monto no debe ser mayor a la deuda actual', '', 'error');
			return;
		}

		if (newMontoPagado > saldoDisponibleGasto) {
			Swal.fire('El monto no debe ser mayor al saldo disponible', '', 'error');
			return;
		}

		const { code, message } = await startUpdatingPrestamo({
			folio,
			montoPrestado,
			descripcion,
			fechaCreacion,
			montoPagado: newMontoPagado,
		});

		useMessages(code, message);

		if (code === 200) {
			handleCloseUpdateFormPrestamo();
			onResetForm();
		}
	};

	return (
		<section
			id="formularioUpdatePrestamo"
			className={`formulario formulario-overlay ${hideFormUpdatePrestamoClass}`}
		>
			<div className="contenedor__formulario-overlay">
				<div id="closeMenu" className="icon__close">
					<button onClick={handleCloseUpdateFormPrestamo}>
						<i className="fa-regular fa-circle-xmark"></i>
					</button>
				</div>
				<h3>¡Actualizar Prestamo!</h3>
				<p>
					Deuda Actual: <span>{formatCurrency(montoPrestado - montoPagado)}</span>
				</p>
				<p>
					Saldo disponible: <span>{formatCurrency(saldoDisponibleGasto)}</span>
				</p>
				<form onSubmit={onSubmit}>
					<div className="form__group">
						<label htmlFor="newMontoPagado">Monto:</label>
						<input
							type="number"
							name="newMontoPagado"
							id="newMontoPagado"
							value={newMontoPagado}
							onChange={onInputChange}
							required
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
						></textarea>
					</div>

					<div className="contenedor__btn">
						<button type="submit" className="btn button">
							Actualizar Prestamo
						</button>
					</div>
				</form>
			</div>
		</section>
	);
};
