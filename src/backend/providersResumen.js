export const obtenerDetalle = async () => {
	const uri = 'http://localhost:8092/resumen/v0/resumen/detalle';

	const response = await fetch(uri, {
		method: 'GET',
	});

	if (!response.ok) return null;

	const data = await response.json();

	return data;
};
