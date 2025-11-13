import {
    useSgahPrestamoStore,
    formatCurrency,
    usePrestamoUi,
} from '../../hooks';

export const TableSgahPrestamo = () => {
    const { loans, loadLoanByFolio } = useSgahPrestamoStore();

    const { handleShowUpdateFormPrestamo } = usePrestamoUi();

    const handleOpenFormUpdatePrestamo = (folio) => {
        if (folio) {
            loadLoanByFolio(folio);
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
                    {loans.map(
                        ({
                            folio,
                            fechaCreacion,
                            saldoPrestado,
                            saldoPagado,
                            descripcion,
                        }) => (
                            <tr key={folio}>
                                <td>{fechaCreacion}</td>
                                <td>
                                    {formatCurrency(parseInt(saldoPrestado))}
                                </td>
                                <td>{descripcion}</td>
                                <td>
                                    {formatCurrency(
                                        saldoPrestado - saldoPagado
                                    )}
                                </td>
                                <td>
                                    <button
                                        className="btn btn-update"
                                        onClick={() =>
                                            handleOpenFormUpdatePrestamo(folio)
                                        }
                                    >
                                        Editar
                                    </button>
                                </td>
                            </tr>
                        )
                    )}
                </tbody>
            </table>
        </div>
    );
};
