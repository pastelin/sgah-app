import { useDispatch, useSelector } from 'react-redux';
import { useCallback } from 'react';
import { updateResumen } from '../../store';
import { getResumenSaldos } from '../../services';

export const useSgahDetalleStore = () => {
    const dispatch = useDispatch();
    const resumen = useSelector((state) => state.sgahDetalle.resumen);

    const startDetalleResumen = useCallback(async () => {
        console.log('startDetalleResumen');
        try {
            const { data } = await getResumenSaldos();
            dispatch(updateResumen(data));
        } catch (error) {
            console.error('Error al obtener el resumen de saldos:', error);
        }
    }, []);

    return {
        resumen,
        startDetalleResumen,
    };
};
