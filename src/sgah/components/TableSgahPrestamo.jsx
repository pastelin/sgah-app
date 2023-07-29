import { formatCurrency, useSgahPrestamoStore } from '../../hooks';

export const TableSgahPrestamo = () => {
    const { prestamos, startLoadingPrestamo } = useSgahPrestamoStore();

	const handleOpenFormUpdatePrestamo = (folio) => {
		if (!!folio) {
            startLoadingPrestamo(folio);
		}
	};

	return (
		<>
			<div className="contenedor__table">
				<table>
					<thead>
						<tr>
							<th>Fecha</th>
							<th>Saldo usado</th>
							<th>Descripción</th>
							<th>Saldo pagado</th>
							<th></th>
						</tr>
					</thead>

					<tbody>
						{prestamos.map((prestamo) => (
							<tr key={window.crypto.getRandomValues(new Uint32Array(1))[0]}>
								<td>{prestamo.fechaCreacion}</td>
								<td>{formatCurrency(prestamo.montoPrestado)}</td>
								<td>{prestamo.descripcion}</td>
								<td>{formatCurrency(prestamo.montoPagado)}</td>
								<td>
									<a
										onClick={() => handleOpenFormUpdatePrestamo(prestamo.folio)}
										className="btn-prestamos"
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
		</>
	);
};
