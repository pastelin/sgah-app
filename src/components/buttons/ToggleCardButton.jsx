import PropTypes from 'prop-types';

export const ToggleCardButton = ({ label, onToggleFlipCard }) => (
    <div className="text-end">
        <button className="btn btn-toggle" onClick={onToggleFlipCard}>
            {label}
        </button>
    </div>
);

ToggleCardButton.propTypes = {
    label: PropTypes.string.isRequired,
    onToggleFlipCard: PropTypes.func.isRequired,
};
