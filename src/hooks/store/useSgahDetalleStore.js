import { useDispatch, useSelector } from 'react-redux';
import { sgahApi } from '../../backend';
import { updateResumen } from '../../store';

export const useSgahDetalleStore = () => {
    const dispatch = useDispatch();
    const { resumen } = useSelector((state) => state.sgahDetalle);

    const startDetalleResumen = async () => {
        console.log('startDetalleResumen');
        const { data } = await sgahApi.get('resumen/v0/resumen/detalle');

        dispatch(updateResumen(data));
    };

    return {
        // * Propiedades
        ...resumen,

        // * Metodos
        startDetalleResumen,
    };
};
