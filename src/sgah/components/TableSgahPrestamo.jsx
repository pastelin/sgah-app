import { useDispatch } from 'react-redux';
import { usePrestamos } from '../../hooks/usePrestamos';
import { onOpenFormUpdatePrestamo, startObtenerPrestamo } from '../../store';

export const TableSgahPrestamo = () => {
	const { prestamos } = usePrestamos();
	const dispatch = useDispatch();

	const handleOpenFormUpdatePrestamo = (folio) => {
		if (!!folio) {
			dispatch(startObtenerPrestamo(folio));
			dispatch(onOpenFormUpdatePrestamo());
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
								<td>{prestamo.montoPrestado}</td>
								<td>{prestamo.descripcion}</td>
								<td>{prestamo.montoPagado}</td>
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
