import { useEffect } from 'react';
import Swal from 'sweetalert2';

import {
    useAhorroUi,
    useForm,
    usePrintMessage,
    useSgahAhorroStore,
    useSgahIngresoStore,
} from '..';

const formDataAhorro = {
    porcentaje: '',
    descripcion: '',
};

export const useAhorroForm = () => {
    const { porcentaje, descripcion, onInputChange, onResetForm } =
        useForm(formDataAhorro);

    const {
        hasPermissionEdit: hasPermissionEditA,
        handleHasPermissionEdit: handleHasPermissionEditA,
    } = useAhorroUi();

    const {
        ingresos,
        availablePercentage,
        hasPermissionEdit,
        startUpdatingSaldoUtilizado,
        startUpdatingAvailablePercentage,
        handleHasPermissionEdit,
    } = useSgahIngresoStore();

    const { startSavingAhorro } = useSgahAhorroStore();

    useEffect(() => {
        if (availablePercentage === 0) {
            onResetForm();
            handleHasPermissionEditA(true);
        }
    }, [availablePercentage]);

    const onSubmit = async (event) => {
        event.preventDefault();

        if (porcentaje > availablePercentage) {
            Swal.fire(
                'Porcentaje inválido',
                'El porcentaje ingresado supera el porcentaje disponible',
                'error'
            );
            return;
        }

        const ingresoAhorro = ingresos * (porcentaje / 100);

        const { code, message } = await startSavingAhorro({
            monto: ingresoAhorro,
            descripcion,
        });

        usePrintMessage(code, message);

        if (code === 200 || code === 201) {
            startUpdatingSaldoUtilizado(ingresoAhorro);
            startUpdatingAvailablePercentage(porcentaje);
            !hasPermissionEdit || handleHasPermissionEdit(false);
            !hasPermissionEditA || handleHasPermissionEditA(false);
        }
    };

    return {
        porcentaje,
        descripcion,
        hasPermissionEditA,
        onInputChange,
        onSubmit,
    };
};
