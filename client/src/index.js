import { GlobalStyle, I18nProvider, ThemeProvider,UserChatProvider } from "./providers";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import i18n from "./i18n/I18n";


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <I18nProvider>
    <GlobalStyle>
        <ThemeProvider>
         <UserChatProvider>
           <App />
         </UserChatProvider>
        </ThemeProvider>
    </GlobalStyle>
  </I18nProvider>
);
