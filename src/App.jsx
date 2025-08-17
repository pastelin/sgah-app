import React from 'react';
import { Navigation } from './routes/Navigation';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const App = () => {
    return (
        <>
            <Navigation />
            <ToastContainer />
        </>
    );
};
