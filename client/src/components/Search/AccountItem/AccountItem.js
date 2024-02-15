import './AccountItem.scss';
import * as conversationService from '../../../services/conversationService';
import { useContext } from 'react';
import { ConversationContext } from '../../../providers/ConversationProvider/ConversationProvider';
import { AuthContext } from '../../../providers/Auth/AuthProvider';
function AccountItem({ avatarPicture, username, groupPicture, groupName, _id, type }) {
    const { setConversation, conversation } = useContext(ConversationContext);
    const { getUser } = useContext(AuthContext);
    const user = getUser();
    console.log(conversation)
    const avatar = avatarPicture || groupPicture;
    const name = username || groupName;
    const handleCreateConversation = async () => {
        try {
            const res = await conversationService.createConversation(user.data._id, _id, type);
            setConversation({
                active: true,
                userInfor: { avatar, name, _id, type },
                conversationId: res._id,
            });
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <div
            onClick={() => {
                handleCreateConversation();
            }}
            className="account_item_search"
        >
            <img src={avatar} className="avatar" />
            <span className="display_name">{name}</span>
        </div>
    );
}

export default AccountItem;
