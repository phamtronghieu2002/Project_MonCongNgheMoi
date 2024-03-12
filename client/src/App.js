
import ProtectedRoute from './components/ProtectedRoute';
import React, { useContext } from 'react';
import { ThemeContext } from './providers/ThemeProvider/ThemeProvider';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { PrivateRoutes, PublicRoutes } from './routes';

import { Toaster } from 'react-hot-toast';
import ModalCreateGroup from './components/Modal/ModalCreateGroup/ModalCreateGroup';
function App() {
    const { theme, toggleTheme } = useContext(ThemeContext);
    return (
        <div className={`${theme}`}>
            <ModalCreateGroup />
            <BrowserRouter>

                <Routes>
                    {PublicRoutes.map((r, index) => (
                        <Route {...r} key={index} />
                    ))}

                    {PrivateRoutes.map((r, index) => (
                        <Route key={index} {...r} element={<ProtectedRoute> {r.element} </ProtectedRoute>} />
                    ))}
                </Routes>

            </BrowserRouter>
            <Toaster duration={4000} />
        </div>
    );
}

export default App;
