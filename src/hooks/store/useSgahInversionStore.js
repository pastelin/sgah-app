import { useDispatch, useSelector } from 'react-redux';
import {
    onAddInversion,
    onIncrementSaldoInvertido,
    onLoadProductosFinancieros,
    onLoadInversion,
    onLoadInversiones,
    onLoadSaldoInvertido,
    onSubstractSaldoInvertido,
    onIncrementMontoInversion,
    onUpdateMontoInversion,
} from '../../store/sgah/sgahSliceInversion';
import { useSgahAhorroStore } from './useSgahAhorroStore';
import { formatCurrency } from '../useUtilities';
import {
    findAllI,
    findInversionByFolio,
    getProductosFinancieros,
    getSaldoInvertidoI,
    saveInversion,
    updateInversion,
} from '../../services';
import { useSgahUi } from '../ui';
import { usePrintMessage } from '../messages';

export const useSgahInversionStore = () => {
    const dispatch = useDispatch();

    const { saldoInvertido, inversiones, inversion, productosFinancieros } =
        useSelector((state) => state.sgahInversion);

    const { handleShowLoader } = useSgahUi();

    const {
        startLoadingSaldoDisponibleA,
        startIncrementSaldoDisponibleA,
        startSubtractSaldoDisponibleA,
        saldoDisponibleA,
    } = useSgahAhorroStore();

    const startLoadingSaldoInvertido = async () => {
        console.log('startLoadingSaldoInvertido');
        const {
            data: { saldoInvertido },
        } = await getSaldoInvertidoI();
        dispatch(onLoadSaldoInvertido(saldoInvertido));
    };

    const startLoadingInversiones = async () => {
        console.log('startLoadingInversiones');
        handleShowLoader(true);

        try {
            const {
                data: { inversiones },
            } = await findAllI();
            dispatch(onLoadInversiones(inversiones));
        } catch (error) {
            usePrintMessage(error.code);
        }

        handleShowLoader(false);
    };

    const startLoadingProductosFinancieros = async () => {
        console.log('startLoadingProductosFinancieros');
        const {
            data: { productosFinancieros },
        } = await getProductosFinancieros();
        dispatch(onLoadProductosFinancieros(productosFinancieros));
    };

    const startSavingInversion = async (formData) => {
        console.log('startSavingInversion');

        try {
            const { status, data } = await saveInversion(formData);
            const { mensaje, folio, fecha } = data;

            startIncrementSaldoInvertido(formData.monto);
            startSubtractSaldoDisponibleA(formData.monto);

            let isInversionExist = false;

            for (let inversion of inversiones) {
                if (
                    inversion?.productoFinanciero?.nbApp ===
                    formData.productoFinanciero.nbApp
                ) {
                    isInversionExist = true;
                }
            }

            if (isInversionExist) {
                dispatch(
                    onIncrementMontoInversion({
                        ...formData,
                        folio,
                        fechaCreacion: fecha,
                    })
                );
            } else {
                dispatch(
                    onAddInversion({ ...formData, folio, fechaCreacion: fecha })
                );
            }

            return {
                code: status,
                message: mensaje,
            };
        } catch (error) {
            return {
                code: error.code,
                message: error?.responese?.data?.mensaje,
            };
        }
    };

    const startUpdatingInversion = async (formData) => {
        console.log('startUpdatingInversion');

        try {
            const { status, data } = await updateInversion({ ...formData });
            const { mensaje, monto } = data;

            startSubtractSaldoInvertido(formData.monto);
            startIncrementSaldoDisponibleA(formData.monto);

            dispatch(onUpdateMontoInversion({ ...formData, monto }));

            return {
                code: status,
                message: mensaje,
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
        const {
            data: { inversion },
        } = await findInversionByFolio(folio);
        dispatch(onLoadInversion(inversion));
    };

    const startIncrementSaldoInvertido = (montoInvertido) => {
        console.log('startIncrementSaldoInvertido');
        dispatch(onIncrementSaldoInvertido(montoInvertido));
    };

    const startSubtractSaldoInvertido = (montoRetirado) => {
        console.log('startSubtractSaldoInvertido');
        dispatch(onSubstractSaldoInvertido(formatCurrency(montoRetirado)));
    };

    const getProductoFinancieroById = (cdApp) => {
        console.log('getProductosFinancieroById');

        return productosFinancieros.find(
            (productoFinanciero) => productoFinanciero.cdApp == cdApp
        );
    };

    return {
        // * Propiedades
        saldoDisponibleA,
        saldoInvertido,
        inversiones,
        productosFinancieros,
        inversion,

        // * Metodos
        startLoadingSaldoInvertido,
        startLoadingInversiones,
        startLoadingSaldoDisponibleA,
        startLoadingProductosFinancieros,
        startSavingInversion,
        startLoadingInversion,
        startUpdatingInversion,
        getProductoFinancieroById,
    };
};
