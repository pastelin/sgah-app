import { useDispatch, useSelector } from 'react-redux';
import { onToggleShowNabvar } from '../../store';
import { useMemo } from 'react';

export const useSgahUi = () => {
    const { isShowNavbar } = useSelector((state) => state.ui);

    const dispatch = useDispatch();

    const handleShowNavbar = (flag) => {
        dispatch(onToggleShowNabvar(flag));
    };

    // useMemo will only recompute the memorized value when one of the deps has changed.
    // SI isShowNavbar es true indica que se ha dado clic al menu hamburguesa y se colocaran los estilos definidos abajo
    // Si isShowNavbar es false no coloca ningun estilo
    const styleHightNavbar = useMemo(() => {
        return isShowNavbar ? 'h-100vh' : '';
    }, [isShowNavbar]);

    const styleHideMobileNavbar = useMemo(() => {
        return isShowNavbar ? 'display--none' : '';
    }, [isShowNavbar]);

    const styleShowMenuNavbar = useMemo(() => {
        return isShowNavbar ? 'display--block' : '';
    }, [isShowNavbar]);

    const classNameActiveIconCloseMenuNavbar = useMemo(() => {
        return isShowNavbar ? 'display--block' : '';
    }, [isShowNavbar]);

    return {
        //* Propiedades
        styleHightNavbar,
        styleHideMobileNavbar,
        styleShowMenuNavbar,
        classNameActiveIconCloseMenuNavbar,

        //* Metodos
        handleShowNavbar,
    };
};
