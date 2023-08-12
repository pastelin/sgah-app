import { useEffect } from 'react';
import { formatCurrency, useSgahGastoStore, useGastoUi } from '../../hooks';
import { TableSgahGasto, FormGasto } from '../components';

export const SgahGastosPage = () => {
	const {
		handleOpenFormGasto,
		classNameCategoriaDisplay,
		classNameTipoDisplay,
		classNameFechaDisplay,
		handleUpdatingSelectedFilterGasto,
	} = useGastoUi();

	const {
		filtro,
		categoriasGasto,
		tipoMovimiento,
		saldoDisponible,
		saldoGastado,
		startLoadingCategoriasGasto,
		startLoadingGastos,
		startLoadingSaldoGasto,
	} = useSgahGastoStore();

	useEffect(() => {
		startLoadingCategoriasGasto();
		startLoadingGastos();
		startLoadingSaldoGasto();
	}, []);

	return (
		<>
			<aside className="contenedor__movimientos">
				<h2>Detalle Gastos</h2>

				<div className="contenedor__filtro">
					<select onChange={handleUpdatingSelectedFilterGasto} name="filtro" id="filtro">
						<option value="">Elegir una opción</option>
						{filtro.map((opcion) => (
							<option key={opcion} value={opcion}>
								{opcion}
							</option>
						))}
					</select>

					<select className={classNameCategoriaDisplay}>
						<option value="">Seleccionar tipo de gasto</option>
						{categoriasGasto.map(({ cdGasto, nbGasto }) => (
							<option
								key={window.crypto.getRandomValues(new Uint32Array(1))[0]}
								value={cdGasto}
							>
								{nbGasto}
							</option>
						))}
					</select>

					<select className={classNameTipoDisplay}>
						<option value="">Elegir una opción</option>
						{tipoMovimiento.map((item) => (
							<option key={item} value={item}>
								{item}
							</option>
						))}
					</select>

					<input type="date" className={classNameFechaDisplay} />
					<input type="date" className={classNameFechaDisplay} />
				</div>

				<div className="contenedor__montos">
					<h3>
						Disponible: <span>{formatCurrency(saldoDisponible)}</span>
					</h3>

					<h3>
						Gastado: <span>{formatCurrency(saldoGastado)}</span>
					</h3>
				</div>

				<div className="contenedor__boton">
					<button
						onClick={handleOpenFormGasto}
						id="btnAgregarGasto"
						className="btn button"
					>
						Agregar Gasto
					</button>
				</div>

				<TableSgahGasto />
			</aside>

			<FormGasto />
		</>
	);
};
