import axios from 'axios';

// Permite crear configuracion estandar para no repetir codigo
export const pokemonApi = axios.create({
	baseURL: 'http://localhost:8092/',
});
