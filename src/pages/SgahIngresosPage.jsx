import { useEffect, useState, useCallback } from 'react';
import { formatCurrency, useSgahUi } from '../hooks';
import { LoaderComponent } from '../components';
import { IngresoGForm } from '../components/forms/';
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
    const showTab = useCallback(
        (e) => {
            const targetId = e.target.textContent.toLowerCase();
            setActiveTab(targetId);
        },
        []
    );

    return (
        <aside className="contenedor-aside">
            <h2>Ingresos</h2>

            {/* Input para ingresos */}
            <div className="flex-responsive-row justify-center align-end">
                <div className="form__group">
                    <input
                        type="number"
                        id="ingresos"
                        value={ingresos}
                        onChange={onInputChangeIngresos}
                        required
                        disabled={!isInputActive}
                    />
                </div>
            </div>

            {/* Información de saldo */}
            <div className="contenedor-saldo flex-responsive-row justify-sa mt-2">
                <p>
                    Porcentaje Disponible: <span>{availablePercentage}%</span>
                </p>
                <p>
                    Saldo disponible:{' '}
                    <span>{formatCurrency(ingresos - saldoUtilizado)}</span>
                </p>
            </div>

            {/* Contenedor de pestañas */}
            <div className="tabs-container">
                <div className="tabs-nav">
                    {['ahorro', 'gasto', 'prestamo'].map((tab) => (
                        <button
                            key={tab}
                            className={`tab-button ${activeTab === tab ? 'active' : ''}`}
                            onClick={showTab}
                        >
                            {tab.charAt(0).toUpperCase() + tab.slice(1)}
                        </button>
                    ))}
                </div>

                <div className="tabs-content">
                    {activeTab === 'ahorro' && (
                        <div id="ahorro" className="tab-pane active">
                            {/* <h3>Ahorro</h3> */}
                            <BudgetForm label="Guardar Ahorro" activeTab={activeTab} />
                        </div>
                    )}

                    {activeTab === 'gasto' && (
                        <div id="gasto" className="tab-pane active">
                            {/* <h3>Gasto</h3> */}
                            <BudgetForm label="Guardar Gasto" activeTab={activeTab} />
                        </div>
                    )}

                    {activeTab === 'prestamo' && (
                        <div id="prestamo" className="tab-pane active">
                            {/* <h3>Prestamo</h3> */}
                            <IngresoGForm />
                        </div>
                    )}
                </div>
            </div>

            {/* Loader */}
            {isShowLoader && <LoaderComponent />}
        </aside>
    );
};
