import { useDispatch, useSelector } from 'react-redux';
import { startDetalle } from '../../store/sgah/thunks';

export const SgahResumenPage = () => {
	const { resumen } = useSelector((state) => state.sgah);
    const { montoAhorro, montoGasto, montoInversion, montoPrestamo } = resumen;
    
    const dispatch = useDispatch();

    dispatch(startDetalle());

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
