import { useAhorroForm } from '../../../hooks/forms/useAhorroForm';

export const AhorroForm = () => {
    const {
        porcentaje,
        descripcion,
        hasPermissionEditA,
        onInputChange,
        onSubmit,
    } = useAhorroForm();

    return (
        <>
            <form onSubmit={onSubmit}>
                <div className="form__group">
                    <label htmlFor="porcentaje">Porcentaje:</label>
                    <input
                        type="number"
                        name="porcentaje"
                        id="porcentaje"
                        value={porcentaje}
                        onChange={onInputChange}
                        required
                        disabled={!hasPermissionEditA}
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
                        disabled={!hasPermissionEditA}
                    ></textarea>
                </div>

                {!hasPermissionEditA || (
                    <div className="text-center mt-2">
                        <button
                            className="btn btn-submit"
                            type="submit"
                            disabled={!hasPermissionEditA}
                        >
                            Guardar Ahorro
                        </button>
                    </div>
                )}
            </form>
        </>
    );
};
