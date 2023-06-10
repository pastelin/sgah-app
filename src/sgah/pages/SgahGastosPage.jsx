import { useGastos } from '../../hooks';
import { TableSgah, FormGastos } from '../components';

export const SgahGastosPage = () => {
	const { filtro, categoriaGastos, tipoMovimiento, gastos, montos, cabecerasTable, properties } =
        useGastos();
    
	const { disponible, gastado } = montos;

	return (
		<>
			<aside className="detalle__movimientos">
				<div className="contenedor__movimientos">
					<h1>Detalle Gastos</h1>

					<div className="contenedor__filtro">
						<select name="filtro" id="filtro">
							<option value="">Elegir una opción</option>
							{filtro.map((opcion) => (
								<option key={opcion} value={opcion}>
									{opcion}
								</option>
							))}
						</select>

						<select id="categoria" className="display--none">
							<option value="">Seleccionar tipo de gasto</option>
							{categoriaGastos.map(({ cdGasto, nbGasto }) => (
								<option
									key={window.crypto.getRandomValues(new Uint32Array(1))[0]}
									value={cdGasto}
								>
									{nbGasto}
								</option>
							))}
						</select>

						<select id="tipo" className="display--none">
							<option value="">Elegir una opción</option>
							{tipoMovimiento.map((item) => (
								<option key={item} value={item}>
									{item}
								</option>
							))}
						</select>

						<input type="date" id="fechaInicio" className="display--none" />
						<input type="date" id="fechaFin" className="display--none" />
					</div>

					<div className="contenedor__montos">
						<h3>
							Disponible: <span>{disponible}</span>
						</h3>

						<h3>
							Gastado: <span>{gastado}</span>
						</h3>
					</div>

					<div className="contenedor__boton">
						<button id="btnAgregarGasto">Agregar Gasto</button>
					</div>

					<TableSgah
						objects={gastos}
						cabeceras={cabecerasTable}
						properties={properties}
					/>
				</div>
			</aside>

			<FormGastos />
		</>
	);
};
