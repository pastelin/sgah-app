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
		saldoDisponibleG,
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
			<aside className="contenedor-aside">
				<h2>Detalle Gastos</h2>

				{/* <div className="contenedor__filtro">
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
				</div> */}

				<div className="contenedor-saldo flex-responsive-row justify-sa">
					<p>
						Saldo Disponible: <span>{formatCurrency(saldoDisponibleG)}</span>
					</p>

					<p>
						Saldo Gastado: <span>{formatCurrency(saldoGastado)}</span>
					</p>
				</div>

				<div className="text-center mt-2">
					<button
						className="btn btn-submit btn-xl "
						onClick={handleOpenFormGasto}
						id="btnAgregarGasto"
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
