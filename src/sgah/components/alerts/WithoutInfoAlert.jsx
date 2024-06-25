import React from 'react';

export const WithoutInfoAlert = React.memo(() => {
    return (
        <div className="alert alert-info">
            <h3>¡No se encontró información!</h3>
        </div>
    );
});
