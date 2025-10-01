import React from 'react';
import {
    LeadingActions,
    SwipeableList,
    SwipeableListItem,
	SwipeAction,
	TrailingActions,
} from 'react-swipeable-list';
import { AmountDisplay } from '../AmountDisplay';
import { useSgahAhorroStore } from '../../hooks';
import { formatDate } from '../../helpers';

export const SavingDetail = ({ saving }) => {
    const { startDeletingSaving, startUpdateCurrentEditingId } =
        useSgahAhorroStore();

    const handleSavingDeletion = async (id) => {
        // const { message } = await startDeletingSaving(id);
        // toast.error(message);
		//TODDO: Implementar eliminación de ahorro
		console.log('Eliminar ahorro con id:', id);
    };

    const leadingActions = () => (
        <LeadingActions>
            <SwipeAction onClick={() => startUpdateCurrentEditingId(1)}>
                Actualizar
            </SwipeAction>
        </LeadingActions>
    );

    const trailingActions = () => (
        <TrailingActions>
            <SwipeAction onClick={() => handleSavingDeletion(1)}>
                Eliminar
            </SwipeAction>
        </TrailingActions>
    );

    return (
        <SwipeableList>
            <SwipeableListItem
                maxSwipe={1}
                leadingActions={leadingActions()}
                trailingActions={trailingActions()}
            >
                <div className="bg-white shadow-lg p-5 w-full border-b border-gray-200 flex gap-5 items-center">
                    <div>
                        <img
                            src="/icons/savings.svg"
                            alt="icono ahorro"
                            className="w-10"
                        />
                    </div>
                    <div className="flex-1 space-y-2">
                        <p className="text-sm font-bold uppercase text-slate-500">
                            Ahorro
                        </p>
                        <p>{saving.descripcion}</p>
                        <p className="text-slate-600 text-sm">
                            {formatDate(saving.fechaCreacion)}
                        </p>
                    </div>

                    <AmountDisplay
                        amount={saving.monto}
                        isExpenseCategory={false}
                    />
                </div>
            </SwipeableListItem>
        </SwipeableList>
    );
};
