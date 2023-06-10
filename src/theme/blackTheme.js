import { createTheme } from '@mui/material';
import { red } from '@mui/material/colors';

export const blackTheme = createTheme({
	palette: {
		primary: {
            main: '#000000',
		},
		secondary: {
			main: '#ffffff',
		},
		error: {
			main: red.A400,
		},
	},
});
