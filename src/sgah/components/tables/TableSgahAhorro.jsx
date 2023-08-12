import { formatCurrency, useSgahAhorroStore } from '../../../hooks';

export const TableSgahAhorro = () => {
	const { ahorros } = useSgahAhorroStore();

	return (
		<div className="contenedor__table">
			<table>
				<thead>
					<tr>
						<th>Fecha</th>
						<th>Descripción</th>
						<th>Monto</th>
					</tr>
				</thead>

				<tbody>
					{ahorros.map((ahorro) => (
						<tr key={window.crypto.getRandomValues(new Uint32Array(1))[0]}>
							<td>{ahorro.fechaCreacion}</td>
							<td>{ahorro.descripcion}</td>
							<td>{formatCurrency(ahorro.monto)}</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
};
