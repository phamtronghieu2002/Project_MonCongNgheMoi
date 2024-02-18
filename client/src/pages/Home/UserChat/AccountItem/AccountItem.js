import React from 'react';
import './AccountItem.scss';
import DetailUserChatPopper from '../../../../components/Popper/DetailUserChatPopper/DetailUserChatPopper';
import { useEffect, useState, useContext } from 'react';
import { useLang } from '../../../../hooks';
import { ConversationContext } from '../../../../providers/ConversationProvider/ConversationProvider';
import * as userService from '../../../../services/userService';
function AccountItem({ conversationId, onDetail, openPopper, members, isGroup, senderId, lastMessage, totalUnseen }) {
    const { t } = useLang();
    const [openDetail, setOpenDetail] = useState(false);
    const [userChat, setUserChat] = useState(null);
    const { conversation, setConversation } = useContext(ConversationContext);

    useEffect(() => {
        window.addEventListener('click', () => setOpenDetail(false));
        if (openPopper === conversationId) {
            setTimeout(() => {
                setOpenDetail(true);
            }, 200);
        } else {
            openDetail && setOpenDetail(false);
        }
    }, [openPopper]);

    useEffect(() => {
        const fetchMember = async () => {
            try {
                if (isGroup) {
                }
                const recieverid = members.find((id) => id !== senderId);
                console.log('recieverid', recieverid);
                const res = await userService.getUserById(recieverid);
                setUserChat(res);
            } catch (err) {
                console.log(err);
            }
        };
        fetchMember();
    }, []);

    return (
        <div
            onClick={() => {
                setConversation({
                    userInfor: {
                        avatar: userChat.avatarPicture || userChat.groupPicture,
                        name: userChat.username || userChat.groupname,
                        _id: userChat._id,
                        type: 'user',
                    },
                    conversationId,
                });
            }}
            className="d-flex position-relative account_item_chat"
        >
            {openDetail && <DetailUserChatPopper />}
            <div className="avatar">
                <img
                    className="single_chat_avatar"
                    src={userChat ? userChat.avatarPicture || userChat.groupPicture : ''}
                    alt="avt"
                />
            </div>
            <div className="infor">
                <span className="display_name">{userChat ? userChat.username || userChat.groupname : ''}</span>
                <br />
                <span className="last_message">{lastMessage}</span>
            </div>
            <span className="timer_message">{`5 ${t('home.account_chat_item.timmer.day')}`}</span>
            <button onClick={onDetail} className="detail_btn">
                ...
            </button>
            {totalUnseen > 0 && <div className="num_message_miss">{totalUnseen}</div>}{' '}
           
        </div>
    );
}

export default React.memo(AccountItem);
