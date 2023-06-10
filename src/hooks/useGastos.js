import { useEffect } from 'react';
import { useSelector } from 'react-redux';

export const useGastos = () => {
	// A hook to access the redux store's state.
	// This hook takes a selector function as an argument.The selector is called with the store state.
	const { filtro, categoriaGastos, gastos, tipoMovimiento, montos, cabecerasTable, properties } =
		useSelector((state) => state.sgahGasto);

	useEffect(() => {
		// Referencia de elementos para el filtro de busqueda
		const filtroElement = document.querySelector('#filtro');
		const categoriaElement = document.querySelector('#categoria');
		const tipoElement = document.querySelector('#tipo');
		const fechaInicioElement = document.querySelector('#fechaInicio');
		const fechaFinElement = document.querySelector('#fechaFin');
		let oldOpcion = '';

		const reset = (opcion) => {
			switch (opcion) {
				case 'Categoria':
					categoriaElement.classList.add('display--none');
					break;
				case 'Tipo Movimiento':
					tipoElement.classList.add('display--none');
					break;
				case 'Fecha':
					fechaInicioElement.classList.add('display--none');
					fechaFinElement.classList.add('display--none');
					break;
			}
		};

		filtroElement.addEventListener('change', ({ target }) => {
			const opcion = target.value;

			if (!!opcion) {
				if (!!oldOpcion) {
					reset(oldOpcion);
				}

				oldOpcion = opcion;
				switch (opcion) {
					case 'Listar todo':
						break;
					case 'Categoria':
						categoriaElement.classList.remove('display--none');
						break;
					case 'Tipo Movimiento':
						tipoElement.classList.remove('display--none');
						break;
					case 'Fecha':
						fechaInicioElement.classList.remove('display--none');
						fechaFinElement.classList.remove('display--none');
						break;
				}
			}
		});

		// Referencia de elemento para agregar gasto
		const btnAgregarGasto = document.querySelector('#btnAgregarGasto');
		const formularioGastoElement = document.querySelector('#formularioGasto');

		btnAgregarGasto.addEventListener('click', () => {
			formularioGastoElement.classList.remove('display__none');
		});
	}, []);

	return {
		filtro,
		categoriaGastos,
		tipoMovimiento,
		montos,
		cabecerasTable,
		properties,
		gastos,
	};
};
