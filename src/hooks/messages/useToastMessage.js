import { toast } from 'react-toastify';

/**
 * Custom hook to display toast messages based on response codes.
 *
 * @param {number|string} code - The response code or error identifier.
 * @param {string} message - The message to display in the toast.
 */
export const useToastMessage = (code, message) => {
    // Validate input parameters
    if (!code || !message) {
        console.warn('useToastMessage: Missing code or message parameter.');
        return;
    }

    switch (code) {
        case 200: // Success
        case 201: // Created
            toast.success(message);
            break;
        case 'ERR':
            toast.error(message);
            break;
        case 400: // Bad Request
        case 'ERR_BAD_REQUEST': // Bad request error
            toast.error(message);
            break;
        case 'ERR_NETWORK': // Network error
            toast.error(
                'Conéctate a Internet para continuar. Compruebe la conexión.'
            );
            break;
        default: // Handle unknown codes
            toast.info('Ocurrió un evento inesperado.');
            console.warn(`Unhandled code: ${code}`);
            break;
    }
};
