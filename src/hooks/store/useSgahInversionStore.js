import { useDispatch, useSelector } from 'react-redux';
import {
    onAddInversion,
    onIncrementSaldoInvertido,
    onLoadGruposFinancieros,
    onLoadInversion,
    onLoadInversiones,
    onLoadSaldoInvertido,
    onSubstractSaldoInvertido,
    onUpdateAddMontoInversion,
    onUpdateMontoInversion,
} from '../../store/sgah/sgahSliceInversion';
import { useSgahAhorroStore } from './useSgahAhorroStore';
import { formatCurrency } from '../useUtilities';
import {
    findAllI,
    findInversionByFolio,
    getGruposFinancieros,
    getSaldoInvertidoI,
    saveInversion,
    updateInversion,
} from '../../services';

export const useSgahInversionStore = () => {
    const dispatch = useDispatch();

    const { saldoInvertido, inversiones, inversion, gruposFinancieros } =
        useSelector((state) => state.sgahInversion);

    const {
        startLoadingSaldoDisponibleA,
        startIncrementSaldoDisponibleA,
        startSubtractSaldoDisponibleA,
        saldoDisponibleA,
    } = useSgahAhorroStore();

    const startLoadingSaldoInvertido = async () => {
        console.log('startLoadingSaldoInvertido');
        const { data } = await getSaldoInvertidoI();
        dispatch(onLoadSaldoInvertido(data));
    };

    const startLoadingInversiones = async () => {
        console.log('startLoadingInversiones');
        const { data } = await findAllI();
        dispatch(onLoadInversiones(data));
    };

    const startLoadingGruposFinancieros = async () => {
        console.log('startLoadingGruposFinancieros');
        const { data } = await getGruposFinancieros();
        dispatch(onLoadGruposFinancieros(data));
    };

    const startSavingInversion = async (formData) => {
        console.log('startSavingInversion');

        try {
            const { status, data } = await saveInversion(formData);

            startIncrementSaldoInvertido(data.inversion.monto);
            startSubtractSaldoDisponibleA(data.inversion.monto);

            let isInversionExist = false;

            for (let inversion of inversiones) {
                if (
                    inversion.nbAppInversion === data.inversion.nbAppInversion
                ) {
                    isInversionExist = true;
                }
            }

            if (isInversionExist) {
                dispatch(onUpdateAddMontoInversion(data.inversion));
            } else {
                dispatch(onAddInversion(data.inversion));
            }

            return {
                code: status,
                message: data.mensaje,
            };
        } catch (error) {
            console.log(error);
            return {
                code: error.code,
                message: error?.responese?.data?.mensaje,
            };
        }
    };

    const startUpdatingInversion = async (formData) => {
        console.log('startUpdatingInversion');

        try {
            const { status, data } = await updateInversion(formData);

            startSubtractSaldoInvertido(formData.monto);
            startIncrementSaldoDisponibleA(formatCurrency(formData.monto));

            dispatch(onUpdateMontoInversion(data.inversion));

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

    const startLoadingInversion = async (folio) => {
        console.log('startLoadingInversion');
        const { data } = await findInversionByFolio(folio);
        dispatch(onLoadInversion(data));
    };

    const startIncrementSaldoInvertido = (montoInvertido) => {
        console.log('startIncrementSaldoInvertido');
        dispatch(onIncrementSaldoInvertido(montoInvertido));
    };

    const startSubtractSaldoInvertido = (montoRetirado) => {
        console.log('startSubtractSaldoInvertido');
        dispatch(onSubstractSaldoInvertido(formatCurrency(montoRetirado)));
    };

    return {
        // * Propiedades
        saldoDisponibleA,
        saldoInvertido,
        inversiones,
        gruposFinancieros,
        inversion,

        // * Metodos
        startLoadingSaldoInvertido,
        startLoadingInversiones,
        startLoadingSaldoDisponibleA,
        startLoadingGruposFinancieros,
        startSavingInversion,
        startLoadingInversion,
        startUpdatingInversion,
    };
};
