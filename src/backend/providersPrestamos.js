export const actualizarPrestamo = async (formData, uri) => {
	console.log('actualizarPrestamo');
	const resp = await fetch(uri, {
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
