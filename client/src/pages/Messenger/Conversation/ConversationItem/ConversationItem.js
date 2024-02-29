
import './ConversationItem.scss';
import DetailConversationPopper from '../../../../components/Popper/DetailConversationPopper/DetailConversationPopper';
import { useEffect, useState, useContext } from 'react';
import { useLang } from '../../../../hooks';
import { ConversationContext } from '../../../../providers/ConversationProvider/ConversationProvider';
import * as userService from '../../../../services/userService';
import * as groupService from '../../../../services/groupService';
import clsx from 'clsx';
function ConversationItem({
    activeFilter,
    conversationId,
    onDetail,
    openPopper,
    members,
    isGroup,
    senderId,
    lastMessage,
    totalUnseen,

    onActiveFilter,
}) {
    const { t } = useLang();
    const [openDetail, setOpenDetail] = useState(false);
    const [ConversationCurrent, setConversationCurent] = useState(null);
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
                    
                    const groupId=members[0];
                    const group = await groupService.getGroupById(groupId);
                    setConversationCurent(group);
                    return;
                }
                const recieverid = members.find((id) => id !== senderId);
                const user = await userService.getUserById(recieverid);

                console.log("user >>>>",user)
                setConversationCurent(user);
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
                        avatar: ConversationCurrent.avatarPicture || ConversationCurrent.groupPicture,
                        name: ConversationCurrent.username || ConversationCurrent.groupName,
                        _id: ConversationCurrent._id,
                        isGroup,
                        members:ConversationCurrent.members
                    },
                    _id:conversationId,
                });
     
                onActiveFilter(conversationId);
            }}
            className={
                'd-flex position-relative account_item_chat' +
                (conversationId === activeFilter ? ' backgroundActive' : '')
            }
        >
            {openDetail && <DetailConversationPopper />}
            <div className="avatar">
                <img
                    className="single_chat_avatar"
                    src={ConversationCurrent ? ConversationCurrent.avatarPicture || ConversationCurrent.groupPicture : ''}
                    alt="avt"
                />
            </div>
            <div className="infor">
                <span className={clsx('display_name', totalUnseen > 0 ? 'fw-bold' : '')}>{ConversationCurrent ? ConversationCurrent.username || ConversationCurrent.groupName : ''}</span>
                <br />
                <span className={clsx('last_message', totalUnseen > 0 ? 'fw-bold' : '')}>{lastMessage}</span>
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
