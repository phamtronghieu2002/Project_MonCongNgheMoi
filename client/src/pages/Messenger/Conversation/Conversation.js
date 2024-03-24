import './Conversation.scss';
import Search from '../../../components/Search/Search';
import clsx from 'clsx';
import ConversationItem from './ConversationItem/ConversationItem';
import * as conversationService from '../../../services/conversationService';
import * as messageService from '../../../services/messageService';
import { useEffect, useState, useContext, useRef } from 'react';
import { socketContext } from '../../../providers/Socket/SocketProvider';
import { ConversationContext } from '../../../providers/ConversationProvider/ConversationProvider';

const Conversation = () => {
    const { socket, currentUserId } = useContext(socketContext);
    const { conversation } = useContext(ConversationContext)
    const [openPopper, setOpenPopper] = useState('');
    const [conversations, setConversations] = useState([]);
    const [activeFilter, setActiveFilter] = useState(1);
    const [activeConversation, setActiveConversation] = useState(conversation._id);
    const fetchConversations = async () => {
        try {

            const conversations = await conversationService.getConversationByUserId(currentUserId);
            for (let i = 0; i < conversations.length; i++) {
                const conversationID = conversations[i]._id;
                const messages = await messageService.getMessageByConversationId(conversationID);
                let totalUnseen = 0;

                for (let j = 0; j < messages.length; j++) {
                    if (messages[j].senderId._id !== currentUserId && !messages[j].isSeen.includes(currentUserId)) {
                        totalUnseen = totalUnseen + 1;
                    }
                }
                conversations[i].totalUnseen = totalUnseen;
            }
            setConversations([...conversations]);
        } catch (err) {
            console.log(err);
        }
    };



    useEffect(() => {
        const onRerenderConversations = () => {
            fetchConversations();
            setActiveConversation(conversation._id)
        }
        socket.on('reRenderConversations', onRerenderConversations);

        return () => {
            socket.off('reRenderConversations', onRerenderConversations);
        }
    }, []);

    useEffect(() => {
        if (activeFilter) {
            fetchConversations();
        } else {
            const filterConversations = conversations.filter((item) => item.totalUnseen > 0);
            setConversations([...filterConversations]);
        }
    }, [activeFilter]);
    return (
        <div id="wp_conversation" className='bg-white'>
            <Search />
            <div className="filter_conversations">
                <span onClick={() => setActiveFilter(1)} className={clsx('filter_item', activeFilter ? 'active' : '')}>
                    Tất cả
                </span>
                <span onClick={() => setActiveFilter(0)} className={clsx('filter_item', !activeFilter ? 'active' : '')}>
                    Chưa đọc
                </span>
            </div>
            <div className="conversations">
                {conversations.length > 0 &&
                    conversations.map((item, index) => (
                        <ConversationItem
                            activeConversation={activeConversation}
                            onActiveConversation={setActiveConversation}
                            conversationId={item._id}
                            currentUserId={currentUserId}
                            key={index}
                            {...item}
                            openPopper={openPopper}
                            onDetail={() => setOpenPopper(item._id)}
                        />
                    ))}
            </div>
        </div>
    );
};

export default Conversation;
