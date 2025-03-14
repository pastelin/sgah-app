import {
    LeadingActions,
    SwipeableList,
    SwipeableListItem,
    SwipeAction,
    TrailingActions,
} from 'react-swipeable-list';
import { formatDate } from '../../helpers';
import { AmountDisplay } from '../AmountDisplay';
import PropTypes from 'prop-types';
import 'react-swipeable-list/dist/styles.css';
import { useSgahGastoStore } from '../../hooks';

export const ExpenseDetail = ({ expense }) => {

    const {startDeletingExpense, startUpdateCurrentEditingId} = useSgahGastoStore();


    const leadingActions = () => (
        <LeadingActions>
            <SwipeAction onClick={() => startUpdateCurrentEditingId(expense.id)}>
                Actualizar
            </SwipeAction>
        </LeadingActions>
    );

    const trailingActions = () => (
        <TrailingActions>
            <SwipeAction onClick={() => startDeletingExpense(expense.id)}>
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
                            src={`/icono_${expense.gastoRecurrente.cdGasto}.svg`}
                            alt="icono gasto"
                            className="w-10"
                        />
                    </div>
                    <div className="flex-1 space-y-2">
                        <p className="text-sm font-bold uppercase text-slate-500">
                            {expense.gastoRecurrente.nbGasto}
                        </p>
                        <p>{expense.descripcion}</p>
                        <p className="text-slate-600 text-sm">
                            {formatDate(expense.creationDate)}
                        </p>
                    </div>

                    <AmountDisplay
                        amount={expense.amount}
                        isExpenseCategory={expense.origenMovimiento.id === 2}
                    />
                </div>
            </SwipeableListItem>
        </SwipeableList>
    );
};

ExpenseDetail.propTypes = {
    expense: PropTypes.shape({
        gastoRecurrente: PropTypes.shape({
            nbGasto: PropTypes.string.isRequired,
            cdGasto: PropTypes.number.isRequired,
        }).isRequired,
        descripcion: PropTypes.string.isRequired,
        creationDate: PropTypes.string.isRequired,
        amount: PropTypes.number.isRequired,
        origenMovimiento: PropTypes.shape({
            id: PropTypes.number.isRequired,
        }),
    }).isRequired,
};
