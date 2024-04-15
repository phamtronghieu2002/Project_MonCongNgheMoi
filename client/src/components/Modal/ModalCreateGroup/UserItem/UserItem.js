import './UserItem.scss';
function UserItem({ label, users, onSetUser, selectUser, group }) {
    return (
        <div className="user_item_container mt-3">
            <h6>{label}</h6>

            {users.map((user, index) => {
                let isMembers = user.groups.includes(group?._id);
                return (
                    <div
                        key={index}
                        onClick={() => {
                            if (isMembers) {
                                return;
                            }
                            selectUser.some((u) => u._id === user._id)
                                ? onSetUser(selectUser.filter((item) => item._id !== user._id))
                                : onSetUser([...selectUser, user]);
                        }}
                        className="user_item d-flex gap-1 align-items-center mt-1"
                    >
                        <input
                            disabled={isMembers}
                            checked={selectUser.some((u) => u._id === user._id) || isMembers}
                            onChange={() => {}}
                            type="checkbox"
                            className="form-check-input me-2"
                        />
                        <img
                            className="avatar"
                            src={user.avatarPicture ? user.avatarPicture : 'https://i.imgur.com/HeIi0wU.png'}
                            alt="avatar"
                        />
                        <div className="user_info">
                            <h4>{user.username}</h4>
                            {isMembers && (
                                <span style={{ fontSize: '12px' }} className="text-danger">
                                    đã tham gia
                                </span>
                            )}
                        </div>
                    </div>
                );
            })}
        </div>
    );
}

export default UserItem;
