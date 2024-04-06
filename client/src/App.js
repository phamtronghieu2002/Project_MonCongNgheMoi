import ProtectedRoute from './components/ProtectedRoute';
import React, { useContext } from 'react';
import { ThemeContext } from './providers/ThemeProvider/ThemeProvider';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { PrivateRoutes, PublicRoutes } from './routes';
import DocViewer, { DocViewerRenderers } from '@cyntler/react-doc-viewer';
import { Toaster } from 'react-hot-toast';

import ModalInformationUser from './components/Modal/ModalInforationUser/ModalInformationUser';

function App() {
 
    const { theme, toggleTheme } = useContext(ThemeContext);
 

    return (
        <div 
     
        className={`${theme}`}>
        
            {/* <DocViewer
                documents={[{ uri: 'http://localhost:8080/files/abc.txt' }]}
                pluginRenderers={DocViewerRenderers}
            /> */}
            <ModalInformationUser />
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
