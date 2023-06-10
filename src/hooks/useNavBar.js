import { useDispatch, useSelector } from 'react-redux';
import { updateMenuSelected } from '../store/sgah/sgahSlice';
import { useEffect } from 'react';

export const useNavBar = () => {
	// Obtiene valor del menu a mostrar en la vista definido en archivo sgahSlice y registrado en archivo store.js
	const { menuList } = useSelector((state) => state.sgah);

	// A hook to access the redux dispatch function.
	const dispatch = useDispatch();

    // Hook que se ejecuta despues de que el componente se haya renderizado
    // Tiene como objetivo mostrar u ocultar elementos del menu
	useEffect(() => {
		const navSgahElement = document.querySelector('#navSgah');
		const navIconElement = document.querySelector('#navIcon');
		const navMenuElement = document.querySelector('#navMenu');
		const closeMenuElement = document.querySelector('#closeMenu');

		// Mobile o menor a 480px
		// Agrega clases al dar clic en el menu hamburgesa y expande el contenido del menu
		navIconElement.addEventListener('click', () => {
			navSgahElement.classList.add('h-100vh');
			navIconElement.classList.add('sgah__nav-icon--inactive');
			navMenuElement.classList.add('sgah__nav--active');
			closeMenuElement.classList.add('icon__close--active');
		});

		// Mobile o menor a 480px
		// Elimina clases para ocultar elementos al cerrar el menu
		closeMenuElement.addEventListener('click', () => {
			navSgahElement.classList.remove('h-100vh');
			navIconElement.classList.remove('sgah__nav-icon--inactive');
			navMenuElement.classList.remove('sgah__nav--active');
			closeMenuElement.classList.remove('icon__close--active');
		});

        // Actualiza el estado de menuSelected definido en archivo sgahSlice y registrado en archivo store.js
        // Tiene el objetivo indicar el componente a renderizar
		const menuElement = document.querySelector('#menu');
		menuElement.addEventListener('click', ({ target }) => {
			dispatch(updateMenuSelected(target.textContent));
		});
	}, []);

	return { menuList };
};
