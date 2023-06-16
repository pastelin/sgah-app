import { usePrestamos } from '../../hooks/usePrestamos';
import { FormPrestamos } from '../components/FormPrestamos';
import { TableSgah } from '../components/TableSgah';

export const SgahPrestamosPage = () => {
	const {
		filtro,
		cabecerasTable,
		properties,
		prestamos,
		saldoUtilizado,
	} = usePrestamos();
    
	return (
		<>
			<aside className="detalle__movimientos">
				<div className="contenedor__movimientos">
					<h1>Detalle Prestamos</h1>

					<div className="contenedor__filtro">
						<select name="filtro" id="filtro">
							<option value="">Elegir una opción</option>
							{filtro.map((opcion) => (
								<option key={opcion} value={opcion}>
									{opcion}
								</option>
							))}
						</select>

					</div>

					<div className="contenedor__montos">
						<h3>
							Saldo utilizado: <span>{saldoUtilizado}</span>
						</h3>
					</div>

					<div className="contenedor__boton">
						<button id="btnAgregarPrestamo">Agregar Prestamo</button>
					</div>

					<TableSgah
						objects={prestamos}
						cabeceras={cabecerasTable}
						properties={properties}
					/>
				</div>
			</aside>

			<FormPrestamos />
		</>
	);
};
