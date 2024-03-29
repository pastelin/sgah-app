import { useDispatch, useSelector } from 'react-redux';
import { onToggleShowNabvar } from '../../store';
import { useMemo } from 'react';

export const useSgahUi = () => {
    const { isShowNavbar } = useSelector((state) => state.ui);

    const dispatch = useDispatch();

    const handleOpenNavbar = () => {
        dispatch(onToggleShowNabvar(true));
    };

    const handleCloseNavbar = () => {
        dispatch(onToggleShowNabvar(false));
    };

    // useMemo will only recompute the memorized value when one of the deps has changed.
    // SI isShowNavbar es true indica que se ha dado clic al menu hamburguesa y se colocaran los estilos definidos abajo
    // Si isShowNavbar es false no coloca ningun estilo
    const classNameHightNavbar = useMemo(() => {
        return isShowNavbar ? 'h-100vh' : '';
    }, [isShowNavbar]);

    const classNameHideMobileNavbar = useMemo(() => {
        return isShowNavbar ? 'inactive' : '';
    }, [isShowNavbar]);

    const classNameActiveMenuNavbar = useMemo(() => {
        return isShowNavbar ? 'active' : '';
    }, [isShowNavbar]);

    const classNameActiveIconCloseMenuNavbar = useMemo(() => {
        return isShowNavbar ? 'active' : '';
    }, [isShowNavbar]);

    return {
        //* Propiedades
        classNameHightNavbar,
        classNameHideMobileNavbar,
        classNameActiveMenuNavbar,
        classNameActiveIconCloseMenuNavbar,

        //* Metodos
        handleOpenNavbar,
        handleCloseNavbar,
    };
};
