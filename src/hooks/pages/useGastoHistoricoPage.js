import { useGastoUi } from '../ui';

export const useGastoHistoricoPage = () => {
    const { handleShowLoaderGasto } = useGastoUi();

    const months = [
        'Enero',
        'Febrero',
        'Marzo',
        'Abril',
        'Mayo',
        'Junio',
        'Julio',
        'Agosto',
        'Septiembre',
        'Octubre',
        'Noviembre',
        'Diciembre',
    ];

    // TODO: validar el uso de new Date() para obtener el mes con UTC
    const createNewArray = (gastos) => {
        return gastos.map((gasto) => {
            return {
                month: gasto.fechaCreacion.slice(5, 7),
                saldo: gasto.monto,
            };
        });
    };

    const getSaldoGastadoByMonth = (gastos) => {
        console.log('getSaldoGastadoByMonth');

        let saldoGastadoByMonth = [];
        let counter = 1;

        let newGastos = createNewArray(gastos);
        while (counter <= 12) {
            let getGastosByOneMonth = newGastos.filter(
                (gasto) => gasto.month == counter
            );

            // console.log('getGastosByOneMonth', getGastosByOneMonth);

            if (getGastosByOneMonth.length >= 1) {
                let getSaldoGastado = getGastosByOneMonth.reduce(
                    (acc, gasto) => acc + gasto.saldo,
                    0
                );

                saldoGastadoByMonth.push({
                    month: months[counter - 1],
                    saldoGastado: getSaldoGastado,
                    monthNumber: counter,
                });
            }

            counter++;
        }

        handleShowLoaderGasto(false);
        return saldoGastadoByMonth;
    };

    return {
        getSaldoGastadoByMonth,
    };
};
