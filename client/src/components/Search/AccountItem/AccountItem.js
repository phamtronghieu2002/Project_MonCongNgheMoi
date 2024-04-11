import './AccountItem.scss';
import * as conversationService from '../../../services/conversationService';
import { useContext } from 'react';
import { ConversationContext } from '../../../providers/ConversationProvider/ConversationProvider';
import { AuthContext } from '../../../providers/Auth/AuthProvider';
function AccountItem({ avatarPicture, username, groupPicture, groupName, _id, isGroup, members }) {
    const { setCurrentConversation } = useContext(ConversationContext);
    const { getUser } = useContext(AuthContext);
    const user = getUser();

    const avatar = avatarPicture || groupPicture;
    const name = username || groupName;
    const handleCreateConversation = async () => {
        try {

            const conversation = await conversationService.createConversation(user.data._id, _id, isGroup);

            const avatar = avatarPicture || groupPicture;
            const name = username || groupName;

            const conversationId = conversation._id;

            setCurrentConversation(
                avatar,
                name,
                _id,
                isGroup,
                members ? members : [user.data._id, _id],
                conversationId
            );
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
