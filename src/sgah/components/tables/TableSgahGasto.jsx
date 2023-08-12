import { useSgahGastoStore } from '../../../hooks';

export const TableSgahGasto = () => {
	const { gastos } = useSgahGastoStore();

	return (
		<div className="contenedor__table">
			<table>
				<thead>
					<tr>
						<th>Fecha</th>
						<th>Monto</th>
						<th>Descripción</th>
						<th>Categoría</th>
						<th>Tipo</th>
					</tr>
				</thead>

				<tbody>
					{gastos.map((gasto) => (
						<tr key={window.crypto.getRandomValues(new Uint32Array(1))[0]}>
							<td>{gasto.fechaCreacion}</td>
							<td>{gasto.monto}</td>
							<td>{gasto.descripcion}</td>
							<td>{gasto.nbGastoRecurrente}</td>
							<td>{gasto.nbTipoMovimiento}</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
};
