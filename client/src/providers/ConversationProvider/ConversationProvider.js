import React from 'react';
import { useState } from 'react';
export const ConversationContext = React.createContext();
function ConversationProvider({ children }) {
    const [conversation, setConversation] = useState({
active:false,userInfor:{}
    });
    return <ConversationContext.Provider value={{conversation, setConversation}}>{children}</ConversationContext.Provider>;
}

export default ConversationProvider;
