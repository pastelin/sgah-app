export const obtenerData = async (uri) => {
	const resp = await fetch(uri);
	if (!resp.ok) return null;

	return await resp.json();
};

export const agregarGasto = async (formData, uriAgregaGasto) => {
	console.log('agregarGasto');
	const resp = await fetch(uriAgregaGasto, {
		method: 'POST',
		body: JSON.stringify(formData),
		headers: {
			'Content-Type': 'application/json',
		},
	});

	if (!resp.ok) {
		const { errors } = await resp.json();
		console.log(errors);
		return null;
	}

	return await resp.json();
};
