import { useEffect } from 'react';
import { formatCurrency, useSgahAhorroStore } from '../../hooks';
import { TableSgahAhorro } from '../components/TableSgahAhorro';

export const SgahAhorrosPage = () => {
	const { startLoadingAhorros, startLoadingSaldoDisponibleA, saldoDisponible } =
		useSgahAhorroStore();

	useEffect(() => {
		startLoadingAhorros();
		startLoadingSaldoDisponibleA();
	}, []);

	return (
		<>
			<aside className="contenedor__movimientos">
				<h2>Detalle Ahorros</h2>

				<div className="contenedor__montos">
					<h3>
						Saldo Disponible: <span>{formatCurrency(saldoDisponible)}</span>
					</h3>
				</div>

				<TableSgahAhorro />
			</aside>
		</>
	);
};
