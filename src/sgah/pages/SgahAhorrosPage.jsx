import { useEffect } from 'react';
import { formatCurrency, useSgahAhorroStore } from '../../hooks';
import { TableSgahAhorro } from '../components';

export const SgahAhorrosPage = () => {
	const { startLoadingAhorros, startLoadingSaldoDisponibleA, saldoDisponibleA } =
		useSgahAhorroStore();

	useEffect(() => {
		startLoadingAhorros();
		startLoadingSaldoDisponibleA();
	}, []);

	return (
		<>
			<aside className="contenedor-aside">
				<h2>Detalle Ahorros</h2>

				<div className="contenedor-saldo text-center">
					<p>
						Saldo Disponible: <span>{formatCurrency(saldoDisponibleA)}</span>
					</p>
				</div>

				<TableSgahAhorro />
			</aside>
		</>
	);
};
