import React from 'react';
import { useState } from 'react';
export const UserChatContext = React.createContext();
function UserChatProvider({ children }) {
    const [userChat, setUserChat] = useState({});
    return <UserChatContext.Provider value={(userChat, setUserChat)}>{children}</UserChatContext.Provider>;
}

export default UserChatProvider;
