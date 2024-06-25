export const useGastoHistoricoPage = () => {
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

    const getHistoricalBalanceByMonths = (gastos) => {
        console.log('getHistoricalBalanceByMonths');

        let saldoGastadoByMonth = new Array(12).fill(0);
        let saldoGastadoByMonthDetails = [];

        gastos.forEach((gasto) => {
            const monthIndex =
                parseInt(gasto.fechaCreacion.slice(5, 7), 10) - 1;
            saldoGastadoByMonth[monthIndex] += gasto.monto;
        });

        saldoGastadoByMonth.forEach((saldo, index) => {
            if (saldo > 0) {
                saldoGastadoByMonthDetails.push({
                    month: months[index],
                    saldoGastado: saldo,
                    monthNumber: index + 1,
                });
            }
        });

        return saldoGastadoByMonthDetails;
    };

    return {
        getHistoricalBalanceByMonths,
    };
};
