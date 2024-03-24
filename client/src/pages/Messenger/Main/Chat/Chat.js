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
import { v4 as uuidv4 } from 'uuid';

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

    function formatDateString(dateString) {
        var inputDate = new Date(dateString);
        var today = new Date();

        if (
            inputDate.getDate() === today.getDate() &&
            inputDate.getMonth() === today.getMonth() &&
            inputDate.getFullYear() === today.getFullYear()
        ) {
            return "hôm nay";
        } else {
            var options = { year: 'numeric', month: '2-digit', day: '2-digit' };
            return inputDate.toLocaleDateString('en-US', options);
        }
    }
    function chuyenDoiThoiGian(timeString) {
        // Tạo một đối tượng Date từ chuỗi thời gian đầu vào
        const date = new Date(timeString);

        // Lấy giờ và phút từ đối tượng Date
        const gio = date.getHours();
        const phut = date.getMinutes();

        // Tạo chuỗi định dạng "9h:11"
        const chuoiThoiGian = gio.toString().padStart(2, '0') + 'h:' + phut.toString().padStart(2, '0');

        return chuoiThoiGian;
    }

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

            let ReceivedMessage = [];
            let sendMessage = [];
            const components = [];
            let senderId = '';
            let preTime = ''
            let curentTime = ''
            for (let i = 0; i < messages.length; i++) {
                let text = messages[i].content;
                let avatar = messages[i].senderId.avatarPicture;
                let timeStamp = formatDateString(messages[i].createdAt);
                let messageTime = chuyenDoiThoiGian(messages[i].createdAt);
                if (!preTime && !curentTime || preTime !== timeStamp) {
                    preTime = timeStamp
                    curentTime = timeStamp
                }


                if (messages[i].senderId._id === currentUserId) {
                    if (ReceivedMessage.length > 0) {
                        components.push(<MessageItem timeStamp={curentTime} key={uuidv4()} content={ReceivedMessage} avatar={messages[i - 1].senderId.avatarPicture} senderName={messages[i - 1].senderId.username} />);
                        ReceivedMessage = [];
                        curentTime = ""
                    }
                    sendMessage.push({ content: text, messageTime });


                } else {
                    if (sendMessage.length > 0) {
                        components.push(<MessageItem timeStamp={curentTime} key={uuidv4()} content={sendMessage} own />)
                        sendMessage = [];
                        curentTime = ""
                    }
                    if (senderId != messages[i].senderId._id) {
                        if (!senderId) {
                            senderId = messages[i].senderId._id;
                        } else {
                            senderId = messages[i].senderId._id;

                            ReceivedMessage.length > 0 && components.push(<MessageItem timeStamp={curentTime} key={uuidv4()} content={ReceivedMessage} avatar={messages[i - 1].senderId.avatarPicture} senderName={messages[i - 1].senderId.username} />);
                            ReceivedMessage = [];
                            curentTime = ""
                        }
                    }
                    ReceivedMessage.push({ content: text, messageTime });

                }

                i + 1 === messages.length && (sendMessage.length > 0 ? components.push(<MessageItem timeStamp={curentTime} key={uuidv4()} content={sendMessage} own />) : components.push(<MessageItem timeStamp={curentTime} key={uuidv4()} content={ReceivedMessage} avatar={avatar} senderName={messages[i].senderId.username} />))
            }



            // update status seen message
            senderId && (await messageService.updateStatus(senderId, conversation._id, currentUserId));
            setMessagesComponent([...components]);
            socket.emit("reRenderConversations", [currentUserId]);
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
            await messageService.updateLastMessage(conversation._id, textMessage, currentUserId);
            setMessages([...messages, new_message]);
            socket.emit('sendMessage', { ...data, new_message });
            socket.emit('reRenderConversations', conversation.recieveInfor.members);
            setTextMessage('');

            refInput.current.focus();
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <div id="chat_container" className=' position-relative'>

            <div className="header position-relative bg-white">
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

            <div className="chat_content position-relative  ">

                <div className="wrapper_scroll">
                    {messagesComponent}


                </div>
            </div>

            <div className="chat_input_container bg-white">
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
