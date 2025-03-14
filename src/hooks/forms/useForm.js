import { useEffect, useState } from 'react';

export const useForm = (initialForm = null, initialFormUpdate = null) => {
    const [formState, setFormState] = useState(initialForm);

    // Hook que se ejecuta cada que el estado de initialForm cambia
    useEffect(() => {
        if (initialFormUpdate) {
            setFormState(initialFormUpdate);
        } else {
            setFormState(initialForm);
        }
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
        formState,
        onInputChange,
        onResetForm,
    };
};
