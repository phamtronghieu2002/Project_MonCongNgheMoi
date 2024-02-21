import './Phonebook.scss';
import { useState } from 'react';

import Main from './Main/Main';
import SidebarNav from '../../components/SidebarNav/SidebarNav';
import SocialNav from './SocialDashboard/SocialNav'
function Phonebook() {
 
    const [socialSelect, setSocialSelect] = useState({
        type: 'friend',
        title: 'Bạn bè',
        icon: <i className="fa-solid fa-user"></i>,
    });


    return (
        <div id="wp_phonebook_page">
            <SidebarNav />
            <SocialNav 
            setSocialSelect={setSocialSelect}
            
            />
            <Main {...socialSelect} />
        </div>
    );
}

export default Phonebook;
