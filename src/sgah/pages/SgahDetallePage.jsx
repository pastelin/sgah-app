import { useEffect } from 'react';
import { useSgahStore } from '../../hooks';

export const SgahResumenPage = () => {
	const { montoAhorro, montoGasto, montoInversion, montoPrestamo, startDetalleResumen } =
		useSgahStore();

	useEffect(() => {
		startDetalleResumen();
	}, []);

	return (
		<aside className="detalle flex-responsive-column center-x-y">
			<h2>Detalle de Montos</h2>
			<div className="contenedor-detalle">
				<div className="detalle-label">
					<p>Ahorro Total: </p>
					<p>Monto para gastos: </p>
					<p>Monto prestado: </p>
					<p>Inversión total:</p>
				</div>
				<div className="montos">
					<p>{montoAhorro}</p>
					<p>{montoGasto}</p>
					<p>{montoPrestamo}</p>
					<p>{montoInversion}</p>
				</div>
			</div>
		</aside>
	);
};
