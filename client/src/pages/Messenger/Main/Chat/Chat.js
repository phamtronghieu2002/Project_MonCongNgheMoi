import './Chat.scss';
import MessageItem from './MessageItem/MessageItem';
import Notify from './Notify/Notify';
import * as messageService from '..//..//..//..//services//messageService';
import * as userService from '..//..//..//..//services//userService';
import * as friendService from '..//..//..//..//services//requestFriendService';
import { toast, Toaster } from 'react-hot-toast';
import { useLang } from '../../../../hooks';
import { useContext, useEffect, useState, useRef, useCallback } from 'react';
import { ConversationContext } from '../../../../providers/ConversationProvider/ConversationProvider';
import { socketContext } from '../../../../providers/Socket/SocketProvider';

function Chat() {
    const { conversation } = useContext(ConversationContext);
    const { currentUserId, socket } = useContext(socketContext);
    const { t } = useLang();


    const [messages, setMessages] = useState([]);
    const [messagesComponent, setMessagesComponent] = useState([]);
    const [textMessage, setTextMessage] = useState('');
    const [isFriend, setIsFriend] = useState(false);
    const [statusRequest, setStatusRequest] = useState(false);
    const [request_id, setRequestId] = useState(0);



    const refInput = useRef();

    const handleSendRequestFriend = async () => {
        try {
            const senderId = currentUserId;
            const recieverId = conversation.recieveInfor._id;
            const requestFriend = await friendService.sendRequestFriend(senderId, recieverId);
            console.log('requestFriend', requestFriend);
            setRequestId(requestFriend._id);
            setStatusRequest(true);
            socket.emit('sendRequestFriend', { recieverId });

            toast.success('Đã gửi yêu cầu kết bạn');
        } catch (error) {
            console.log(error);
        }
    };

    const handleCancelRequestFriend = async () => {
        try {
            const recieverId = conversation.recieveInfor._id;
            friendService.cancelRequestFriend(0, request_id);
            setStatusRequest(false);
            socket.emit('sendRequestFriend', { recieverId });
            toast.success('Đã huy gửi yêu cầu kết bạn');
        } catch (error) {
            console.log(error);
        }
    };
    const handleDataMessages = async (messages) => {
        try {

            let texts = [];
            const components = [];
            let senderId = '';

            for (let i = 0; i < messages.length; i++) {
                let text = messages[i].content;
                let avatar = messages[i].senderId.avatarPicture;

                if (messages[i].senderId._id === currentUserId) {
                    if (texts.length > 0) {
                        components.push(<MessageItem key={i - 1} content={texts} avatar={messages[i - 1].senderId.avatarPicture} senderName={messages[i - 1].senderId.username} />);
                        texts = [];


                    }
                    components.push(<MessageItem key={i} content={text} own />);
                } else {
                    if (senderId != messages[i].senderId._id) {
                        if (!senderId) {
                            senderId = messages[i].senderId._id;
                        } else {
                            senderId = messages[i].senderId._id;

                            texts.length > 0 && components.push(<MessageItem key={i - 1} content={texts} avatar={messages[i - 1].senderId.avatarPicture} senderName={messages[i - 1].senderId.username} />);
                            texts = [];
                        }
                    }
                    texts.push(text);

                    i + 1 === messages.length && components.push(<MessageItem key={i} content={texts} avatar={avatar} senderName={messages[i].senderId.username} />);
                }
            }



            // update status seen message
            senderId && (await messageService.updateStatus(senderId, conversation._id, currentUserId));
            socket.emit("")
            setMessagesComponent([...components]);
        } catch (error) {
            console.log(error);
        }
    };

    const fetchMessage = async () => {
        if (conversation._id) {
            try {
                const messages = await messageService.getMessageByConversationId(conversation._id);
                setMessages([...messages]);
            } catch (error) {
                console.log(error);
            }
        }
    };

    const checkFriend = async () => {
        const senderId = currentUserId;
        const friendId = conversation.recieveInfor._id;
        const isGroup = conversation.recieveInfor.isGroup;
        if (!isGroup) {
            const isFriend = await userService.isFriend(senderId, friendId);
            setIsFriend(typeof isFriend === 'boolean' ? isFriend : isFriend.data === 2)
            return;
        }
        setIsFriend(true)
    };

    const CheckIsSendRequestFriend = async () => {
        try {
            const senderId = currentUserId;
            const recieverId = conversation.recieveInfor._id;
            const isSendRequest = await friendService.isSendRequestFriend(senderId, recieverId);
            setStatusRequest(isSendRequest.status);
        } catch (error) {
            console.log(error);
        }
    };
    useEffect(() => {

        checkFriend();
        fetchMessage();
        CheckIsSendRequestFriend();

    }, [conversation._id]);

    useEffect(() => {
        const onMessage = ({ conversationId, new_message }) => {

            if (conversationId === conversation._id) {
                setMessages((prev) => [...prev, new_message]);
            }

        }

        const onReRenderRequestFriend = () => {
            checkFriend();
        }

        socket.on('getMessage', onMessage);
        socket.on('re-renderFriendRequest', onReRenderRequestFriend);
        return () => {
            socket.off('getMessage', onMessage);
            socket.off('re-renderFriendRequest', onReRenderRequestFriend);
        };
    }, [conversation._id]);

    useEffect(() => {
        handleDataMessages(messages);
    }, [messages]);




    const handleSendMessage = async () => {
        try {
            const data = {
                senderId: currentUserId,
                recieverId: conversation.recieveInfor._id,
                conversationId: conversation._id,
                content: textMessage,
                isGroup: conversation.recieveInfor.isGroup,
                members: conversation.recieveInfor.members
            };
            const new_message = await messageService.sendMessage(data);
            await messageService.updateLastMessage(conversation._id, textMessage);
            console.log("new_messsage >>>", new_message)
            setMessages([...messages, new_message]);
            socket.emit('sendMessage', { ...data, new_message });
            setTextMessage('');
            refInput.current.focus();
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <div id="chat_container">
            <div className="header position-relative">
                <div className="infor">
                    <div className="avatar">
                        <img src={conversation.recieveInfor.avatar} alt="avatar" />
                    </div>
                    <div>
                        <div className="name fw-bold">
                            <span>{conversation.recieveInfor.name}</span>
                        </div>

                        <div className="status">
                            <span>{t('messenger.account_chat_item.status.online')}</span>
                        </div>
                    </div>
                </div>
                <div className="actions">
                    <button className="group_plus action_btn">
                        <img
                            width="80"
                            height="80"
                            src="https://img.icons8.com/dotty/80/add-user-group-man-woman.png"
                            alt="add-user-group-man-woman"
                        />
                    </button>
                    <button className=" action_btn">
                        <img
                            width="50"
                            height="50"
                            src="https://img.icons8.com/ios/50/search--v1.png"
                            alt="search--v1"
                        />
                    </button>
                    <button className=" action_btn">
                        <img
                            width="50"
                            height="50"
                            src="https://img.icons8.com/ios/50/video-call.png"
                            alt="video-call"
                        />
                    </button>
                    <button className=" action_btn">
                        <img
                            width="48"
                            height="48"
                            src="https://img.icons8.com/fluency/48/switch-on.png"
                            alt="switch-on"
                        />
                    </button>
                </div>
                {!isFriend && (
                    <Notify
                        statusRequest={statusRequest}
                        onSendRequestFriend={handleSendRequestFriend}
                        onCancelRequestFriend={handleCancelRequestFriend}
                    />
                )}
            </div>

            <div className="chat_content">

                <div className="wrapper_scroll">{messagesComponent}</div>
            </div>

            <div className="chat_input_container">
                <div className="actions">
                    <button className="action_btn">
                        <img
                            width="66"
                            height="66"
                            src="https://img.icons8.com/external-smashingstocks-flat-smashing-stocks/66/external-Sticky-Note-school-smashingstocks-flat-smashing-stocks.png"
                            alt="external-Sticky-Note-school-smashingstocks-flat-smashing-stocks"
                        />
                    </button>{' '}
                    <button className="action_btn">
                        <img
                            width="58"
                            height="58"
                            src="https://img.icons8.com/external-sbts2018-lineal-color-sbts2018/58/external-album-photography1-sbts2018-lineal-color-sbts2018-1.png"
                            alt="external-album-photography1-sbts2018-lineal-color-sbts2018-1"
                        />
                    </button>
                    <button className="action_btn">
                        <img
                            width="48"
                            height="48"
                            src="https://img.icons8.com/color/48/employee-card.png"
                            alt="employee-card"
                        />
                    </button>
                    <button className="action_btn">
                        <img
                            width="100"
                            height="100"
                            src="https://img.icons8.com/avantgarde/100/screenshot.png"
                            alt="screenshot"
                        />
                    </button>
                    <button className="action_btn">
                        <img
                            width="24"
                            height="24"
                            src="https://img.icons8.com/external-tanah-basah-basic-outline-tanah-basah/24/external-attache-file-tanah-basah-basic-outline-tanah-basah.png"
                            alt="external-attache-file-tanah-basah-basic-outline-tanah-basah"
                        />
                    </button>
                </div>
                <div className="chat_input">
                    <input
                        ref={refInput}
                        type="text"
                        placeholder="Aa"
                        value={textMessage}
                        onChange={(e) => setTextMessage(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                    />
                    <button onClick={handleSendMessage} className="action_btn">
                        <img
                            width="30"
                            height="30"
                            src="https://img.icons8.com/ios-glyphs/30/000000/sent.png"
                            alt="sent"
                        />
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Chat;
