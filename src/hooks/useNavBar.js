import { useDispatch, useSelector } from 'react-redux';
import { onCloseNavbar, onOpenNavbar, onUpdateMenuSelected } from '../store';
import { useMemo } from 'react';

export const useNavBar = () => {
	// Obtiene valor del menu a mostrar en la vista definido en archivo sgahSlice y registrado en archivo store.js
	const { menuList } = useSelector((state) => state.sgah);
	const { isNavbarOpen } = useSelector((state) => state.ui);


	// A hook to access the redux dispatch function.
    const dispatch = useDispatch();
    
	const handleOpenNavbar = () => {
		dispatch(onOpenNavbar());
	};

	const handleCloseNavbar = () => {
		dispatch(onCloseNavbar());
	};

    const handleUpdateMenuSelected = ({ target }) => {
		dispatch(onUpdateMenuSelected(target.textContent));
		dispatch(onCloseNavbar());
	};

	// useMemo will only recompute the memorized value when one of the deps has changed.
	// SI isNavbarOpen es true indica que se ha dado clic al menu hamburguesa y se colocaran los estilos definidos abajo
	// Si isNavbarOpen es false no coloca ningun estilo
	const hightClass = useMemo(() => {
		return isNavbarOpen ? 'h-100vh' : '';
	}, [isNavbarOpen]);

	const hideIconClass = useMemo(() => {
		return isNavbarOpen ? 'sgah__nav-icon--inactive' : '';
	}, [isNavbarOpen]);

	const activeMenuClass = useMemo(() => {
		return isNavbarOpen ? 'sgah__nav--active' : '';
	}, [isNavbarOpen]);

	const activeIconCloseMenuClass = useMemo(() => {
		return isNavbarOpen ? 'icon__close--active' : '';
	}, [isNavbarOpen]);


    return {
		//* Propiedades
		menuList,
        isNavbarOpen,
        hightClass,
        hideIconClass,
        activeMenuClass,
        activeIconCloseMenuClass,

		//* Metodos
		handleOpenNavbar,
		handleCloseNavbar,
		handleUpdateMenuSelected,
	};
};
