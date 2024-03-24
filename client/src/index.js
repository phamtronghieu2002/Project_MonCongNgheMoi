import {
    GlobalStyle,
    I18nProvider,
    ThemeProvider,
    ConversationProvider,
    AuthProvider,
    SocketProvider,
} from './providers';
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import i18n from './i18n/I18n';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <I18nProvider>
        <AuthProvider>
            <SocketProvider>
                <ThemeProvider>
                    <ConversationProvider>
                        <App />
                    </ConversationProvider>
                </ThemeProvider>
            </SocketProvider>
        </AuthProvider>

    </I18nProvider>,
);
