import React from 'react';

export const LoaderComponent = React.memo(() => {
    return (
        <div className="overlay flex-responsive-row center-x-y">
            <div className="spinner"></div>
        </div>
    );
});