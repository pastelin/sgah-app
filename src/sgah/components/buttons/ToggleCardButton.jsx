export const ToggleCardButton = ({label, onToggleFlipCard}) => {
    return (
        <>
            <div className="text-end">
                <button className="btn btn-toggle" onClick={onToggleFlipCard}>
                    {label}
                </button>
            </div>
        </>
    );
};
