import { useEffect } from 'react';
import { useSgahStore } from '../../hooks';

export const SgahResumenPage = () => {
	const { montoAhorro, montoGasto, montoInversion, montoPrestamo, startDetalleResumen } =
		useSgahStore();

	useEffect(() => {
		startDetalleResumen();
	}, []);

	return (
		<aside className="resumen">
			<div className="contenedor__resumen">
				<div className="contenido__resumen">
					<p>Ahorro Total: </p>
					<p>Monto para gastos: </p>
					<p>Monto prestado: </p>
					<p>Inversión total:</p>
				</div>
				<div className="monto__resumen">
					<p>{montoAhorro}</p>
					<p>{montoGasto}</p>
					<p>{montoPrestamo}</p>
					<p>{montoInversion}</p>
				</div>
			</div>
		</aside>
	);
};
