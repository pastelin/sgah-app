export function formatDate(dateStr) {
    const dateObj = new Date(dateStr);
    const options = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    };

    return new Intl.DateTimeFormat('es-ES', options).format(
        formatAdjustDate(dateObj)
    );
}

export function formatAdjustDate(dateObj) {
    // Ajustar la fecha para manejar correctamente la zona horaria
    return new Date(dateObj.getTime() + dateObj.getTimezoneOffset() * 60000);
}

export function formatCurrency(amount) {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'MXN',
    }).format(amount);
}
