import './AccountItem.scss';
import * as conversationService from '../../../services/conversationService';
import { useContext } from 'react';
import { ConversationContext } from '../../../providers/ConversationProvider/ConversationProvider';
import { AuthContext } from '../../../providers/Auth/AuthProvider';
function AccountItem({ avatarPicture, username, groupPicture, groupName, _id, type }) {
    const { setConversation, conversation } = useContext(ConversationContext);
    const { getUser } = useContext(AuthContext);
    const user = getUser();

    const avatar = avatarPicture || groupPicture;
    const name = username || groupName;
    const handleCreateConversation = async () => {
        try {
            await conversationService.createConversation(user.data._id, _id, type);
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <div
            onClick={() => {
                setConversation({
                    ...conversation,
                    conversation: { active: true, infor: { avatar, name, _id, type } },
                });
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
