
import UserItem from './UserItem/UserItem';
import clsx from 'clsx';

import OverLay from '../../Overlay/Overlay';
import { toast } from 'react-hot-toast';
import { useEffect, useState, useContext } from 'react';
import { useDebounce } from 'use-debounce';
import { socketContext } from '../../../providers/Socket/SocketProvider';
import { ConversationContext } from '../../../providers/ConversationProvider/ConversationProvider';
import * as userServices from '..//..//../services/userService';
import * as conversationServices from '..//..//../services/conversationService';
import * as groupServices from '..//..//../services/groupService';
import * as messageService from '..//..//../services/messageService';
import { useInfor } from '../../../hooks';
export default function ModalMemberGroup({ onHide }) {
    const [groupName, setGroupName] = useState('');

    const [users, setUsers] = useState([]);
    const [userSearch, setUsersSeach] = useState([]);
    const [search, setSearch] = useState('');
    const [searhDebouce] = useDebounce(search, 200);
    const { currentUserId } = useContext(socketContext);

    const { conversation } = useContext(ConversationContext);


    const fetchUsers = async () => {
        try {
            const group = await groupServices.getGroupById(conversation.recieveInfor._id);
            setUsers(group.members);
        } catch (error) {
            console.log(error);
        }
    };
    useEffect(() => {
        fetchUsers();
    }, []);

    useEffect(() => {
        if (!searhDebouce) {
            setUsersSeach([]);
            return;
        }
        const handleSearchResult = async () => {
            try {
                const response = await userServices.searchUser(currentUserId, searhDebouce);
                setUsersSeach(response);
            } catch (error) {
                console.log(error);
            }
        };

        handleSearchResult();
    }, [searhDebouce]);



    return (
        <OverLay>

            <div id="modalMemberGroup" className='modalGroup'>
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title fw-bold">Thành Viên Nhóm</h5>
                            <button
                                type="button"
                                className="btn-close"
                                onClick={() => {
                                    onHide();
                                }}
                            ></button>
                        </div>

                        <div className="modal-body">

                            <div className="searchUser_container mt-3">
                                <input
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    type="text"
                                    className="control search_user"
                                    placeholder="Tìm kiếm thành viên trong nhóm..."
                                />
                                <i className="fa-solid fa-magnifying-glass search_icon"></i>
                            </div>
                            <div className="result-search mt-3">
                                <div className="left_result_search">
                                    {
                                        users.map((user, index) => (
                                            <UserItem
                                                key={index}
                                                {...user}
                                            />
                                        ))
                                    }
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </OverLay>
    );
}


