import { useDispatch, useSelector } from 'react-redux';
import {
    onAddSaldoDisponibleA,
    onLoadAhorros,
    onLoadSaldoDisponibleA,
    onSubtractSaldoDisponibleA,
} from '../../store';
import { findAhorros, getSaldoDisponibleA, saveAhorro } from '../../services';
import { useSgahUi } from '../ui';
import { useToastMessage } from '../messages';

export const useSgahAhorroStore = () => {
    const dispatch = useDispatch();
    const { handleShowLoader } = useSgahUi();
    const { saldoDisponibleA, ahorros } = useSelector(
        (state) => state.sgahAhorro
    );

    const startSavingAhorro = async (formData) => {
        console.log('startSavingAhorro');

        try {
            const { status, data } = await saveAhorro(formData);

            return {
                code: status,
                message: data.mensaje,
            };
        } catch (error) {
            console.log(error);
            return {
                code: error.code,
                message: error?.response?.data?.mensaje,
            };
        }
    };

    const startLoadingAhorros = async () => {
        console.log('startLoadingAhorros');
        handleShowLoader(true);

        try {
            const {
                data: { ahorros },
            } = await findAhorros();
            dispatch(onLoadAhorros(ahorros));
        } catch (error) {
            useToastMessage(error.code);
        }

        handleShowLoader(false);
    };

    const startLoadingSaldoDisponibleA = async () => {
        console.log('startLoadingSaldoDisponibleA');
        const {
            data: { saldoDisponible },
        } = await getSaldoDisponibleA();
        dispatch(onLoadSaldoDisponibleA(saldoDisponible));
    };

    const startIncrementSaldoDisponibleA = (saldo) => {
        console.log('startIncrementSaldoDisponibleA');
        dispatch(onAddSaldoDisponibleA(saldo));
    };

    const startSubtractSaldoDisponibleA = (saldo) => {
        console.log('startSubtractSaldoDisponibleA');
        dispatch(onSubtractSaldoDisponibleA(saldo));
    };

    return {
        // * Propiedades
        saldoDisponibleA,
        ahorros,

        // * Metodos
        startSavingAhorro,
        startLoadingAhorros,
        startLoadingSaldoDisponibleA,
        startSubtractSaldoDisponibleA,
        startIncrementSaldoDisponibleA,
    };
};
