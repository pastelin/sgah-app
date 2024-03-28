import {
    useSgahPrestamoStore,
    formatCurrency,
    usePrestamoUi,
} from '../../../hooks';

export const TableSgahPrestamo = () => {
    const { prestamos, startLoadingPrestamo } = useSgahPrestamoStore();

    const { handleShowUpdateFormPrestamo } = usePrestamoUi();

    const handleOpenFormUpdatePrestamo = (folio) => {
        if (!!folio) {
            startLoadingPrestamo(folio);
            handleShowUpdateFormPrestamo(true);
        }
    };

    return (
        <div className="contenedor-table">
            <table>
                <thead>
                    <tr>
                        <th>Fecha</th>
                        <th>Saldo utilizado</th>
                        <th>Descripción</th>
                        <th>Deuda Actual</th>
                        <th>Editar</th>
                    </tr>
                </thead>

                <tbody>
                    {prestamos.map((prestamo) => (
                        <tr
                            key={
                                window.crypto.getRandomValues(
                                    new Uint32Array(1)
                                )[0]
                            }
                        >
                            <td>{prestamo.fechaCreacion}</td>
                            <td>{formatCurrency(prestamo.montoPrestado)}</td>
                            <td>{prestamo.descripcion}</td>
                            <td>
                                {formatCurrency(
                                    prestamo.montoPrestado -
                                        prestamo.montoPagado
                                )}
                            </td>
                            <td>
                                <button
                                    className="btn btn-update"
                                    onClick={() =>
                                        handleOpenFormUpdatePrestamo(
                                            prestamo.folio
                                        )
                                    }
                                >
                                    Pagar
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};
