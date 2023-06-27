import axios from 'axios';

// Permite crear configuracion estandar para no repetir codigo
export const sgahApi = axios.create({
	baseURL: 'http://localhost:8092/',
});
