import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

export const SavingsOverviewChart = ({ resumen }) => {
    // Datos de ejemplo: puedes reemplazar esto con los datos reales de tus gastos
    const expenses = [
        { category: 'Presupuesto Disponible', amount: resumen.montoGasto },
        { category: 'Ahorros Acumulados', amount: resumen.montoAhorro },
        { category: 'Préstamos', amount: resumen.montoPrestamo },
        { category: 'Inversiones', amount: resumen.montoInversion },
    ];

    const data = {
        labels: expenses.map((expense) => expense.category),
        datasets: [
            {
                data: expenses.map((expense) => expense.amount),
                backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'],
                hoverBackgroundColor: [
                    '#FF6384',
                    '#36A2EB',
                    '#FFCE56',
                    '#4BC0C0',
                ],
            },
        ],
    };

    return (
        <div className="m-w-450">
            <h2 className="text-center text-lg font-bold mb-4">
                Resumen Financiero
            </h2>
            <Pie data={data} />
        </div>
    );
};
