import './style.scss';
import UserItem from './UserItem/UserItem';
import {toast} from 'react-hot-toast'
import { useEffect, useState,useContext } from 'react';
import { useDebounce } from 'use-debounce';
import { socketContext } from '../../providers/Socket/SocketProvider';
import * as userServices from '..//..//services/userService';
import * as conversationServices from '..//..//services/conversationService';
import * as groupServices from '..//..//services/groupService';
function ModalCreateGroup() {
    const [groupName, setGroupName] = useState('');
    const [selectUser, setSelectUser] = useState([]);
    const [users, setUsers] = useState([]);
    const [userSearch, setUsersSeach] = useState([]);
    const [search, setSearch] = useState('');
    const [searhDebouce] = useDebounce(search, 200);
    const {socket, currentUserId} = useContext(socketContext);
    const fetchUsers = async () => {
        try {
            const users = await userServices.getUserByFirstCharacter();
            setUsers(users);
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
                const response = await userServices.searchUser(searhDebouce);
                setUsersSeach(response);
            } catch (error) {
                console.log(error);
            }
        };

        handleSearchResult();
    }, [searhDebouce]);


    const createConversation = async () => {
  try {
    const members =[currentUserId,...selectUser]
    const group=await groupServices.addGroup(groupName,members,currentUserId,"https://cdn4.iconfinder.com/data/icons/avatar-1-2/100/Avatar-16-512.png");
    const conversation = await conversationServices.createConversation(group._id,members, 1);
    toast.success('Tạo nhóm thành công');
  } catch (error) {
    toast.error(error);
  }
    }
    return (
        <div
            style={{ zIndex: 9999 }}
            className="modal fade"
            id="modalCreateGroup"
            tabindex="-1"
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
        >
            <div className="modal-dialog ">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title fw-bold" id="exampleModalLabel">
                            Tạo nhóm
                        </h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>

                    <div className="modal-body ">
                        <div className="name-group-wp d-flex align-items-center gap-3">
                            <button className="choose-image-group">
                                <i className="fas fa-image"></i>
                            </button>
                            <input 
                            value={groupName}
                            onChange={(e) => setGroupName(e.target.value)}
                            type="text" className="form-control search_group" placeholder="Nhập tên nhóm..." />
                        </div>
                        <div className="searchUser_container mt-3">
                            <input
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                type="text"
                                className=""
                                placeholder="Tìm kiếm người dùng..."
                            />
                            <i className="fa-solid fa-magnifying-glass search_icon"></i>
                        </div>
                        <div className="result-search mt-3">
                            {userSearch.length > 0 ? (
                                <UserItem
                      
                                    selectUser={selectUser}
                                    onSetUser={setSelectUser}
                                    users={userSearch}
                                />
                            ) : (
                                users.map((user, index) => (
                                    <UserItem
                                        key={index}
                                        selectUser={selectUser}
                                        onSetUser={setSelectUser}
                                        label={user.firstKey}
                                        users={user.users}
                                    />
                                ))
                            )}
                        </div>
                    </div>

                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
                            Close
                        </button>
                        <button
                            onClick={() => {
                                createConversation()
                            }}
                            type="button"
                            className="btn btn-primary"
                            data-bs-dismiss="modal"
                            aria-label="Close"
                        >
                            Save changes
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ModalCreateGroup;
