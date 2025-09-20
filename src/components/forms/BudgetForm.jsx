import { useBudgetForm } from '../../hooks/forms/useBudgetForm';
import PropTypes from 'prop-types';

/**
 * BudgetForm Component
 * 
 * A reusable form component for managing budgets, including savings and expenses.
 * 
 * @param {string} label - The label for the submit button.
 * @param {string} activeTab - The active tab to determine the form's context (e.g., 'ahorro', 'gasto').
 */
export const BudgetForm = ({ label, activeTab }) => {
    const {
        porcentaje,
        descripcion,
        onInputChange,
        onSubmit,
    } = useBudgetForm();

    return (
        <form onSubmit={(event) => onSubmit(event, activeTab)} className='mt-1'>
            {/* Input group for percentage */}
            <div className="form__group">
                <label htmlFor="porcentaje">Porcentaje:</label>
                <input
                    type="number"
                    name="porcentaje"
                    id="porcentaje"
                    value={porcentaje}
                    onChange={onInputChange}
                    required
                    min="0"
                    max="100"
                />
            </div>

            {/* Input group for description */}
            <div className="form__group">
                <label htmlFor="descripcion">Descripción:</label>
                <textarea
                    name="descripcion"
                    id="descripcion"
                    value={descripcion}
                    onChange={onInputChange}
                    required
                ></textarea>
            </div>

            {/* Submit button */}
            <div className="text-center mt-2">
                <button className="btn btn-submit" type="submit">
                    {label}
                </button>
            </div>
        </form>
    );
};


BudgetForm.propTypes = {
    label: PropTypes.string.isRequired,
    activeTab: PropTypes.string.isRequired,
};