import React from 'react';
import ReactDOM from 'react-dom/client';
import { GestorAhorroApp } from './GestorAhorroApp';

import './css/app.css';
import { Provider } from 'react-redux';
import { store } from './store/store';

ReactDOM.createRoot(document.getElementById('root')).render(
	<Provider store={store}>
		<GestorAhorroApp />
	</Provider>
);
