import { useEffect } from 'react';
import { formatCurrency, useGastos } from '../../hooks';
import { useSgahGastoStore } from '../../hooks/store/useSgahGastoStore';
import { TableSgah, FormGastos } from '../components';

export const SgahGastosPage = () => {
	const {
		handleOpenForm,
		hideCategoriaClass,
		hideTipoMovimientoClass,
		hideFechaClass,
		handleChangeFilter,
	} = useGastos();

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
					<select onChange={handleChangeFilter} name="filtro" id="filtro">
						<option value="">Elegir una opción</option>
						{filtro.map((opcion) => (
							<option key={opcion} value={opcion}>
								{opcion}
							</option>
						))}
					</select>

					<select className={hideCategoriaClass}>
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

					<select className={hideTipoMovimientoClass}>
						<option value="">Elegir una opción</option>
						{tipoMovimiento.map((item) => (
							<option key={item} value={item}>
								{item}
							</option>
						))}
					</select>

					<input type="date" className={hideFechaClass} />
					<input type="date" className={hideFechaClass} />
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
					<button onClick={handleOpenForm} id="btnAgregarGasto" className="btn button">
						Agregar Gasto
					</button>
				</div>

				<TableSgah />
			</aside>

			<FormGastos />
		</>
	);
};
