import React from 'react';

export const WithoutInfoAlert = React.memo(() => {
    return (
        <div className="alert alert-info mt-2">
            <h3>¡No hay información u.u!</h3>
        </div>
    );
});
