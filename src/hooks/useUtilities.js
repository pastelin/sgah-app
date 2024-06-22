export const formatCurrency = (numero) => {
    if (!numero) {
        return 'MX$0';
    }

    return numero.toLocaleString('en', {
        style: 'currency',
        currency: 'MXN',
    });
};

export const getCurrentDateByString = () => {
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();

    return `${year}-${month}-${day}`;
};

export const getCurrentYearByString = () => {
    return new Date().getFullYear().toString();
};

export const getCurrentYear = () => {
    return new Date().getFullYear();
};

export const getCurrentMonth = () => {
    return new Date().getMonth() + 1;
};
