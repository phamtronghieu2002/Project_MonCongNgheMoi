import './UserChat.scss';
import { useEffect, useState,useContext} from 'react';
import Search from '../../../components/Search/Search';
import clsx from 'clsx';
import AccountItem from './AccountItem/AccountItem';
import * as conversationService from '../../../services/conversationService';
import { AuthContext } from '../../../providers/Auth/AuthProvider';
const UserChat = () => {
    const [acitve, setActive] = useState(1);
    const [openPopper,setOpenPopper]=useState("");
    const [conversations,setConversations]=useState([]);
    const {getUser} = useContext(AuthContext);
    const user= getUser().data;

    useEffect(() => {
        const fetchConversations = async () => {
            try {
                const res = await conversationService.getConversationByUserId(user._id);
                setConversations(res);
            } catch (err) {
                console.log(err);
            }
        };
        fetchConversations();

    }
    ,[]);
    return (
        <div id="wp_user_chat">
            <Search />
            <div className="filter_chat">
                <span onClick={() => setActive(1)} className={clsx('filter_item', acitve ? 'active' : '')}>
                    Tất cả
                </span>
                <span onClick={() => setActive(0)} className={clsx('filter_item', !acitve ? 'active' : '')}>
                    Chưa đọc
                </span>
            </div>
            <div className="usersChat">
          {
           conversations.length>0 && conversations.map((item,index)=>(
                <AccountItem 
                conversationId={item._id}
                senderId={user._id}
                key={index} 
                {...item}
                openPopper={openPopper}
                onDetail={()=>setOpenPopper(item._id)}
                />
                ))
          }
            </div>
        </div>
    );
};

export default UserChat;
