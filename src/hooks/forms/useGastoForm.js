import { useEffect } from 'react';
import { useIngresoPage } from '../pages/useIngresoPage';
import { useSgahGastoStore } from '../store';
import { useGastoUi } from '../ui';
import { useForm } from './useForm';
import Swal from 'sweetalert2';

const formDataGasto = {
    porcentaje: '',
    descripcion: '',
};

export const useGastoForm = () => {
    const { porcentaje, descripcion, onInputChange, onResetForm } =
        useForm(formDataGasto);

    const {
        hasPermissionEdit: hasPermissionEditG,
        handleHasPermissionEdit: handleHasPermissionEditG,
    } = useGastoUi();

    const {
        ingresos,
        availablePercentage,
        hasPermissionEdit,
        handleHasPermissionEdit,
        updateState,
    } = useIngresoPage();

    const {
        startSavingGasto,
    } = useSgahGastoStore();

    useEffect(() => {
        if (availablePercentage === 0) {
            onResetForm();
            handleHasPermissionEditG(true);
        }
    }, [availablePercentage]);

    const onSubmit = async (event) => {
        event.preventDefault();

        if (porcentaje > availablePercentage) {
            Swal.fire(
                'Porcentaje inválido',
                `El porcentaje ingresado supera el porcentaje disponible`,
                'error'
            );
            return;
        }

        const ingresoGasto = ingresos * (porcentaje / 100);
        const { code } = await startSavingGasto({
            monto: ingresoGasto,
            gastoRecurrente: {
                cdGasto: 18,
            },
            descripcion,
            origenMovimiento: {
                id: 1,
            },
        });

        if (code === 200 || code === 201) {
            updateState('saldoUtilizado', ingresoGasto);
            updateState('availablePercentage', porcentaje);
            hasPermissionEdit && handleHasPermissionEdit(false);
            hasPermissionEditG && handleHasPermissionEditG(false);
        }
    };

    return {
        porcentaje,
        descripcion,
        onInputChange,
        onSubmit,
        hasPermissionEditG,
    };
};
