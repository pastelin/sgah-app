import { useGastoForm } from '../../hooks';
import React from 'react';

export const IngresoGForm = React.memo(() => {
    const {
        porcentaje,
        descripcion,
        onInputChange,
        onSubmit,
        hasPermissionEditG,
    } = useGastoForm();

    return (
        <form onSubmit={onSubmit}>
            <div className="form__group">
                <label htmlFor="monto">Porcentaje:</label>
                <input
                    type="number"
                    name="porcentaje"
                    id="porcentaje"
                    value={porcentaje}
                    onChange={onInputChange}
                    required
                    disabled={!hasPermissionEditG}
                />
            </div>
            <div className="form__group">
                <label htmlFor="descripcion">Descripción:</label>
                <textarea
                    name="descripcion"
                    id="descripcion"
                    value={descripcion}
                    onChange={onInputChange}
                    required
                    disabled={!hasPermissionEditG}
                ></textarea>
            </div>

            {hasPermissionEditG && (
                <div className="text-center mt-1">
                    <button className="btn btn-submit" type="submit">
                        Guardar Gasto
                    </button>
                </div>
            )}
        </form>
    );
});
