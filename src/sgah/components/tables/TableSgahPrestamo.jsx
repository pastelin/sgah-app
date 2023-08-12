import { useSgahPrestamoStore, formatCurrency, usePrestamoUi } from '../../../hooks';

export const TableSgahPrestamo = () => {
	const { prestamos, startLoadingPrestamo } = useSgahPrestamoStore();

	const { handleOpenUpdateFormPrestamo } = usePrestamoUi();

	const handleOpenFormUpdatePrestamo = (folio) => {
		if (!!folio) {
			startLoadingPrestamo(folio);
			handleOpenUpdateFormPrestamo();
		}
	};

	return (
		<div className="contenedor__table">
			<table>
				<thead>
					<tr>
						<th>Fecha</th>
						<th>Saldo utilizado</th>
						<th>Descripción</th>
						<th>Deuda Actual</th>
						<th></th>
					</tr>
				</thead>

				<tbody>
					{prestamos.map((prestamo) => (
						<tr key={window.crypto.getRandomValues(new Uint32Array(1))[0]}>
							<td>{prestamo.fechaCreacion}</td>
							<td>{formatCurrency(prestamo.montoPrestado)}</td>
							<td>{prestamo.descripcion}</td>
							<td>{formatCurrency(prestamo.montoPrestado - prestamo.montoPagado)}</td>
							<td>
								<a
									onClick={() => handleOpenFormUpdatePrestamo(prestamo.folio)}
									className="btn btn-prestamos"
								>
									Pagar
								</a>
							</td>
							<td></td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
};
