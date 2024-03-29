import { useDispatch, useSelector } from 'react-redux';
import { updateResumen } from '../../store';
import { getResumenSaldos } from '../../services';

export const useSgahDetalleStore = () => {
    const dispatch = useDispatch();
    const { resumen } = useSelector((state) => state.sgahDetalle);

    const startDetalleResumen = async () => {
        console.log('startDetalleResumen');
        const { data } = await getResumenSaldos();

        dispatch(updateResumen(data));
    };

    return {
        // * Propiedades
        ...resumen,

        // * Metodos
        startDetalleResumen,
    };
};
