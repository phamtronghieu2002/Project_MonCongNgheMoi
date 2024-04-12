import ProtectedRoute from './components/ProtectedRoute';
import React, { useContext } from 'react';
import { ThemeContext } from './providers/ThemeProvider/ThemeProvider';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { PrivateRoutes, PublicRoutes } from './routes';
import DocViewer, { DocViewerRenderers } from '@cyntler/react-doc-viewer';
import { Toaster } from 'react-hot-toast';
import DownloadLink from "react-download-link";
import ModalInformationUser from './components/Modal/ModalInforationUser/ModalInformationUser';

function App() {

    const { theme, toggleTheme } = useContext(ThemeContext);


    return (
        <div
            className={`${theme}`}>
            {/* <DownloadLink
                label="Save"
                filename="http://localhost:8080/files/useCase_DangKi_QuanLiTaiKhoan.docx"
                exportFile={() => "My cached data"}
            />
            <DocViewer
                documents={[{ uri: 'http://localhost:8080/files/1712495754716itpm04-140329000717-phpapp02.pdf' }]}
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
