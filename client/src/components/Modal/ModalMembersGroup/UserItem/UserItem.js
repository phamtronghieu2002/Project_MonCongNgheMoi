import "./userItem.scss"
import { useEffect, useState, useContext } from 'react'
import { socketContext } from "../../../../providers/Socket/SocketProvider";
import { toast, Toaster } from 'react-hot-toast';
import * as requestFriendService from "..//..//..//..//services/requestFriendService"
import * as userService from "..//..//..//..//services/userService"
import { ConversationContext } from "../../../../providers/ConversationProvider/ConversationProvider";
export default function UserItem({ username, _id, avatarPicture }) {
    const [isSendRequest, setIsSendRequest] = useState(false)
    const { socket, currentUserId } = useContext(socketContext);
    const [isFriend, setIsFriend] = useState(false);
    const [request_id, setRequestId] = useState(null);
    const { conversation } = useContext(ConversationContext)
    const checkFriend = async () => {
        try {
            const senderId = currentUserId;
            const friendId = _id;
            const res = await userService.isFriend(senderId, friendId);
            console.log("isFriend", isFriend);
            console.log("type of friend", typeof isFriend);
            setIsFriend(res.isFriend);
        } catch (error) {
            console.log(error);
        }


    };

    const handleSendRequestFriend = async () => {
        try {
            const senderId = currentUserId;
            const recieverId = _id;
            const requestFriend = await requestFriendService.sendRequestFriend(senderId, recieverId);
            setRequestId(requestFriend._id);
            setIsSendRequest(true)
            socket.emit('sendRequestFriend', { recieverId });
            toast.success('Đã gửi yêu cầu kết bạn');
        } catch (error) {
            console.log(error);
        }
    };
    // xử lí hủy gửi yêu cầu kết bạn
    const handleCancelRequestFriend = async () => {
        try {
            const recieverId = conversation.recieveInfor._id;
            await requestFriendService.cancelRequestFriend(request_id);
            setIsSendRequest(false)
            socket.emit('sendRequestFriend', { recieverId });
            toast.success('Đã huy gửi yêu cầu kết bạn');
        } catch (error) {
            console.log(error);
        }
    };
    useEffect(() => {
        checkFriend();
    }, [])
    return (
        <div className="user_members_group_container d-flex justify-content-start align-items-center mb-3">
            <div className="infor ">
                <img src={avatarPicture} />
                <span>{username}</span>
            </div>
            {isFriend ? <></> : <>
                {!isSendRequest ?
                    <button
                        onClick={handleSendRequestFriend}
                        className="btn btn-primary">
                        Kết bạn
                    </button>
                    : <button
                        onClick={handleCancelRequestFriend}
                        className="btn btn-danger">
                        Huỷ
                    </button>}

            </>}
        </div>
    )

} 