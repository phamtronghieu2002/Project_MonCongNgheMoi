import * as requestService from '../../../../../services/requestFriendService';
import * as userService from '../../../../../services/userService';
import { toast } from 'react-hot-toast';
function FriendRequestItem({sender,reciverId,fetchFriendRequest,_id,socket}) {
        const handleAccept = async () => {
            try {
                await requestService.acceptFriendRequest(_id);
                await userService.addFriend(sender._id,reciverId);
                toast('Đã chấp nhận lời mời kết bạn', { icon: '👏' })
                socket.emit('acceptFriendRequest',sender._id);
                fetchFriendRequest();
            } catch (err) {
                console.log(err);
            }
        }
        const handleDecline = async () => {
            try {
                await requestService.declineFriendRequest(_id);
                fetchFriendRequest();
            } catch (err) {
                console.log(err);
            }
        }
    return (
        <div className=" card  col-lg-3  col-md-4 col-sm-6 col-xs-12 ">
        <div className="card" style={{ width: '100%',border:0 }}>
            <ul className="list-group list-group-flush">
                <li className="list-group-item">
                    <div className=" d-flex justify-content-start align-items-center gap-3 mb-3">
                        <img
                            style={{ width: '50px', height: '50px', borderRadius: '50%' }}
                            src={sender?.avatarPicture || 'https://www.w3schools.com/howto/img_avatar.png'}
                            alt="avatar"
                            className="avatar"
                        />
                        <p className="displayname fw-bold fs-6">{sender?.username}</p>
                    </div>
                    <button 
                    onClick={handleAccept}
                    type="button" class="btn btn-outline-primary me-3">
                        Đồng ý{' '}
                    </button>
                    <button
                    onClick={handleDecline}
                    type="button" class="btn btn-outline-danger">
                        Từ chối
                    </button>
                </li>
            </ul>
        </div>
    </div>
      );
}

export default FriendRequestItem;