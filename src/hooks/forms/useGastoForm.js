import { useEffect } from 'react';
import { useIngresoPage } from '../pages/useIngresoPage';
import { useSgahGastoStore } from '../store';
import { useGastoUi } from '../ui';
import { useForm } from '../useForm';
import { usePrintMessage } from '../usePrintMessage';
import Swal from 'sweetalert2';

const formDataGasto = {
    porcentaje: '',
    cdGastoRecurrente: '',
    descripcion: '',
    cdTipoMovimiento: 1,
};

export const useGastoForm = () => {
    const {
        porcentaje,
        cdGastoRecurrente,
        descripcion,
        cdTipoMovimiento,
        onInputChange,
        onResetForm,
    } = useForm(formDataGasto);

    const {
        hasPermissionEdit: hasPermissionEditG,
        handleHasPermissionEdit: handleHasPermissionEditG,
    } = useGastoUi();

    const {
        ingresos,
        availablePercentage,
        hasPermissionEdit,
        startUpdatingSaldoUtilizado,
        startUpdatingAvailablePercentage,
        handleHasPermissionEdit,
    } = useIngresoPage();

    const { startSavingGasto, categoriasGasto, startLoadingCategoriasGasto } =
        useSgahGastoStore();

    useEffect(() => {
        if (!categoriasGasto || categoriasGasto.length <= 1) {
            startLoadingCategoriasGasto();
        }
    }, []);

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

        const { code, message } = await startSavingGasto({
            monto: ingresoGasto,
            cdGastoRecurrente,
            descripcion,
            cdTipoMovimiento,
        });

        usePrintMessage(code, message);

        if (code === 200 || code === 201) {
            startUpdatingSaldoUtilizado(ingresoGasto);
            startUpdatingAvailablePercentage(porcentaje);
            !hasPermissionEdit || handleHasPermissionEdit(false);
            !hasPermissionEditG || handleHasPermissionEditG(false);
        }
    };

    return {
        porcentaje,
        cdGastoRecurrente,
        descripcion,
        categoriasGasto,
        onInputChange,
        onSubmit,
        hasPermissionEditG,
    };
};
