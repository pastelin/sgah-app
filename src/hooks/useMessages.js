import Swal from 'sweetalert2';

export const useMessages = (code, message) => {
	switch (code) {
		case 200:
		case 201:
			Swal.fire(message, '', 'success');
			break;
		case 'ERR_BAD_REQUEST':
			Swal.fire('Datos incorrectos', message, 'error');
			break;
		case 'ERR_NETWORK':
			Swal.fire('Error en el sistema', 'Favor de reintentar en 5 minutos', 'error');
			break;
	}
};
