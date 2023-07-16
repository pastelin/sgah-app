export const formatCurrency = (numero) => {
	if (!numero) return 'MX$0';

	return numero.toLocaleString('en', {
		style: 'currency',
		currency: 'MXN',
	});
};

export const convertStringToInt = (number) => {
	return parseInt(number);
};

export const addNumbers = (...numbers) => {
	let initialValue = 0;

	numbers.forEach((number) => {
		console.log(number);
		initialValue += parseInt(number);
	});

	return initialValue;
};
