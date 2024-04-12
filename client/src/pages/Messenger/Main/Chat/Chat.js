import EmojiPicker from 'emoji-picker-react';
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
import { formatDateString, chuyenDoiThoiGian } from '../../../../utils/chatUtil';
import axios from 'axios';
function Chat() {
    const { conversation } = useContext(ConversationContext);
    const { currentUserId, socket } = useContext(socketContext);
    const { t } = useLang();

    const [isLoading,setIsloading]=useState(false);

    const [messages, setMessages] = useState([]);
    const [messagesComponent, setMessagesComponent] = useState([]);
    const [textMessage, setTextMessage] = useState('');
    const [isFriend, setIsFriend] = useState(false);
    const [statusRequest, setStatusRequest] = useState(false);
    const [request_id, setRequestId] = useState(0);
    const [isOpenSticker, setIsOpenSticker] = useState(false);
    const refInput = useRef();
    const fileImageRef = useRef();
    const fileRef = useRef();

    const onUploadImageFile = () => {
        fileImageRef.current.click();
    };
    const onUploadFile = () => {
        fileRef.current.click();
    };
    // xử lí gửi ảnh
    const handleFileImageChange = async (e) => {

        try {
            const file = e.target.files[0];
            const formData = new FormData();
            formData.append('file', file);
            setIsloading(true)
            //upload image
            const data = await messageService.uploadImageMessage(formData);
            const imgMessage = data.imgURL
            //gửi image
            await handleSendMessage("image", imgMessage);
            setIsloading(false)
        } catch (error) {
            console.error('Error uploading image:', error);
        }
    };

    //xử lí gửi file
    const handleFileChange = async (e) => {

        try {
            const formData = new FormData();

            formData.append("file", e.target.files[0]);
            //upload file
            setIsloading(true)
            const data = await messageService.uploadFileMessage(formData);
            const fileMessage = data.fileName;
            await handleSendMessage("file", fileMessage);
            setIsloading(false)
        } catch (error) {
            console.log(error);
        }

    };

    //xử lí gửi icon
    const handleIconMessage = async (data) => {
        const iconMessage = data.imageUrl
        //gửi icon
        await handleSendMessage("icon", iconMessage);
        setIsOpenSticker(false);
    }
    //xử lí gửi yêu cầu kết bạn
    const handleSendRequestFriend = async () => {
        try {
            const senderId = currentUserId;
            const recieverId = conversation.recieveInfor._id;
            const requestFriend = await friendService.sendRequestFriend(senderId, recieverId);


            setRequestId(requestFriend._id);
            setStatusRequest(true);
            socket.emit('sendRequestFriend', { recieverId });

            toast.success('Đã gửi yêu cầu kết bạn');
        } catch (error) {
            console.log(error);
        }
    };
    // xử lí hủy gửi yêu cầu kết bạn
    const handleCancelRequestFriend = async () => {
        try {
            const recieverId = conversation.recieveInfor._id;
            await friendService.cancelRequestFriend(request_id);
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
            let preTime = '';
            let curentTime = '';
            for (let i = 0; i < messages.length; i++) {

                let avatar = messages[i].senderId.avatarPicture;
                let timeStamp = formatDateString(messages[i].createdAt);
                let messageTime = chuyenDoiThoiGian(messages[i].createdAt);
                if ((!preTime && !curentTime) || preTime !== timeStamp) {
                    preTime = timeStamp;
                    curentTime = timeStamp;
                }

                if (messages[i].senderId._id === currentUserId) {
                    if (ReceivedMessage.length > 0) {
                        components.push(
                            <MessageItem
                                timeStamp={curentTime}
                                key={uuidv4()}
                                content={ReceivedMessage}
                                avatar={messages[i - 1].senderId.avatarPicture}
                                senderName={messages[i - 1].senderId.username}
                            />,
                        );
                        ReceivedMessage = [];
                        curentTime = '';
                    }
                    sendMessage.push({ ...messages[i], messageTime });
                } else {
                    if (sendMessage.length > 0) {
                        components.push(
                            <MessageItem timeStamp={curentTime} key={uuidv4()} content={sendMessage} own />,
                        );
                        sendMessage = [];
                        curentTime = '';
                    }
                    if (senderId != messages[i].senderId._id) {
                        if (!senderId) {
                            senderId = messages[i].senderId._id;
                        } else {
                            senderId = messages[i].senderId._id;

                            ReceivedMessage.length > 0 &&
                                components.push(
                                    <MessageItem
                                        timeStamp={curentTime}
                                        key={uuidv4()}
                                        content={ReceivedMessage}
                                        avatar={messages[i - 1].senderId.avatarPicture}
                                        senderName={messages[i - 1].senderId.username}
                                    />,
                                );
                            ReceivedMessage = [];
                            curentTime = '';
                        }
                    }
                    ReceivedMessage.push({ ...messages[i], messageTime });
                }

                i + 1 === messages.length &&
                    (sendMessage.length > 0
                        ? components.push(
                            <MessageItem timeStamp={curentTime} key={uuidv4()} content={sendMessage} own />,
                        )
                        : components.push(
                            <MessageItem
                                timeStamp={curentTime}
                                key={uuidv4()}
                                content={ReceivedMessage}
                                avatar={avatar}
                                senderName={messages[i].senderId.username}
                            />,
                        ));
            }

            // update status seen message
            senderId && (await messageService.updateStatus(senderId, conversation._id, currentUserId));
            setMessagesComponent([...components]);
            socket.emit('reRenderConversations', [currentUserId]);
        } catch (error) {
            console.log(error);
        }
    };

    const fetchMessage = async () => {
        if (conversation._id) {
            try {
                const messages = await messageService.getMessageByConversationId(conversation._id);
                setMessages(messages);
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
            setIsFriend(typeof isFriend === 'boolean' ? isFriend : isFriend.data === 2);
            return;
        }
        setIsFriend(true);
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
    //đăng kí socket nhận tin nhắn
    useEffect(() => {

        
        const onMessage = ({ conversationId, new_message }) => {
     
            if (conversationId === conversation._id) {
                setMessages((prev) => [...prev, new_message]);
            }
        };

        const onReRenderRequestFriend = () => {
            checkFriend();
        };

        socket.on('getMessage', onMessage);
        socket.on('re-renderFriendRequest', onReRenderRequestFriend);
        return () => {
            socket.off('getMessage', onMessage);
            socket.off('re-renderFriendRequest', onReRenderRequestFriend);
        };
    }, [conversation._id]);
    // đăng kí socket nhận emoji tin nhắn
    useEffect(() => {
        const onMessageEmoji = ({ conversationId, new_message }) => {
            if (conversationId === conversation._id) {
                //
          
                setMessages((prev) => {
                    prev.forEach((message) => {
                        if (message._id === new_message._id) {
                            message.reaction = new_message.reaction;

                        }
                    }
                    )
                    console.log('prev', [...prev]);
                    return [...prev]
                });
            }
        };


        socket.on('getMessageEmoji', onMessageEmoji);
        return () => {
            socket.off('getMessageEmoji', onMessageEmoji);
        };
    }, [conversation._id]);

    //đăng kí socket nhận tin nhắn đã xóa
    useEffect(() => {
        const onMessageDelete = async ({ conversationId, new_message, senderId }) => {
            console.log('new_message', new_message);



            if (conversationId === conversation._id) {
                //
                await messageService.updateLastMessage(conversationId, "đã xóa 1 tin nhắn", senderId);
                socket.emit('reRenderConversations', conversation.recieveInfor.members);
                setMessages((prev) => {
                    prev.forEach((message) => {
                        if (message._id === new_message._id) {
                            message.isDeleted = new_message.isDeleted;

                        }
                    }
                    )
                    console.log('prev', [...prev]);
                    return [...prev]
                });
            }
        };
        socket.on('getMessageDelete', onMessageDelete);
        return () => {
            socket.off('getMessageDelete', onMessageDelete);
        };
    }, [conversation._id]);
    useEffect(() => {
        handleDataMessages(messages);
    }, [messages]);

    const handleLastMessage = (type, content) => {

        switch (type) {
            case 'text':
                return content;
            case 'image':
                return 'Đã gửi một ảnh';
            case 'icon':
                return 'Đã gửi một icon';
            case 'file':
                return 'Đã gửi một file';
        }
    }
    const handleSendMessage = async (type = "text", content = textMessage) => {
        try {
            const data = {
                senderId: currentUserId,
                conversationId: conversation._id,
                content,
                members: conversation.recieveInfor.members,
            };

            const new_message = await messageService.sendMessage(type, data); //gửi dô đb
            const lastMessage = handleLastMessage(type, content);

            await messageService.updateLastMessage(conversation._id, lastMessage, currentUserId);
            setMessages([...messages, new_message]);
            socket.emit('sendMessage', { ...data, new_message });// gửi socket
            socket.emit('reRenderConversations', conversation.recieveInfor.members);
            setTextMessage('');

            refInput.current.focus();
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <div id="chat_container" className=" position-relative">
            {isLoading && <div className='loading_pending_messageSend'>  </div>}

           
            <div
                className="background_conversation"
                style={{
                    backgroundImage: `url(${conversation.recieveInfor?.avatar})`,
                    backgroundSize: 'cover',
                    filter: 'blur(10px)',
                    position: 'absolute',
                    opacity: 0.07,
                    inset: 0,

                    zIndex: -99
                }}
            ></div>
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
                <div className="wrapper_scroll">{messagesComponent}</div>
            </div>

            <div className="chat_input_container bg-white">
                <div className="actions">
                    <input
                        ref={fileImageRef}
                        type="file"
                        className="visually-hidden"
                        accept="image/*"
                        onChange={handleFileImageChange}
                    />

                    <button className="action_btn">
                        <i class="fa-regular fa-note-sticky"></i>
                    </button>{' '}
                    <button
                        onClick={onUploadFile}
                        className="action_btn">
                        <input
                            ref={fileRef}
                            type="file"
                            className="visually-hidden"
                            accept="*/*"
                            onChange={handleFileChange}
                        />

                        <i class="fa-solid fa-paperclip"></i>
                    </button>
                    <button
                        onClick={onUploadImageFile}
                        className="action_btn">
                        <i class="fa-regular fa-image"></i>
                    </button>

                </div>
                <div className="chat_input position-relative">
                    {isOpenSticker &&
                        <EmojiPicker onEmojiClick={handleIconMessage} />}
                    <input
                        ref={refInput}
                        type="text"
                        placeholder="Aa"
                        value={textMessage}
                        onChange={(e) => setTextMessage(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                    />

                    <button
                        onClick={() => setIsOpenSticker(!isOpenSticker)}
                        className="action_btn position-relative">


                        <i class="fa-regular fa-face-smile"></i>

                    </button>
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
