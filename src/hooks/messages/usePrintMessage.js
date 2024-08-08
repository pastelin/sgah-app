import Swal from 'sweetalert2';

export const usePrintMessage = (code, message) => {
    switch (code) {
        case 200:
        case 201:
            Swal.fire(message, '', 'success');
            break;
        case 'ERR_BAD_REQUEST':
            Swal.fire('Datos incorrectos', message, 'error');
            break;
        case 'ERR_NETWORK':
            Swal.fire(
                'Conéctate a Internet',
                'No estás conectado. Compruebe la conexión.',
                'error'
            );
            break;
    }
};
