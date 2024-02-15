import './Chat.scss';
import MessageItem from './MessageItem/MessageItem';
import * as messageService from '..//..//..//..//services//messageService';
import { useLang } from '../../../../hooks';
import { useContext, useEffect, useState, useRef } from 'react';
import { AuthContext } from '../../../../providers/Auth/AuthProvider';
import { ConversationContext } from '../../../../providers/ConversationProvider/ConversationProvider';
import { io } from 'socket.io-client';
function Chat() {
    const { t } = useLang();
    const [messages, setMessages] = useState([]);
    const [textMessage, setTextMessage] = useState('');
    const { conversation } = useContext(ConversationContext);
    const { getUser } = useContext(AuthContext);
    const socket = useRef();
    const user = getUser().data;
    const conversationId = useRef(conversation.conversationId);
    const refInput = useRef();

    useEffect(() => {
        conversationId.current = conversation.conversationId;
    }, [conversation.conversationId]);

    const fetchMessage = async () => {
        try {
            console.log('====================================');
            console.log('current in fetch>>>', conversationId);
            console.log('====================================');
            const conversationID = conversationId.current;
            console.log('conversationID>>>>>>>>>>>>>><<<<', conversationID);
            const messages = await messageService.getMessageByConversationId(conversationID);

            let currentUserid = user._id;
            let texts = [];
            let components = [];
            for (let i = 0; i < messages.length; i++) {
                let text = messages[i].content;
                if (messages[i].senderId == currentUserid) {
                    if (texts.length > 0) {
                        components.push(<MessageItem content={texts} />);
                        texts = [];
                    }
                    components.push(<MessageItem content={text} own />);
                } else {
                    texts.push(text);
                    i + 1 == messages.length && components.push(<MessageItem content={texts} />);
                }
            }
            setMessages(components);
        } catch (error) {
            console.log(error);
        }
    };
    useEffect(() => {
        socket.current = io('http://localhost:9000');
        socket.current.on('getMessage', (data) => {
                if(data.conversationId === conversationId.current)
                {
                    fetchMessage();

                }

        });
    }, [conversationId.current]);
    useEffect(() => {
        fetchMessage();
    }, [conversation.conversationId]);

    useEffect(() => {
        socket.current.emit('addUser', user._id);
        // socket.current.on('getUsers', (users) => {
        //     console.log('users>>', users);
        //     //   setOnlineUsers(
        //     //     user.followings.filter((f) => users.some((u) => u.userId === f))
        //     //   );
        // });
    }, []);

    const handleSendMessage = async () => {
        try {
            const data = {
                senderId: user._id,
                recieverId: conversation.userInfor._id,
                conversationId: conversation.conversationId,
                content: textMessage,
            };
            await messageService.sendMessage(data);
            socket.current.emit('sendMessage', data);
            fetchMessage();
            setTextMessage('');
            refInput.current.focus();
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <div id="chat_container">
            <div className="header">
                <div className="infor">
                    <div className="avatar">
                        <img src={conversation.userInfor.avatar} alt="avatar" />
                    </div>
                    <div>
                        <div className="name fw-bold">
                            <span>{conversation.userInfor.name}</span>
                        </div>

                        <div className="status">
                            <span>{t('home.account_chat_item.status.online')}</span>
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
            </div>

            <div className="chat_content">
                <div className="wrapper_scroll">{messages}</div>
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
