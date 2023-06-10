import { ThemeProvider } from '@emotion/react';
import { blackTheme } from './';
import { CssBaseline } from '@mui/material';

export const AppTheme = ({ children }) => {
	return (
		<ThemeProvider theme={blackTheme}>
			<CssBaseline />
			{children}
		</ThemeProvider>
	);
};
