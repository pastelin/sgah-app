import { usePrestamos } from '../../hooks/usePrestamos';
import { FormNewPrestamos } from '../components/FormNewPrestamos';
import { FormUpdatePrestamos } from '../components/FormUpdatePrestamo';
import { TableSgahPrestamo } from '../components/TableSgahPrestamo';

export const SgahPrestamosPage = () => {

    const { filtro, saldoUtilizado, handleOpenFormNewPrestamo } = usePrestamos();
    
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
						<button onClick={handleOpenFormNewPrestamo}>Agregar Prestamo</button>
					</div>

					<TableSgahPrestamo />
				</div>
			</aside>

			<FormNewPrestamos />

			<FormUpdatePrestamos />
		</>
	);
};
