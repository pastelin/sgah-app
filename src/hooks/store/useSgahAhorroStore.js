import { useDispatch, useSelector } from 'react-redux';
import {
    deleteSaving,
    hideSavingModal,
    onAddSaldoDisponibleA,
    onEditingSavingId,
    onLoadAhorros,
    onLoadSaldoDisponibleA,
    onSubtractSaldoDisponibleA,
    onUpdateAhorro,
    showSavingModal,
} from '../../store';
import {
    findAhorros,
    getSaldoDisponibleA,
    modifySaving,
    removeSaving,
    saveAhorro,
} from '../../services';
import { useSgahUi } from '../ui';
import { useToastMessage } from '../messages';

export const useSgahAhorroStore = () => {
    const dispatch = useDispatch();
    const { handleShowLoader } = useSgahUi();
    const { saldoDisponibleA, ahorros, editingSavingId, isSavingModalOpen } =
        useSelector((state) => state.sgahAhorro);

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

    const startUpdatingSaving = async (formData) => {
        console.log('startUpdateCurrentEditingId');
        try {
            const { status, data } = await modifySaving(formData);

            if (status === 200) {
                dispatch(
                    onUpdateAhorro({
                        ...data.ahorro,
                    })
                );
                return {
                    code: status,
                    message: data.mensaje,
                };
            }
        } catch (error) {
            console.log(error);
            return {
                code: error.code,
                message: error?.response?.data?.mensaje,
            };
        }
    };

    const handleDeleteSaving = async (id) => {
        console.log('handleDeleteSaving');
        try {
            const { status, data } = await removeSaving(id);

            if (status === 200) {
                dispatch(deleteSaving(id));
            }

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

    const updateEditingSavingId = (id) => {
        console.log('startUpdateCurrentEditingId');
        dispatch(onEditingSavingId(id));
        dispatch(showSavingModal(true));
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

    const closeSavingModal = () => {
        dispatch(hideSavingModal(false));
    };

    const openSavingModal = () => {
        dispatch(showSavingModal(true));
    };

    return {
        // * Propiedades
        saldoDisponibleA,
        ahorros,
        isSavingModalOpen,
        editingSavingId,

        // * Metodos
        startSavingAhorro,
        startLoadingAhorros,
        startLoadingSaldoDisponibleA,
        startSubtractSaldoDisponibleA,
        startIncrementSaldoDisponibleA,
        handleDeleteSaving,
        updateEditingSavingId,
        startUpdatingSaving,
        openSavingModal,
        closeSavingModal,
    };
};
