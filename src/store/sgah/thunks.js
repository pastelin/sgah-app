import { sgahApi } from '../../backend';

 







export const startAgregarAhorro = (formData) => {
	return async (dispatch) => {
		await sgahApi.post('ahorro/v0/ahorro/agrega', formData);
	};
};