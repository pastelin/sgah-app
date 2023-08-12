import { useEffect, useState } from 'react';

export const useForm = (initialForm = null) => {
	const [formState, setFormState] = useState(initialForm);

	// Hook que se ejecuta cada que el estado de initialForm cambia
	useEffect(() => {
		setFormState(initialForm);
	}, [initialForm]);

	const onInputChange = ({ target }) => {
		const { name, value } = target;

		setFormState({
			...formState,
			[name]: value,
		});
	};

	const onResetForm = () => {
		setFormState(initialForm);
	};

	return {
		...formState,
		onInputChange,
		onResetForm,
	};
};
