import React, { useEffect, useState } from 'react';
import useViewport from '../../hooks/useViewPort';
export const ViewPortContext = React.createContext();
function ViewPortProvider({ children }) {

    const viewPort = useViewport();
    const [view, setview] = useState({
        conversation: true,
        chat: true
    });
    useEffect(() => {
        if (viewPort.width < 900) {
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
