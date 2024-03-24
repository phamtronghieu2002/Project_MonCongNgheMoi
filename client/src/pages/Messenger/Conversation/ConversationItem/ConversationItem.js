
import './ConversationItem.scss';
import DetailConversationPopper from '../../../../components/Popper/DetailConversationPopper/DetailConversationPopper';
import { useEffect, useState, useContext } from 'react';
import { useLang } from '../../../../hooks';
import { ConversationContext } from '../../../../providers/ConversationProvider/ConversationProvider';
import * as userService from '../../../../services/userService';
import * as groupService from '../../../../services/groupService';
import clsx from 'clsx';
function ConversationItem({
    activeConversation,
    conversationId,
    onDetail,
    openPopper,
    members,
    isGroup,
    currentUserId,
    lastMessage,
    totalUnseen,
    onActiveConversation,
    lastSenderid,
}) {
    const { t } = useLang();
    const [openDetail, setOpenDetail] = useState(false);
    const [conversationCurrent, setConversationCurent] = useState(null);
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

                    const groupId = members[0];
                    const group = await groupService.getGroupById(groupId);
                    setConversationCurent(group);
                    return;
                }
                const recieverid = members.find((id) => id !== currentUserId);
                const user = await userService.getUserById(recieverid);

                setConversationCurent(user);
            } catch (err) {
                console.log(err);
            }
        };
        fetchMember();
    }, [members, conversationId, activeConversation]);

    return (
        <div
            onClick={() => {
                setConversation({
                    recieveInfor: {
                        avatar: conversationCurrent.avatarPicture || conversationCurrent.groupPicture,
                        name: conversationCurrent.username || conversationCurrent.groupName,
                        _id: conversationCurrent._id,
                        isGroup,
                        members: conversationCurrent.members ? conversationCurrent.members : [currentUserId, conversationCurrent._id],
                    },
                    _id: conversationId,
                });

                onActiveConversation(conversationId);
            }}
            className={
                'd-flex position-relative account_item_chat' +
                (conversationId === activeConversation ? ' backgroundActive' : '')
            }
        >
            {openDetail && <DetailConversationPopper />}
            <div className="avatar">
                <img
                    className="single_chat_avatar"
                    src={conversationCurrent ? conversationCurrent.avatarPicture || conversationCurrent.groupPicture : ''}
                    alt="avt"
                />
            </div>
            <div className="infor">
                <span className={clsx('display_name', totalUnseen > 0 ? 'fw-bold' : '')}>{conversationCurrent ? conversationCurrent.username || conversationCurrent.groupName : ''}</span>
                <br />
                <p className={clsx('last_message', totalUnseen > 0 ? 'fw-bold' : '')}>
                    {lastSenderid === currentUserId ? `Bạn: ${lastMessage}` : lastMessage}
                    { }
                </p>
            </div>
            <span className="timer_message">{`5 ${t('messenger.account_chat_item.timmer.day')}`}</span>
            <button onClick={onDetail} className="detail_btn">
                ...
            </button>
            {totalUnseen > 0 && <div className="num_message_miss">{totalUnseen}</div>}{' '}
        </div>
    );
}

export default ConversationItem;
