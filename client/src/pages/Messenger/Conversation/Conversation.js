import './Conversation.scss';
import Search from '../../../components/Search/Search';
import clsx from 'clsx';
import ConversationItem from './ConversationItem/ConversationItem';
import * as conversationService from '../../../services/conversationService';
import * as messageService from '../../../services/messageService';
import { useEffect, useState, useContext, useRef } from 'react';
import { socketContext } from '../../../providers/Socket/SocketProvider';
import { ConversationContext } from '../../../providers/ConversationProvider/ConversationProvider';
import { useLang } from '../../../hooks';

const Conversation = () => {
    const { socket, currentUserId } = useContext(socketContext);
    const { conversation } = useContext(ConversationContext)
    const [openPopper, setOpenPopper] = useState('');
    const [conversations, setConversations] = useState([]);
    const [activeFilter, setActiveFilter] = useState(1);
    const [activeConversation, setActiveConversation] = useState(conversation._id);
    const { t } = useLang();
    const fetchConversations = async () => {
        try {
            //get toàn bộ conversation
            const conversations = await conversationService.getConversationByUserId(currentUserId);
            for (let i = 0; i < conversations.length; i++) {
                const conversationID = conversations[i]._id;
                //get toàn bộ message của conversation tương ứng
                const messages = await messageService.getMessageByConversationId(conversationID);
                console.log("message >>", messages);
                let totalUnseen = 0;

                for (let j = 0; j < messages.length; j++) {
                    //duyệt từng messages của conversation đó->nếu người gửi không phải mình
                    // và  mảng isSeen  chưa có mình  thì tăng biến totalUnseen lên 1
                    if (messages[j].senderId._id !== currentUserId && !messages[j].isSeen.includes(currentUserId)) {

                        totalUnseen = totalUnseen + 1;
                    }
                }
                //thêm trường totalUnseen vào mảng object conversation
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
                    {t('messenger.filter.all')}
                </span>
                <span onClick={() => setActiveFilter(0)} className={clsx('filter_item', !activeFilter ? 'active' : '')}>
                    {t('messenger.filter.unread')}
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
