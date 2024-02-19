import './UserChat.scss';
import Search from '../../../components/Search/Search';
import clsx from 'clsx';
import AccountItem from './AccountItem/AccountItem';
import * as conversationService from '../../../services/conversationService';
import * as messageService from '../../../services/messageService';
import { useEffect, useState, useContext, useRef } from 'react';

import { socketContext } from '../../../providers/Socket/SocketProvider';
const UserChat = () => {
    const [activeFilter, setActivFilter] = useState(1);
    const [openPopper, setOpenPopper] = useState('');
    const [conversations, setConversations] = useState([]);
    const { socket, currentUserId } = useContext(socketContext);
   
    const currentUserIdRef = useRef(currentUserId);

    const fetchConversations = async () => {
        try {
            const conversations = await conversationService.getConversationByUserId(currentUserIdRef.current);
            for (let i = 0; i < conversations.length; i++) {
                const conversationID = conversations[i]._id;
                const messages = await messageService.getMessageByConversationId(conversationID);
                let totalUnseen = 0;

                for (let j = 0; j < messages.length; j++) {
                    if (messages[j].senderId !== currentUserIdRef.current && !messages[j].isSeen) {
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
        fetchConversations();
    }, []);

    useEffect(() => {
        socket.on('reRenderConversations', ({ senderId, content, conversationId }) => {
          
            fetchConversations();
        });
    }, []);
    return (
        <div id="wp_user_chat">
            <Search />
            <div className="filter_chat">
                <span onClick={() => setActivFilter(1)} className={clsx('filter_item', activeFilter ? 'active' : '')}>
                    Tất cả
                </span>
                <span onClick={() => setActivFilter(0)} className={clsx('filter_item', !activeFilter ? 'active' : '')}>
                    Chưa đọc
                </span>
            </div>
            <div className="usersChat">
                {[...conversations].length > 0 &&
                    conversations.map((item, index) => (
                        <AccountItem
                            activeFilter={activeFilter}
                            onActiveFilter={setActivFilter}
                            onClick={fetchConversations}
                            conversationId={item._id}
                            senderId={currentUserId}
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

export default UserChat;
