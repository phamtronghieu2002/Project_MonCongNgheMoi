import './style.scss';
import Search from '../../../components/Search/Search';
import SocialItem from './SocialItem/SocialItem';
import { useLang } from '../../../hooks';

function SocialNav({ setSocialSelect ,setCount}) {
    const { t } = useLang();
    const socials = [
        {
            icon: <i className="fa-solid fa-user"></i>,
            callback: () => {
             
                setSocialSelect({
                    type: 'friend',

                    icon: <i className="fa-solid fa-user"></i>,
                });
            },
            title: t('messenger.social_list.friend'),
        },
        {
            icon: <i className="fa-solid fa-user-group"></i>,
            callback: () => {
                setSocialSelect({
                    type: 'group',

                    icon: <i className="fa-solid fa-user-group"></i>,
                });
            },
            title: t('messenger.social_list.group'),
        },
        {
            icon: <i className="fa-solid fa-envelope"></i>,
            callback: () => {
                setSocialSelect({
                    type: 'request_invite',

                    icon: <i className="fa-solid fa-envelope"></i>,
                });
            },
            title: t('messenger.social_list.request_invite'),
        },
    ];
    return (
        <div id="wp_SocialNav">
            <Search />
            <div className="list_social">
                {socials.map((social, index) => (
                    <SocialItem key={index} {...social} />
                ))}
            </div>
        </div>
    );
}

export default SocialNav;
