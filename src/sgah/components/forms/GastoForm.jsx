import { useEffect } from 'react';
import { useForm, useGastoUi, useMessages, useSgahGastoStore } from '../../../hooks';
import Swal from 'sweetalert2';
import { useIngreso } from '../../../hooks/pages/useIngreso';

const formDataGasto = {
	porcentaje: '',
	cdGastoRecurrente: '',
	descripcion: '',
	cdTipoMovimiento: 1,
};

export const GastoForm = () => {
	const {
		porcentaje,
		cdGastoRecurrente,
		descripcion,
		cdTipoMovimiento,
		onInputChange,
		onResetForm,
	} = useForm(formDataGasto);

	const {
		hasPermissionEdit: hasPermissionEditG,
		handleHasPermissionEdit: handleHasPermissionEditG,
	} = useGastoUi();

	const {
		ingresos,
		availablePercentage,
		hasPermissionEdit,
		startUpdatingSaldoUtilizado,
		startUpdatingAvailablePercentage,
		handleHasPermissionEdit,
	} = useIngreso();

	const { startSavingGasto, categoriasGasto, startLoadingCategoriasGasto } = useSgahGastoStore();

	useEffect(() => {
		if (!categoriasGasto || categoriasGasto.length <= 1) {
			startLoadingCategoriasGasto();
		}
	}, []);

	useEffect(() => {
		if (availablePercentage === 0) {
			onResetForm();
			handleHasPermissionEditG(true);
		}
	}, [availablePercentage]);

	const onSubmitGastos = async (event) => {
		event.preventDefault();

		if (porcentaje > availablePercentage) {
			Swal.fire(
				'Porcentaje inválido',
				`El porcentaje no debe ser mayor al ${availablePercentage}%`,
				'error'
			);
			return;
		}

		const ingresoGasto = ingresos * (porcentaje / 100);

		const { code, message } = await startSavingGasto({
			monto: ingresoGasto,
			cdGastoRecurrente,
			descripcion,
			cdTipoMovimiento,
		});

		useMessages(code, message);

		if (code === 200 || code === 201) {
			startUpdatingSaldoUtilizado(ingresoGasto);
			startUpdatingAvailablePercentage(porcentaje);
			!hasPermissionEdit || handleHasPermissionEdit(false);
			!hasPermissionEditG || handleHasPermissionEditG(false);
		}
	};

	return (
		<>
			<form onSubmit={onSubmitGastos}>
				<div className="form__group">
					<label htmlFor="monto">Porcentaje:</label>
					<input
						type="number"
						name="porcentaje"
						id="porcentaje"
						value={porcentaje}
						onChange={onInputChange}
						required
						disabled={!hasPermissionEditG}
					/>
				</div>
				<div className="form__group">
					<select
						name="cdGastoRecurrente"
						id="cdGastoRecurrente"
						value={cdGastoRecurrente}
						onChange={onInputChange}
						required
						disabled={!hasPermissionEditG}
					>
						<option value="">Seleccionar tipo de ingreso</option>
						{categoriasGasto.map(
							({ cdGasto, nbGasto, cdEstatus }) =>
								(cdEstatus === 2 || cdGasto === 11) && (
									<option
										key={window.crypto.getRandomValues(new Uint32Array(1))[0]}
										value={cdGasto}
									>
										{nbGasto}
									</option>
								)
						)}
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
						disabled={!hasPermissionEditG}
					></textarea>
				</div>

				{!hasPermissionEditG || (
					<div className="text-center mt-2">
						<button className="btn btn-submit" type="submit">
							Guardar Gasto
						</button>
					</div>
				)}
			</form>
		</>
	);
};
