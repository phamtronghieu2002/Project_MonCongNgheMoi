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
    const setMembers = (members) => {
        setConversation({ ...conversation, recieveInfor: { ...conversation.recieveInfor, members: [...conversation.recieveInfor.members, ...members] } });
    }

    const getMembers = () => {
        return conversation.recieveInfor.members;
    }
    return <ConversationContext.Provider value={{ conversation, setMembers, setCurrentConversation, getMembers }}>{children}</ConversationContext.Provider>;
}

export default ConversationProvider;
