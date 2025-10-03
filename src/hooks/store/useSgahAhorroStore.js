import { useDispatch, useSelector } from 'react-redux';
import {
    savingDelete,
    savingHideModal,
    savingIncreaseAvailableBalance,
    savingSetActiveId,
    savingLoadAll,
    savingLoadAvailableBalance,
    savingDecreaseAvailableBalance,
    savingUpdate,
    savingShowModal,
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
    const { availableBalance, savings, activeSavingId, isSavingModalOpen } =
        useSelector((state) => state.sgahAhorro);

    const startSaving = async (formData) => {
        console.log('startSaving');

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
        console.log('startUpdatingSaving');
        try {
            const { status, data } = await modifySaving(formData);

            if (status === 200) {
                dispatch(
                    savingUpdate({
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
                dispatch(savingDelete(id));
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

    const setActiveSavingId = (id) => {
        console.log('setActiveSavingId');
        dispatch(savingSetActiveId(id));
        dispatch(savingShowModal(true));
    };

    const startLoadingSavings = async () => {
        console.log('startLoadingSavings');
        handleShowLoader(true);

        try {
            const {
                data: { ahorros },
            } = await findAhorros();
            console.log({ ahorros });
            dispatch(savingLoadAll(ahorros));
        } catch (error) {
            useToastMessage(error.code);
        }

        handleShowLoader(false);
    };

    const startLoadingAvailableBalance = async () => {
        console.log('startLoadingAvailableBalance');
        const {
            data: { saldoDisponible },
        } = await getSaldoDisponibleA();
        dispatch(savingLoadAvailableBalance(saldoDisponible));
    };

    const increaseAvailableBalance = (balance) => {
        console.log('increaseAvailableBalance');
        dispatch(savingIncreaseAvailableBalance(balance));
    };

    const decreaseAvailableBalance = (balance) => {
        console.log('decreaseAvailableBalance');
        dispatch(savingDecreaseAvailableBalance(balance));
    };

    const closeSavingModal = () => {
        dispatch(savingHideModal(false));
    };

    const openSavingModal = () => {
        dispatch(savingShowModal(true));
    };

    return {
        // * Propiedades
    availableBalance,
    savings,
    isSavingModalOpen,
    activeSavingId,

    // * Methods
    startSaving,
    startLoadingSavings,
    startLoadingAvailableBalance,
    decreaseAvailableBalance,
    increaseAvailableBalance,
    handleDeleteSaving,
    setActiveSavingId,
    startUpdatingSaving,
    openSavingModal,
    closeSavingModal,
    };
};
