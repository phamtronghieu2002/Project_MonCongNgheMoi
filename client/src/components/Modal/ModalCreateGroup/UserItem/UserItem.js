import './UserItem.scss';
function UserItem({ label, users, onSetUser, selectUser }) {
    return (
        <div className="user_item_container mt-3">
            <h6>{label}</h6>

            {users.map((user, index) => {
                return (
                    <div
                        key={index}
                        onClick={() => {
                            selectUser.includes(user._id) ? onSetUser(selectUser.filter((item) => item !== user._id)) :
                                onSetUser([...selectUser, user._id]);
                        }}
                        className="user_item d-flex gap-1 align-items-center mt-1"
                    >
                        <input
                            checked={selectUser.includes(user._id) ? true : false}
                            onChange={() => { }}
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
                        </div>
                    </div>
                );
            })}
        </div>
    );
}

export default UserItem;
