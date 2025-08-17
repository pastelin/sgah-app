import { useEffect } from 'react';
import { formatCurrency, useSgahUi } from '../hooks';
import { useIngresoPage } from '../hooks/pages/useIngresoPage';
import {
    LoaderComponent,
    ToggleCardButton,
} from '../components';
import { AhorroForm } from '../components/forms/AhorroForm';
import { IngresoGForm } from '../components/forms/';
import PropTypes from 'prop-types';

const CardSection = ({ label, title, FormComponent, styleFront, onToggle }) => (
    <section className={`contenedor-form flip-face ${styleFront}`}>
        <ToggleCardButton label={label} onToggleFlipCard={onToggle} />
        <h3>{title}</h3>
        <FormComponent />
    </section>
);

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

    const { isShowLoader } = useSgahUi();

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

            <div
                className={`${
                    ingresos ? 'display--visible' : 'display--hidden'
                }`}
            >
                <section
                    className={`
                        contenedor-forms-ingresos
                        flip-card 
                        ${styleFlipCardHover}`}
                >
                    <CardSection
                        label="Ahorro"
                        title="Gastos"
                        FormComponent={IngresoGForm}
                        styleFront="flip-front"
                        onToggle={onToggleFlipCard}
                    />
                    <CardSection
                        label="Gasto"
                        title="Ahorro"
                        FormComponent={AhorroForm}
                        styleFront="flip-back"
                        onToggle={onToggleFlipCard}
                    />
                </section>
            </div>       

            {isShowLoader && <LoaderComponent />}
        </aside>
    );
};

CardSection.propTypes = {
    label: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    FormComponent: PropTypes.elementType.isRequired,
    styleFront: PropTypes.string.isRequired,
    onToggle: PropTypes.func.isRequired,
};