import { useEffect, useState, useCallback } from 'react';
import { formatCurrency, useSgahUi } from '../hooks';
import { CircularProgress, LoaderComponent } from '../components';
import { BudgetForm } from '../components/forms/BudgetForm';
import { useBudgetStore } from '../hooks/store/useBudgetStore';

export const SgahIngresosPage = () => {
    const {
        ingresos,
        availablePercentage,
        saldoUtilizado,
        handleResetInitialState,
        updateState,
    } = useBudgetStore();

    const [isInputActive, setIsInputActive] = useState(true);
    const [activeTab, setActiveTab] = useState('ahorro');
    const { isShowLoader } = useSgahUi();

    // Maneja el cambio de valor en el input de ingresos
    const onInputChangeIngresos = useCallback(
        ({ target: { value } }) => {
            const parsedValue = value ? parseInt(value, 10) : '';
            if (!isNaN(parsedValue)) {
                updateState('ingresos', parsedValue);
            }
        },
        [updateState]
    );

    // Resetea el estado inicial si el porcentaje disponible es 0
    useEffect(() => {
        if (availablePercentage === 0) {
            handleResetInitialState();
            setIsInputActive(true);
        }
    }, [availablePercentage, handleResetInitialState]);

    // Cambia la pestaña activa
    const showTab = useCallback((e) => {
        const targetId = e.target.textContent.toLowerCase();
        setActiveTab(targetId);
    }, []);

    return (
        <aside className="contenedor-aside">
            <h2>Registrar Ingresos</h2>

            {/* Input para ingresos */}
            <div className="max-w-md m-auto flex-responsive-row justify-center align-end">
                <div className="form__group">
                    <label htmlFor="ingresos">Monto del Ingreso:</label>
                    <input
                        type="number"
                        id="ingresos"
                        value={ingresos}
                        onChange={onInputChangeIngresos}
                        required
                        disabled={!isInputActive}
                        placeholder="$ 0"
                    />
                </div>
            </div>

            {ingresos > 0 && (
                <>
                    {/* Información de saldo */}
                    <div className="contenedor-saldo flex-responsive-row justify-sa my-10">
                        <div className="flex-responsive-row align-center gap-1">
                            <span>Porcentaje Disponible:</span>
                            <CircularProgress
                                value={availablePercentage}
                                size={60}
                                color="#2A64F2"
                                bgColor="#E4E9EC"
                            />
                        </div>
                        <p>
                            Saldo disponible:{' '}
                            <span>
                                {formatCurrency(ingresos - saldoUtilizado)}
                            </span>
                        </p>
                    </div>

                    {/* Contenedor de pestañas */}
                    <div className="tabs-container mb-5">
                        <div className="tabs-nav">
                            {['ahorro', 'gasto', 'prestamo'].map((tab) => (
                                <button
                                    key={tab}
                                    className={`tab-button ${
                                        activeTab === tab ? 'active' : ''
                                    }`}
                                    onClick={showTab}
                                >
                                    {tab.charAt(0).toUpperCase() + tab.slice(1)}
                                </button>
                            ))}
                        </div>

                        <div className="tabs-content">
                            {activeTab === 'ahorro' && (
                                <div id="ahorro" className="tab-pane active">
                                    <BudgetForm
                                        label="Guardar Ahorro"
                                        activeTab={activeTab}
                                    />
                                </div>
                            )}

                            {activeTab === 'gasto' && (
                                <div id="gasto" className="tab-pane active">
                                    <BudgetForm
                                        label="Guardar Gasto"
                                        activeTab={activeTab}
                                    />
                                </div>
                            )}

                            {activeTab === 'prestamo' && (
                                <div id="prestamo" className="tab-pane active">
                                    <BudgetForm
                                        label="Guardar Prestamo"
                                        activeTab={activeTab}
                                    />
                                </div>
                            )}
                        </div>
                    </div>
                </>
            )}

            {/* Loader */}
            {isShowLoader && <LoaderComponent />}
        </aside>
    );
};
