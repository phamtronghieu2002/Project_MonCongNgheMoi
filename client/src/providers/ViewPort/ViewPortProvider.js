import React, { useContext, useEffect, useState } from 'react';
import useViewport from '../../hooks/useViewPort';
import { ConversationContext } from '../ConversationProvider/ConversationProvider';
export const ViewPortContext = React.createContext();
function ViewPortProvider({ children }) {

    const viewPort = useViewport();
    const { conversation } = useContext(ConversationContext)
    const [view, setview] = useState({
        conversation: true,
        chat: true
    });
    useEffect(() => {
        if (viewPort.width < 900) {
            // if (conversation._id) {
            //     setview({ ...view, conversation: !view.chat });
            // }
            setview({ ...view, conversation: !view.chat });

        } else {
            setview({ chat: true, conversation: true });
        }
    }, [viewPort.width]);

    const isViewChat = () => {
        if (viewPort.width < 930) {
            setview({ conversation: false, chat: true });
        }
    }


    const isViewConversation = () => {
        if (viewPort.width < 930) {
            setview({ chat: false, conversation: true });
        }
    }

    return <ViewPortContext.Provider value={{ view, isViewChat, isViewConversation }}>{children}</ViewPortContext.Provider>;
}

export default ViewPortProvider;
