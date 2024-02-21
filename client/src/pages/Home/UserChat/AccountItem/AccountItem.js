
import './AccountItem.scss';
import DetailUserChatPopper from '../../../../components/Popper/DetailUserChatPopper/DetailUserChatPopper';
import { useEffect, useState, useContext } from 'react';
import { useLang } from '../../../../hooks';
import { ConversationContext } from '../../../../providers/ConversationProvider/ConversationProvider';
import * as userService from '../../../../services/userService';
import clsx from 'clsx';
function AccountItem({
    activeFilter,
    conversationId,
    onDetail,
    openPopper,
    members,
    isGroup,
    senderId,
    lastMessage,
    totalUnseen,
    onClick,
    onActiveFilter,
}) {
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
        console.log("use Effect")
        const fetchMember = async () => {
            try {
                if (isGroup) {
                }
                const recieverid = members.find((id) => id !== senderId);
                console.log('recieverid', recieverid);
                const user = await userService.getUserById(recieverid);

                console.log("user >>>>",user)
                setUserChat(user);
            } catch (err) {
                console.log(err);
            }
        };
        fetchMember();
    }, [members,conversationId]);

    return (
        <div
            onClick={() => {
                setConversation({
                    recieveInfor: {
                        avatar: userChat.avatarPicture || userChat.groupPicture,
                        name: userChat.username || userChat.groupname,
                        _id: userChat._id,
                        isGroup
                    },
                    _id:conversationId,
                });
                onClick();
                onActiveFilter(conversationId);
            }}
            className={
                'd-flex position-relative account_item_chat' +
                (conversationId === activeFilter ? ' backgroundActive' : '')
            }
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
                <span className={clsx('display_name', totalUnseen > 0 ? 'fw-bold' : '')}>{userChat ? userChat.username || userChat.groupname : ''}</span>
                <br />
                <span className={clsx('last_message', totalUnseen > 0 ? 'fw-bold' : '')}>{lastMessage}</span>
            </div>
            <span className="timer_message">{`5 ${t('home.account_chat_item.timmer.day')}`}</span>
            <button onClick={onDetail} className="detail_btn">
                ...
            </button>
            {totalUnseen > 0 && <div className="num_message_miss">{totalUnseen}</div>}{' '}
        </div>
    );
}

export default AccountItem;
