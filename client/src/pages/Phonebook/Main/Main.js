import './Main.scss';
import { useLang } from '../../../hooks';
import UserList from './UserList/UserList';
import GroupList from './GroupList/GroupList';
import FriendRequest from './FriendRequest/FriendRequest';
function Main({ icon, type }) {
    const { t } = useLang();
    const Component = type === 'friend' ? UserList : type==='group'  ? GroupList : FriendRequest;
    const Langtitle =
        type === 'friend'
            ? t('messenger.social_list.friend')
            : type === 'group'
            ? t('messenger.social_list.group')
            : t('messenger.social_list.request_invite');
    return (
        <div id="main_container_handbook">
            <div className="header">
                {icon}
                <span className="title">{Langtitle}</span>
            </div>
            <div className="body">
                <span></span>
                <Component />
            </div>
        </div>
    );
}

export default Main;
