export const formatCurrency = (numero) => {

    if (!numero) return 'MX$0';

	return numero.toLocaleString('en', {
		style: 'currency',
		currency: 'MXN',
	});
};
