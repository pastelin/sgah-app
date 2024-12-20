import { formatCurrency, useSgahGastoStore } from '../../../hooks';

export const TableSgahGasto = () => {
    const { gastos } = useSgahGastoStore();
    return (
        <div className="contenedor-table">
            <table>
                <thead>
                    <tr>
                        <th>Fecha</th>
                        <th>Monto</th>
                        <th>Descripción</th>
                        <th>Categoría</th>
                        <th>Tipo</th>
                    </tr>
                </thead>

                <tbody>
                    {gastos.map((gasto) => (
                        <tr
                            className={`${
                                gasto?.origenMovimiento?.descripcion === 'Gasto'
                                    ? 'color-gasto'
                                    : 'color-ingreso'
                            }`}
                            key={
                                window.crypto.getRandomValues(
                                    new Uint32Array(1)
                                )[0]
                            }
                        >
                            <td>{gasto.fechaCreacion}</td>
                            <td>{formatCurrency(gasto.monto)}</td>
                            <td>{gasto.descripcion}</td>
                            <td>{gasto?.gastoRecurrente?.nbGasto}</td>
                            <td>{gasto?.origenMovimiento?.id}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};
