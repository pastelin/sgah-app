import { useMemo } from 'react';
import { useSgahPrestamoStore, usePrestamoUi } from '../../hooks';
import { FormNewPrestamo, FormUpdatePrestamo, TableSgahPrestamo } from '../components';

export const SgahPrestamosPage = () => {
	const { handleOpenNewFormPrestamo } = usePrestamoUi();

	const { filtro, saldoUtilizadoP, startLoadingSaldoUtilizadoP, startLoadingPrestamos } =
		useSgahPrestamoStore();

	useMemo(() => {
		startLoadingSaldoUtilizadoP();
		startLoadingPrestamos();
	}, []);

	return (
		<>
			<aside className="contenedor-aside">
				<h2>Detalle Prestamos</h2>

				{/* <div className="contenedor__filtro">
					<select name="filtro" id="filtro">
						<option value="">Elegir una opción</option>
						{filtro.map((opcion) => (
							<option key={opcion} value={opcion}>
								{opcion}
							</option>
						))}
					</select>
				</div> */}

				<div className="contenedor-saldo text-center">
					<p>
						Deuda Actual: <span>{saldoUtilizadoP}</span>
					</p>
				</div>

				<div className="text-center mt-2">
					<button className="btn btn-submit btn-xl" onClick={handleOpenNewFormPrestamo}>
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
