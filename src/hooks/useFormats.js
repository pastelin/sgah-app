export const formatCurrency = (numero) => {
	return numero.toLocaleString('en', {
		style: 'currency',
		currency: 'MXN',
	});
};
