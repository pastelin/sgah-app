import { useMemo } from 'react';
import { useSgahPrestamoStore, usePrestamos } from '../../hooks';
import { FormNewPrestamo, FormUpdatePrestamo, TableSgahPrestamo } from '../components';

export const SgahPrestamosPage = () => {
	const { handleOpenFormNewPrestamo } = usePrestamos();
	const { filtro, saldoUtilizado, startLoadingSaldoUtilizado, startLoadingPrestamos } =
		useSgahPrestamoStore();

	useMemo(() => {
		startLoadingSaldoUtilizado();
		startLoadingPrestamos();
	}, []);

	return (
		<>
			<aside className="contenedor__movimientos">
				<h2>Detalle Prestamos</h2>

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
						Deuda Actual: <span>{saldoUtilizado}</span>
					</h3>
				</div>

				<div className="contenedor__boton">
					<button onClick={handleOpenFormNewPrestamo} className="btn button">
						Agregar Prestamo
					</button>
				</div>

				<TableSgahPrestamo />
			</aside>

			<FormNewPrestamo />

			<FormUpdatePrestamo />
		</>
	);
};
