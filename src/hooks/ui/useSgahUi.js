import { useDispatch, useSelector } from 'react-redux';
import { onToggleShowLoader, onToggleShowNabvar } from '../../store';
import { useMemo } from 'react';

export const useSgahUi = () => {
    const { isShowNavbar, isShowLoader } = useSelector((state) => state.ui);

    const dispatch = useDispatch();

    const handleShowNavbar = () => {
        dispatch(onToggleShowNabvar(!isShowNavbar));
    };

    // useMemo will only recompute the memorized value when one of the deps has changed.
    // SI isShowNavbar es true indica que se ha dado clic al menu hamburguesa y se colocaran los estilos definidos abajo
    // Si isShowNavbar es false no coloca ningun estilo
    const styleHightNavbar = useMemo(() => {
        return isShowNavbar ? 'h-100vh' : '';
    }, [isShowNavbar]);

    const styleShowMenuNavbar = useMemo(() => {
        return isShowNavbar ? 'display--block' : '';
    }, [isShowNavbar]);

    const handleShowLoader = (flag) => {
        dispatch(onToggleShowLoader(flag));
    };

    return {
        //* Propiedades
        styleHightNavbar,
        styleShowMenuNavbar,
        isShowLoader,

        //* Metodos
        handleShowNavbar,
        handleShowLoader,
    };
};
