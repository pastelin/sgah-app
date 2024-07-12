import { useGastoForm } from '../../../hooks';
import React from 'react';

export const IngresoGForm = React.memo(() => {
    const {
        porcentaje,
        cdGasto,
        descripcion,
        onInputChange,
        gastosRecurrentes,
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
                <select
                    name="cdGasto"
                    id="cdGasto"
                    value={cdGasto}
                    onChange={onInputChange}
                    required
                    disabled={!hasPermissionEditG}
                >
                    <option value="">Seleccionar tipo de ingreso</option>
                    {gastosRecurrentes.map(
                        ({ cdGasto, nbGasto, cdEstatus }) =>
                            (cdEstatus === 2 || cdGasto === 11) && (
                                <option
                                    key={
                                        window.crypto.getRandomValues(
                                            new Uint32Array(1)
                                        )[0]
                                    }
                                    value={cdGasto}
                                >
                                    {nbGasto}
                                </option>
                            )
                    )}
                </select>
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
