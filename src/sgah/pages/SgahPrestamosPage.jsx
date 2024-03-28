import { useMemo } from 'react';
import { useSgahPrestamoStore, usePrestamoUi } from '../../hooks';
import {
    DetailSaldoParagraph,
    FormNewPrestamo,
    FormUpdatePrestamo,
    TableSgahPrestamo,
} from '../components';

export const SgahPrestamosPage = () => {
    const { handleShowNewFormPrestamo } = usePrestamoUi();

    const {
        saldoUtilizadoP,
        startLoadingSaldoUtilizadoP,
        startLoadingPrestamos,
    } = useSgahPrestamoStore();

    useMemo(() => {
        startLoadingSaldoUtilizadoP();
        startLoadingPrestamos();
    }, []);

    return (
        <>
            <aside className="contenedor-aside">
                <h2>Detalle Prestamos</h2>

                <div className="contenedor-saldo text-center">
                    <DetailSaldoParagraph
                        label="Deuda Actual"
                        saldo={saldoUtilizadoP}
                    />
                </div>

                <div className="text-center mt-2">
                    <button
                        className="btn btn-submit btn-xl"
                        onClick={() => handleShowNewFormPrestamo(true)}
                    >
                        Agregar Prestamo
                    </button>
                </div>

                <TableSgahPrestamo />
            </aside>

            <FormNewPrestamo />

            <FormUpdatePrestamo />
        </>
    );
};
