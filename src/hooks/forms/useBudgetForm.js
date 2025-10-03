import { useEffect, useCallback } from 'react';

import {
    useForm,
    useToastMessage,
    useSgahAhorroStore,
    useBudgetStore,
    useSgahGastoStore,
    useSgahPrestamoStore,
} from '..';

const formDataBudget = {
    porcentaje: '',
    descripcion: '',
};

export const useBudgetForm = () => {
    const { porcentaje, descripcion, onInputChange, onResetForm } =
        useForm(formDataBudget);

    const { ingresos, availablePercentage, updateState } = useBudgetStore();

    const { startSaving } = useSgahAhorroStore();
    const { startSavingExpense } = useSgahGastoStore();
    const { startSavingPrestamoByBudget } = useSgahPrestamoStore();

    // Reset form when available percentage is zero
    useEffect(() => {
        if (availablePercentage === 0) {
            onResetForm();
        }
    }, [availablePercentage, onResetForm]);

    // Generic save handler to reduce code duplication
    const handleSave = useCallback(
        async (type) => {
            const ingreso = ingresos * (porcentaje / 100);
            const payload = {
                ...(type === 'ahorro' && {
                    monto: ingreso,
                    fechaCreacion: new Date(),
                }),
                descripcion,
                ...(type === 'gasto' && {
                    amount: ingreso,
                    monto: ingreso,
                    gastoRecurrente: { cdGasto: 18 },
                    origenMovimiento: { id: 1 },
                    creationDate: new Date(),
                }),
                ...(type === 'prestamo' && {
                    origenMovimiento: { id: 1 },
                    saldoPrestado: ingreso,
                }),
            };

            console.log('Payload to save:', payload);
            const saveFunction =
                type === 'ahorro'
                    ? startSaving
                    : type === 'prestamo'
                    ? startSavingPrestamoByBudget
                    : startSavingExpense;

            if (!saveFunction) {
                console.warn('Unhandled save type:', type);
                return;
            }

            const { code, message } = await saveFunction(payload);

            useToastMessage(code, message);

            if (code === 200 || code === 201) {
                updateState('saldoUtilizado', ingreso);
                updateState('availablePercentage', porcentaje);
                onResetForm();
            }
        },
        [
            ingresos,
            porcentaje,
            descripcion,
            startSaving,
            startSavingExpense,
            updateState,
            onResetForm,
        ]
    );

    // Submit handler to determine save type
    const onSubmit = useCallback(
        async (event, activeTab) => {
            event.preventDefault();

            if (!ingresos || ingresos === 0) {
                useToastMessage(
                    'ERR',
                    'Fondos insuficientes para realizar esta acción'
                );
                return;
            }

            if (porcentaje > availablePercentage) {
                useToastMessage(
                    'ERR',
                    'El porcentaje ingresado supera el porcentaje disponible'
                );
                return;
            }

            await handleSave(activeTab);
        },
        [ingresos, porcentaje, availablePercentage, handleSave]
    );

    return {
        porcentaje,
        descripcion,
        onInputChange,
        onSubmit,
    };
};
