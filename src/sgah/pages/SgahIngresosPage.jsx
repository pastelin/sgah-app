import { useEffect } from 'react';
import { formatCurrency } from '../../hooks';
import { useIngresoPage } from '../../hooks/pages/useIngresoPage';
import { ToggleCardButton } from '../components';
import { AhorroForm } from '../components/forms/AhorroForm';
import { IngresoGForm } from '../components/forms/';

export const SgahIngresosPage = () => {
    const {
        hasPermissionEdit,
        availablePercentage,
        onInputChangeIngresos,
        onToggleFlipCard,
        ingresos,
        saldoUtilizado,
        styleFlipCardHover,
        handleResetInitialState,
    } = useIngresoPage();

    useEffect(() => {
        if (availablePercentage === 0) {
            handleResetInitialState();
        }
    }, [availablePercentage]);

    return (
        <aside className="contenedor-aside">
            <h2>Ingresos</h2>

            <div className="flex-responsive-row justify-center align-end">
                <div className="form__group">
                    <input
                        type="number"
                        id="ingresos"
                        value={ingresos}
                        onChange={onInputChangeIngresos}
                        required
                        disabled={!hasPermissionEdit}
                    />
                </div>
            </div>

            <div className="contenedor-saldo flex-responsive-row justify-sa mt-2">
                <p>
                    Porcentaje Disponible: <span>{availablePercentage}%</span>
                </p>
                <p>
                    Saldo disponible:{' '}
                    <span>{formatCurrency(ingresos - saldoUtilizado)}</span>
                </p>
            </div>

            {!ingresos || (
                <section
                    className={`contenedor-forms-ingresos flip-card ${styleFlipCardHover}`}
                >
                    <section className="contenedor-form flip-face flip-front">
                        <ToggleCardButton
                            label="Ahorro"
                            onToggleFlipCard={onToggleFlipCard}
                        />

                        <h3>Gastos</h3>

                        <IngresoGForm />
                    </section>

                    <section className="contenedor-form flip-face flip-back">
                        <ToggleCardButton
                            label="Gasto"
                            onToggleFlipCard={onToggleFlipCard}
                        />
                        <h3>Ahorro</h3>
                        <AhorroForm />
                    </section>
                </section>
            )}
        </aside>
    );
};
