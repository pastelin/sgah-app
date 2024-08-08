import { useEffect } from 'react';
import { useIngresoPage } from '../pages/useIngresoPage';
import { useSgahGastoStore } from '../store';
import { useGastoUi } from '../ui';
import { useForm } from './useForm';
import Swal from 'sweetalert2';

const formDataGasto = {
    porcentaje: '',
    cdGasto: '',
    descripcion: '',
};

export const useGastoForm = () => {
    const { porcentaje, cdGasto, descripcion, onInputChange, onResetForm } =
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
        gastosRecurrentes,
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
                cdGasto,
            },
            descripcion,
            tipoMovimiento: {
                cdTipo: 1,
                nbTipo: 'Ingreso',
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
        cdGasto,
        descripcion,
        gastosRecurrentes,
        onInputChange,
        onSubmit,
        hasPermissionEditG,
    };
};
