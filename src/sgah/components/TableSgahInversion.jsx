import { formatCurrency, useSgahInversionStore } from '../../hooks';
import { useInversionUi } from '../../hooks/ui/useInversionUi';

export const TableSgahInversion = () => {
	const { inversiones, startLoadingInversion } = useSgahInversionStore();
	const { handleOpenUpdateForm } = useInversionUi();

	const handleOpenForm = (folio) => {
		if (!!folio) {
			startLoadingInversion(folio);
			handleOpenUpdateForm();
		}
	};

	return (
		<div className="contenedor__table">
			<table>
				<thead>
					<tr>
						<th>Fecha</th>
						<th>Descripción</th>
						<th>Grupo Financiero</th>
						<th>Saldo Invertido</th>
						<th>Retirar Inversión</th>
					</tr>
				</thead>

				<tbody>
					{inversiones.map((inversion) => (
						<tr key={window.crypto.getRandomValues(new Uint32Array(1))[0]}>
							<td>{inversion.fechaCreacion}</td>
							<td>{inversion.descripcion}</td>
							<td>{inversion.nbAppInversion}</td>
							<td>{formatCurrency(inversion.monto)}</td>
							<td>
								<button className="btn btn-inversion" onClick={() => handleOpenForm(inversion.folio) }>
									Retirar
								</button>
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
};
