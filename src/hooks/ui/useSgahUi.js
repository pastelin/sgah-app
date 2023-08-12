import { useDispatch, useSelector } from 'react-redux';
import { onToggleShowNabvar, onUpdateMenuSelected } from '../../store';
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

	const handleUpdatingMenuSelected = ({ target }) => {
		dispatch(onUpdateMenuSelected(target.textContent));
		handleCloseNavbar();
	};

	// useMemo will only recompute the memorized value when one of the deps has changed.
	// SI isShowNavbar es true indica que se ha dado clic al menu hamburguesa y se colocaran los estilos definidos abajo
	// Si isShowNavbar es false no coloca ningun estilo
	const classNameHightNavbar = useMemo(() => {
		return isShowNavbar ? 'h-100vh' : '';
	}, [isShowNavbar]);

	const classNameHideIconNavbar = useMemo(() => {
		return isShowNavbar ? 'sgah__nav-icon--inactive' : '';
	}, [isShowNavbar]);

	const classNameActiveMenuNavbar = useMemo(() => {
		return isShowNavbar ? 'sgah__nav--active' : '';
	}, [isShowNavbar]);

	const classNameActiveIconCloseMenuNavbar = useMemo(() => {
		return isShowNavbar ? 'icon__close--active' : '';
	}, [isShowNavbar]);

	return {
		//* Propiedades
		classNameHightNavbar,
		classNameHideIconNavbar,
		classNameActiveMenuNavbar,
		classNameActiveIconCloseMenuNavbar,

		//* Metodos
		handleOpenNavbar,
		handleCloseNavbar,
		handleUpdatingMenuSelected,
	};
};
