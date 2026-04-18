import { useEffect, useMemo, useState } from 'react';
import {
    useForm,
    usePrestamoUi,
    useSgahAhorroStore,
    useSgahPrestamoStore,
    useToastMessage,
} from '../../hooks';
import { BalanceDetail } from '../BalanceDetail';
import { ErrorMessage } from '../alerts';

const formData = {
    saldoPrestado: '',
    descripcion: '',
};

export const FormNewPrestamo = () => {
    // A hook to access the redux store's state. This hook takes a selector function as an argument.
    // The selector is called with the store state.
    const { saveLoanFromExpense, currentEditingId, setModalVisibility, loans, balanceRemainingG, processLoanUpdate } =
        useSgahPrestamoStore();

    const [error, setError] = useState('');
    const [payFullDebt, setPayFullDebt] = useState(false);

    const { startLoadingAvailableBalance, availableBalance } =
        useSgahAhorroStore();

    useEffect(() => {
        startLoadingAvailableBalance();
    }, []);

    const currentLoan = useMemo(
        () => loans.find((loan) => loan.folio === currentEditingId),
        [loans, currentEditingId],
    );

    const initialForm = useMemo(
        () => ({
            ...formData,
            descripcion: currentLoan?.descripcion ?? '',
        }),
        [currentLoan?.descripcion]
    );

    const {
        formState,
        saldoPrestado,
        descripcion,
        onInputChange,
        onResetForm,
    } = useForm(
        initialForm
    );

    console.log('currentLoan:', currentLoan);

    const onSubmit = async (event) => {
        event.preventDefault();

        if (currentLoan) {
            // Si payFullDebt es true, usar el monto total de la deuda
            const montoAPagar = payFullDebt 
                ? currentLoan.saldoPrestado - currentLoan.saldoPagado 
                : saldoPrestado;

            if (!payFullDebt && !saldoPrestado) {
                setError('Debes ingresar un monto o marcar "Pagar deuda completa"');
                return;
            }

            if (montoAPagar > currentLoan.saldoPrestado - currentLoan.saldoPagado) {
                Swal.fire(
                    'El monto no debe ser mayor a la deuda actual',
                    '',
                    'error'
                );
                return;
            }

            if (montoAPagar > balanceRemainingG) {
                Swal.fire(
                    'El monto no debe ser mayor al saldo disponible',
                    '',
                    'error'
                );
                return;
            }

            const { code, message } = await processLoanUpdate({
                ...currentLoan,
                descripcion,
                saldoPagado: montoAPagar,
            });

            useToastMessage(code, message);

            if (code === 200) {
                setModalVisibility(false);
                onResetForm();
                setPayFullDebt(false);
            }
        } else {
            if (!saldoPrestado) {
                setError('Todos los campos son obligatorios');
                return;
            }

            if (!descripcion) {
                setError('Todos los campos son obligatorios');
                return;
            }

            if (saldoPrestado > availableBalance) {
                setError(
                    'El monto solicitado excede el saldo disponible para préstamos',
                );
                return;
            }

            const { code, message } = await saveLoanFromExpense({
                saldoPrestado,
                descripcion,
                origenMovimiento: { id: 2 },
            });
            useToastMessage(code, message);

            if (code === 200) {
                setModalVisibility(false);
                onResetForm();
            }
        }
    };

    return (
        <form
            className="space-y-6 p-6 bg-gradient-to-br from-white to-gray-50 rounded-xl shadow-lg"
            onSubmit={onSubmit}
        >
            <div className="text-center space-y-2">
                <h2 className="text-2xl font-bold text-gray-800 opacity-70">
                    {currentEditingId ? 'Editar Préstamo' : 'Nuevo Préstamo'}
                </h2>
                <p className="text-sm text-gray-500">
                    Complete los datos para{' '}
                    {currentEditingId ? 'editar' : 'registrar'} el préstamo
                </p>
            </div>

            <div className="space-y-3">

                {
                    !currentLoan && (
                        <div className="bg-gradient-to-r from-blue-50 via-cyan-50 to-blue-50 border-l-4 border-blue-500 p-5 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
                            <div className="flex items-center gap-2 mb-2">
                                <svg
                                    className="w-5 h-5 text-blue-600"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"
                                    />
                                </svg>
                                <span className="text-xs font-semibold text-blue-700 uppercase tracking-wide">
                                    Disponible para prestar
                                </span>
                            </div>
                            <BalanceDetail
                                label="Saldo disponible"
                                balance={availableBalance}
                                containerClassName="text-lg font-semibold"
                                labelClassName="text-blue-800 text-base font-medium"
                                amountClassName="text-blue-700 text-2xl font-extrabold tracking-tight"
                            />
                            <div className="mt-3 pt-3 border-t border-blue-200">
                                <p className="text-xs text-gray-600 flex items-center gap-1">
                                    <svg
                                        className="w-3.5 h-3.5 text-green-600"
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                    <span>Fondos disponibles de tus ahorros</span>
                                </p>
                            </div>
                        </div>
                    )
                }

                {currentLoan && (
                    <>
                        <div className="bg-gradient-to-r from-blue-50 via-cyan-50 to-blue-50 border-l-4 border-blue-500 p-5 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
                            <div className="flex items-center gap-2 mb-2">
                                <svg
                                    className="w-5 h-5 text-blue-600"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"
                                    />
                                </svg>
                                <span className="text-xs font-semibold text-blue-700 uppercase tracking-wide">
                                    Disponible para pagar tu deuda
                                </span>
                            </div>
                            <BalanceDetail
                                label="Saldo disponible"
                                balance={balanceRemainingG}
                                containerClassName="text-lg font-semibold"
                                labelClassName="text-blue-800 text-base font-medium"
                                amountClassName="text-blue-700 text-2xl font-extrabold tracking-tight"
                            />
                            <div className="mt-3 pt-3 border-t border-blue-200">
                                <p className="text-xs text-gray-600 flex items-center gap-1">
                                    <svg
                                        className="w-3.5 h-3.5 text-green-600"
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                    <span>Fondos disponibles de tus gastos</span>
                                </p>
                            </div>
                        </div>

                        <div className="bg-gradient-to-r from-red-50 to-orange-50 border-l-4 border-red-500 p-4 rounded-lg shadow-md">
                            <div className="flex items-center gap-2 mb-2">
                                <svg
                                    className="w-5 h-5 text-red-600"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                                    />
                                </svg>
                                <span className="text-xs font-semibold text-red-700 uppercase tracking-wide">
                                    Préstamo Activo
                                </span>
                            </div>
                            <BalanceDetail
                                label="Deuda Actual"
                                balance={
                                    currentLoan.saldoPrestado -
                                    currentLoan.saldoPagado
                                }
                                containerClassName="text-lg font-semibold"
                                labelClassName="text-red-700 text-sm font-medium"
                                amountClassName="text-red-600 text-xl font-bold"
                            />
                            <div className="mt-3 pt-3 border-t border-red-200">
                                <div className="flex justify-between text-xs text-gray-600">
                                    <span>Monto prestado:</span>
                                    <span className="font-semibold">
                                        $
                                        {currentLoan.saldoPrestado.toLocaleString()}
                                    </span>
                                </div>
                                <div className="flex justify-between text-xs text-gray-600 mt-1">
                                    <span>Pagado:</span>
                                    <span className="font-semibold text-green-600">
                                        ${currentLoan.saldoPagado.toLocaleString()}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </>
                )}
            </div>

            {error && <ErrorMessage>{error}</ErrorMessage>}

            {currentLoan && (
                <div className="bg-gradient-to-r from-purple-50 to-pink-50 border-l-4 border-purple-500 p-4 rounded-lg shadow-md">
                    <label className="flex items-center gap-3 cursor-pointer">
                        <input
                            type="checkbox"
                            checked={payFullDebt}
                            onChange={(e) => {
                                setPayFullDebt(e.target.checked);
                                setError('');
                            }}
                            className="w-5 h-5 text-purple-600 rounded focus:ring-2 focus:ring-purple-500"
                        />
                        <div className="flex-1">
                            <span className="text-base font-semibold text-gray-700">
                                Pagar deuda completa
                            </span>
                            <p className="text-xs text-gray-600 mt-1">
                                ${(currentLoan.saldoPrestado - currentLoan.saldoPagado).toLocaleString()}
                            </p>
                        </div>
                    </label>
                </div>
            )}

            <div className="flex flex-col gap-3">
                <label
                    htmlFor="saldoPrestado"
                    className="text-base font-semibold text-gray-700 flex items-center gap-2"
                >
                    <svg
                        className="w-5 h-5 text-gray-500"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                    </svg>
                    {
                        currentLoan ? 'Monto a pagar' : 'Monto del préstamo'
                    }

                </label>
                <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 font-bold">
                        $
                    </span>
                    <input
                        type="number"
                        name="saldoPrestado"
                        id="saldoPrestado"
                        placeholder="500"
                        disabled={payFullDebt}
                        className={`w-full pl-8 pr-4 py-3 bg-white border-2 rounded-lg transition-all outline-none text-lg font-medium ${
                            payFullDebt 
                                ? 'border-gray-200 bg-gray-50 text-gray-400 cursor-not-allowed' 
                                : 'border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200'
                        }`}
                        value={payFullDebt ? (currentLoan?.saldoPrestado - currentLoan?.saldoPagado) || '' : saldoPrestado}
                        onChange={onInputChange}
                        min="1"
                        max={currentLoan ? balanceRemainingG : availableBalance}
                    />
                </div>
                <p className="text-xs text-gray-800 italic">
                    {payFullDebt 
                        ? `Pagarás: $${(currentLoan?.saldoPrestado - currentLoan?.saldoPagado).toLocaleString()}` 
                        : `Máximo: $${currentLoan ? balanceRemainingG.toLocaleString() : availableBalance.toLocaleString()}`
                    }
                </p>
            </div>

            <div className="flex flex-col gap-3">
                <label
                    htmlFor="descripcion"
                    className="text-base font-semibold text-gray-700 flex items-center gap-2"
                >
                    <svg
                        className="w-5 h-5 text-gray-500"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                        />
                    </svg>
                    Descripción del préstamo
                </label>
                <textarea
                    name="descripcion"
                    id="descripcion"
                    value={descripcion}
                    onChange={onInputChange}
                    placeholder='Ej: "Préstamo para compra de libros universitarios"'
                    className="w-full px-4 py-3 bg-white border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all outline-none resize-none h-28 text-base"
                    maxLength="200"
                ></textarea>
                <p className="text-xs text-gray-500 text-right">
                    {descripcion.length}/200 caracteres
                </p>
            </div>

            <button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-bold py-4 px-6 rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 flex items-center justify-center gap-2 text-lg"
            >
                <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                    />
                </svg>
                {currentEditingId ? 'Guardar Cambios' : 'Registrar Préstamo'}
            </button>
        </form >
    );
};
