import './AccountItem.scss';
function AccountItem({avatarPicture,username,_id}) {
    return (
        <div className="account_item_search">
            <img
                src={avatarPicture}
                className="avatar"
            />
            <span className="display_name">{username}</span>
        </div>
    );
}

export default AccountItem;
