import { useEffect, useState } from 'react'

export const useForm = (initialForm = {}) => {

    const [formState, setFormState] = useState(initialForm);

    useEffect(() => {
        setFormState(initialForm);
    }, [initialForm])
    

    const onInputChange = ({ target }) => {
        const { name, value } = target;

        console.log({name, value});
        setFormState({
            ...formState,
            [name]: value
        })
    }

    const onResetForm = () => {
		setFormState(initialForm);
	};

    return {
		...formState,
		onInputChange,
		onResetForm,
	};


}
