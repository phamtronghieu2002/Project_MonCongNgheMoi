import AuthProvider from './providers/Auth/AuthProvider';
import ProtectedRoute from './components/ProtectedRoute';
import React, { useContext } from 'react';
import { ThemeContext } from './providers/ThemeProvider/ThemeProvider';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { PrivateRoutes, PublicRoutes } from './routes';
import { SocketProvider } from './providers';
import { Toaster } from 'react-hot-toast';
function App() {
    const { theme, toggleTheme } = useContext(ThemeContext);
    return (
        <div className={`${theme}`}>
            <BrowserRouter>
                <AuthProvider>
                   <SocketProvider>
                     <Routes>
                         {PublicRoutes.map((r, index) => (
                             <Route {...r} key={index} />
                         ))}
                    
                         {PrivateRoutes.map((r, index) => (
                             <Route key={index} {...r} element={<ProtectedRoute> {r.element} </ProtectedRoute>} />
                         ))}
                     </Routes>
                   </SocketProvider>
                </AuthProvider>
            </BrowserRouter>
            <Toaster duration={4000} />
        </div>
    );
}

export default App;
