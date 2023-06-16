export const TableSgah = ({ objects, cabeceras, properties }) => {

	return (
		<div className="contenedor__table">
			<table>
				<thead>
					<tr>
						{cabeceras.map((cabecera) => (
							<th key={cabecera}>{cabecera}</th>
						))}
					</tr>
				</thead>

				<tbody>
					{objects.map((object) => (
						<tr key={window.crypto.getRandomValues(new Uint32Array(1))[0]}>
							{properties.map((propertie) => (
								<td key={window.crypto.getRandomValues(new Uint32Array(1))[0]}>
                                    {
                                        propertie === 'btnPrestamo' ? <a className="btnPrestamos">Pagar</a> : object[propertie]
                                    }
								</td>
							))}
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
};
