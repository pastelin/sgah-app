import React from 'react';
import {
    LeadingActions,
    SwipeableList,
    SwipeableListItem,
    SwipeAction,
    TrailingActions,
} from 'react-swipeable-list';
import { AmountDisplay } from '../AmountDisplay';
import { formatDate } from '../../helpers';
import { useSgahPrestamoStore } from '../../hooks';

export const LoanDetail = ({ loan }) => {
    const paymentPercentage = Math.round(
        (loan.saldoPagado / loan.saldoPrestado) * 100
    );
    const isFullyPaid = paymentPercentage >= 100;

    const {setCurrentEditingId} = useSgahPrestamoStore();

    const getStatusConfig = () => {
        if (isFullyPaid) {
            return {
                color: 'bg-emerald-500',
                borderColor: 'border-l-emerald-400',
                text: 'Pagado',
                textColor: 'text-emerald-400',
            };
        } else if (paymentPercentage > 50) {
            return {
                color: 'bg-amber-500',
                borderColor: 'border-l-amber-400',
                text: 'En Progreso',
                textColor: 'text-amber-400',
            };
        } else {
            return {
                color: 'bg-rose-500',
                borderColor: 'border-l-rose-400',
                text: 'Activo',
                textColor: 'text-rose-400',
            };
        }
    };

    const status = getStatusConfig();

    const leadingActions = () => (
        <LeadingActions>
            <SwipeAction onClick={() => setCurrentEditingId(loan.folio)}>
                Actualizar
            </SwipeAction>
        </LeadingActions>
    );

    const trailingActions = () => (
        <TrailingActions>
            <SwipeAction onClick={() => setCurrentEditingId(loan.folio)}>
                Actualizar
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
                <div
                    className={`bg-white hover:bg-gradient-to-r hover:from-white hover:to-gray-50 shadow-md hover:shadow-xl transition-all duration-300 p-6 w-full border-l-4 ${status.borderColor} rounded-xl mb-4`}
                >
                    <div className="flex gap-6 items-start">
                        <div className="flex-shrink-0">
                            <div className="flex flex-col items-center gap-3 min-w-[90px] bg-gradient-to-b from-gray-50 to-gray-100 p-4 rounded-xl shadow-sm">
                                <div
                                    className={`${status.color} text-white text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-wider shadow-md`}
                                >
                                    {status.text}
                                </div>
                                <div className="text-center">
                                    <div
                                        className={`text-3xl font-extrabold ${status.textColor} drop-shadow-sm`}
                                    >
                                        {paymentPercentage}%
                                    </div>
                                    <div className="text-xs text-gray-500 font-medium mt-1">
                                        Completado
                                    </div>
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-2.5 mt-1 shadow-inner">
                                    <div
                                        className={`${status.color} h-2.5 rounded-full transition-all duration-500 shadow-sm`}
                                        style={{
                                            width: `${Math.min(
                                                paymentPercentage,
                                                100
                                            )}%`,
                                        }}
                                    ></div>
                                </div>
                            </div>
                        </div>

                        <div className="flex-1 space-y-4">
                            <div>
                                <p
                                    className={`text-xs font-bold uppercase ${status.textColor} tracking-wider mb-2`}
                                >
                                    Préstamo
                                </p>
                                <p className="text-xl font-semibold text-gray-900 leading-tight">
                                    {loan.descripcion}
                                </p>
                                <div className="flex items-center gap-2 mt-2 text-slate-500">
                                    <svg
                                        className="w-4 h-4 text-slate-400"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                                        />
                                    </svg>
                                    <span className="text-sm font-medium">
                                        {formatDate(loan.fechaCreacion)}
                                    </span>
                                </div>
                            </div>

                            <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-5 rounded-xl shadow-sm border border-gray-200 space-y-3">
                                <AmountDisplay
                                    amount={loan.saldoPrestado}
                                    isExpenseCategory={true}
                                    label="Total Prestado"
                                    containerClassName="text-base font-semibold"
                                    labelClassName="text-gray-500 text-xs uppercase tracking-wider font-bold"
                                    showNegativeSign={false}
                                />

                                <div className="border-t border-dashed border-gray-300"></div>

                                <AmountDisplay
                                    amount={loan.saldoPagado}
                                    isExpenseCategory={false}
                                    label="Total Pagado"
                                    containerClassName="text-base font-semibold"
                                    labelClassName="text-gray-500 text-xs uppercase tracking-wider font-bold"
                                    amountClassName="font-bold text-emerald-600"
                                />

                                <div className="border-t border-dashed border-gray-300"></div>

                                <div className="bg-white p-3 rounded-lg shadow-sm">
                                    <AmountDisplay
                                        amount={
                                            loan.saldoPrestado -
                                            loan.saldoPagado
                                        }
                                        isExpenseCategory={true}
                                        label="Saldo Pendiente"
                                        containerClassName="text-lg font-bold"
                                        labelClassName="text-gray-600 text-xs uppercase tracking-wider font-bold"
                                        amountClassName={`font-black ${status.textColor} text-2xl`}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </SwipeableListItem>
        </SwipeableList>
    );
};
