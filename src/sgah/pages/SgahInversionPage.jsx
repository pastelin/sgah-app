import { useEffect } from 'react';
import { formatCurrency, useSgahInversionStore } from '../../hooks';
import { FormNewInversion, TableSgahInversion, FormUpdateInversion } from '../components';
import { useInversionUi } from '../../hooks/ui/useInversionUi';

export const SgahInversionPage = () => {
	const { saldoInvertido, startLoadingSaldoInvertido, startLoadingInversiones } =
        useSgahInversionStore();
    
    const { handleOpenNewForm } = useInversionUi();

	useEffect(() => {
		startLoadingSaldoInvertido();
		startLoadingInversiones();
	}, []);

    const handleOpenFormNewInversion = () => {
        handleOpenNewForm(true);
    };

	return (
		<>
			<aside className="contenedor__movimientos">
				<h2>Detalle Inversión</h2>

				<div className="contenedor__montos">
					<h3>
						Saldo Invertido: <span>{formatCurrency(saldoInvertido)}</span>
					</h3>
				</div>

				<div className="contenedor__boton">
					<button onClick={handleOpenFormNewInversion} className="btn button">
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
