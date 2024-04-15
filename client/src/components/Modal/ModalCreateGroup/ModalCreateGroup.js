import './style.scss';
import UserItem from './UserItem/UserItem';
import clsx from 'clsx';
import ModalSetAvatarGroup from '../ModalSetAvatarGroup/ModalSetAvatarGroup';
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
function ModalCreateGroup({ onHide, user, group }) {
    const [groupName, setGroupName] = useState('');
    const [selectUser, setSelectUser] = useState(() => {
        if (user) return [{ _id: user._id, avatarPicture: user.avatar, username: user.name }];
        return [];
    });
    const [users, setUsers] = useState([]);
    const [userSearch, setUsersSeach] = useState([]);
    const [search, setSearch] = useState('');
    const [searhDebouce] = useDebounce(search, 200);
    const { socket, currentUserId } = useContext(socketContext);
    const { conversation, setCurrentConversation } = useContext(ConversationContext);
    const [showModalSetImageGroup, setShowModalSetImageGroup] = useState(true);
    const [imgGroup, setImgGroup] = useState('');
    const [fileImage, setFileImage] = useState(null);
    const fetchUsers = async () => {
        try {
            const users = await userServices.getUserByFirstCharacter(currentUserId);
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
                const response = await userServices.searchUser(currentUserId, searhDebouce);
                setUsersSeach(response);
            } catch (error) {
                console.log(error);
            }
        };

        handleSearchResult();
    }, [searhDebouce]);

    const handleFileImageChange = async () => {
        try {
            const file = fileImage;
            if (!file) return;
            const formData = new FormData();
            formData.append('file', file);

            const data = await messageService.uploadImageMessage(formData);
            const imgMessage = data.imgURL;

            return imgMessage;
        } catch (error) {
            console.error('Error uploading image:', error);
        }
    };
    const createConversation = async () => {
        try {
            const members = [currentUserId, ...selectUser];
            const imageGroupFromDevice = await handleFileImageChange();
            const group = await groupServices.addGroup(
                groupName,
                members,
                currentUserId,
                imageGroupFromDevice ||
                    imgGroup ||
                    'https://cdn4.iconfinder.com/data/icons/avatar-1-2/100/Avatar-16-512.png',
            );
            const conversation = await conversationServices.createConversation(group._id, members, 1);
            setCurrentConversation(
                group.groupPicture,
                group.groupName,
                group._id,
                true,
                group.members,
                conversation._id,
            );

            socket.emit('reRenderConversations', members);
            toast.success('Tạo nhóm thành công');
        } catch (error) {
            console.log(error);
            toast.error(error);
        }
    };
    return (
        <OverLay>
            {showModalSetImageGroup && (
                <ModalSetAvatarGroup
                    onSelectImageGroup={setImgGroup}
                    onChangeFileImage={setFileImage}
                    onHide={() => setShowModalSetImageGroup(false)}
                />
            )}
            <div id="modalCreateGroup">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title fw-bold">Tạo nhóm</h5>
                            <button
                                type="button"
                                className="btn-close"
                                onClick={() => {
                                    onHide();
                                }}
                            ></button>
                        </div>

                        <div className="modal-body">
                            {!group  && (
                                <div className="name-group-wp d-flex align-items-center gap-3">
                                    <button
                                        onClick={() => setShowModalSetImageGroup(true)}
                                        className="choose-image-group"
                                    >
                                        {imgGroup ? <img src={imgGroup} /> : <i className="fas fa-image"></i>}
                                    </button>
                                    <input
                                        value={groupName}
                                        onChange={(e) => setGroupName(e.target.value)}
                                        type="text"
                                        className="form-control search_group"
                                        placeholder="Nhập tên nhóm..."
                                    />
                                </div>
                            )}
                            <div className="searchUser_container mt-3">
                                <input
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    type="text"
                                    className="control search_user"
                                    placeholder="Tìm kiếm người dùng..."
                                />
                                <i className="fa-solid fa-magnifying-glass search_icon"></i>
                            </div>
                            <div className="result-search mt-3">
                                <div className="left_result_search">
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
                                                group={group}
                                            />
                                        ))
                                    )}
                                </div>
                                <div className={clsx('right_result_search', selectUser.length > 0 ? 'show' : '')}>
                                    <h6 className="fw-bold mb-2">
                                        đã chọn{' '}
                                        <strong className="total_members_select">{`1/ ${selectUser.length}`}</strong>
                                    </h6>

                                    {selectUser.map((u, index) => {
                                        return (
                                            <div className="filter_user_selected" key={index}>
                                                <div className="infor">
                                                    <img src={u.avatarPicture} />
                                                    <span>{u.username}</span>
                                                </div>
                                                <i
                                                    onClick={() => {
                                                        setSelectUser(
                                                            selectUser.filter((u) => u._id !== selectUser[index]._id),
                                                        );
                                                    }}
                                                    class="fa-solid fa-circle-xmark"
                                                ></i>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>

                        <div className="modal-footer">
                            <button onClick={onHide} type="button" className="btn btn-secondary">
                                Close
                            </button>
                            <button
                                onClick={() => {
                                    createConversation();
                                    onHide();
                                }}
                                type="button"
                                className="btn btn-primary"
                                disabled={groupName.length === 0 || selectUser.length < 2}
                            >
                                Save changes
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </OverLay>
    );
}

export default ModalCreateGroup;
