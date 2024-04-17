import './UserPoper.scss';
import ManuItemPopper from '../MenuItemPopper/MenuItemPopper';
import { useLang } from '..//..//..//hooks';
import { AuthContext } from '..//..//..//providers/Auth/AuthProvider';
import { useContext } from 'react';
import { toast } from 'react-hot-toast';
import { useInfor } from '..//..//..//hooks';
import * as authServices from '..//..//..//services/authService';

function UserPopper() {
    const { t } = useLang();
    const { logout } = useContext(AuthContext);
    const user = useInfor();
    const handleLogout = async () => {
        try {


            logout();
        } catch (error) {
            toast.success('đăng xuất thất bại!!!');
        }
    };

    const main_menu = [
        { title: t('messenger.popper.user.profile'), callback: () => { }, props: { "data-bs-toggle": "modal", "data-bs-target": "#personalInfoModal" } },
        { title: t('messenger.popper.user.setting'), callback: () => { } },
    ];
    const foot_menu = [
        {
            title: t('messenger.popper.user.logout'),
            callback: handleLogout,
        },
    ];
    return (
        <div id="wp_popper_user">
            <h5 className="fw-bold ps-3">{user.username}</h5>
            <div className="zmenu-separator"></div>
            {main_menu.map((item, index) => (
                <ManuItemPopper key={index} {...item} />
            ))}
            <div className="zmenu-separator"></div>

            {foot_menu.map((item, index) => (
                <ManuItemPopper key={index} {...item} />
            ))}
        </div>
    );
}

export default UserPopper;
