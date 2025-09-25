// src/components/progress/CircularProgress.jsx
import '../../scss/base/_variables.scss'; // Asegúrate de importar las variables si usas CSS Modules o SCSS global

// Puedes pasar los colores como props o definirlos aquí
const COLORS = {
    primary: '#2A64F2', // Azul Primario
    success: '#18C47C', // Verde Acento
    danger: '#E5484D', // Rojo Alerta
    text: '#1E2A32', // Gris Oscuro (Texto)
    bg: '#E4E9EC', // Gris Claro (Fondo)
};

export const CircularProgress = ({ value = 0, size = 60, stroke = 8 }) => {
    // Determina el color según el valor
    let color = COLORS.primary;
    if (value >= 90) color = COLORS.success; // Éxito si el porcentaje es alto
    if (value <= 10) color = COLORS.danger; // Alerta si el porcentaje es bajo

    const radius = (size - stroke) / 2;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (value / 100) * circumference;

    return (
        <svg width={size} height={size}>
            {/* Fondo de la barra */}
            <circle
                cx={size / 2}
                cy={size / 2}
                r={radius}
                stroke={COLORS.bg}
                strokeWidth={stroke}
                fill="none"
            />
            {/* Progreso */}
            <circle
                cx={size / 2}
                cy={size / 2}
                r={radius}
                stroke={color}
                strokeWidth={stroke}
                fill="none"
                strokeDasharray={circumference}
                strokeDashoffset={offset}
                strokeLinecap="round"
                style={{ transition: 'stroke-dashoffset 0.5s' }}
            />
            {/* Texto del porcentaje */}
            <text
                x="50%"
                y="50%"
                textAnchor="middle"
                dy=".3em"
                fontSize=".85rem"
                fill={COLORS.text}
                fontWeight="700"
            >
                {`${value}%`}
            </text>
        </svg>
    );
};
