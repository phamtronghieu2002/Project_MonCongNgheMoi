import React from 'react';
import { useState } from 'react';
export const ConversationContext = React.createContext();
function ConversationProvider({ children }) {
    const [conversation, setConversation] = useState({
        recieveInfor: {}, conversationId: ""
    });

    const setCurrentConversation = (avatar, name, _id, isGroup, members, conversationId) => {
        setConversation({ recieveInfor: { avatar, name, _id, isGroup, members }, _id: conversationId })
    }
    return <ConversationContext.Provider value={{ conversation, setCurrentConversation }}>{children}</ConversationContext.Provider>;
}

export default ConversationProvider;
