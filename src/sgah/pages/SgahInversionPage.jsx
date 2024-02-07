import { useEffect } from 'react';
import { formatCurrency, useSgahInversionStore } from '../../hooks';
import { FormNewInversion, TableSgahInversion, FormUpdateInversion } from '../components';
import { useInversionUi } from '../../hooks/ui/useInversionUi';

export const SgahInversionPage = () => {
	const { saldoInvertido, startLoadingSaldoInvertido, startLoadingInversiones } =
        useSgahInversionStore();
    
    const { handleOpenNewFormInversion } = useInversionUi();

	useEffect(() => {
		startLoadingSaldoInvertido();
		startLoadingInversiones();
	}, []);

    const handleOpenFormNewInversion = () => {
        handleOpenNewFormInversion(true);
    };

	return (
		<>
			<aside className="contenedor-aside">
				<h2>Detalle Inversión</h2>

				<div className="contenedor-saldo text-center">
					<p>
						Saldo Invertido: <span>{formatCurrency(saldoInvertido)}</span>
					</p>
				</div>

				<div className="text-center mt-2">
					<button className="btn btn-submit btn-xl" onClick={handleOpenFormNewInversion}>
						Agregar Inversión
					</button>
				</div>

				<TableSgahInversion />
			</aside>

			<FormNewInversion />
			<FormUpdateInversion />
		</>
	);
};
