import { useEffect, useState, useContext } from 'react';
import { useInfor } from '../../../../hooks';
import { socketContext } from '../../../../providers/Socket/SocketProvider';
import * as requestService from '../../../../services/requestFriendService';
import FriendRequestItem from './FriendRequestItem/FriendRequestItem';
import NotifyNoFriend from '../../Notify/NotifyNoFriend';

export default function FriendRequest() {
    const [friendRequests, setFriendRequests] = useState([]);
    const { socket } = useContext(socketContext);
    const currentUser = useInfor();
    const fetchFriendRequest = async () => {
        try {
            const requestFriends = await requestService.getFriendRequest(currentUser._id);
            setFriendRequests(requestFriends);
        } catch (err) {
            console.log(err);
        }
    };
    useEffect(() => {
        fetchFriendRequest();
        const onGetFriendRequest = () => {
            fetchFriendRequest();
        };
        socket.on('getFriendRequest', onGetFriendRequest);
        return () => {
            socket.off('getFriendRequest', onGetFriendRequest);
        };
    }, []);

    return (
        <div className="wp_request_invite">
            <div className="mb-4">
                <h5>Lời mời kết bạn</h5>
                <div className="content">
                    <div className="row ">
                        {friendRequests.length > 0 ?
                            friendRequests.map((req, index) => (
                                <FriendRequestItem
                                    socket={socket}
                                    reciverId={currentUser._id}
                                    key={index}
                                    _id={req._id}
                                    sender={req.senderId}
                                    fetchFriendRequest={fetchFriendRequest}
                                />
                            )) :
                            <NotifyNoFriend />
                        }
                    </div>
                </div>
            </div>
            <div className="mb-4">
                <h5>Đã gửi lời mời</h5>
                <div className="content">
                    <div className="row "></div>
                </div>
            </div>
        </div>
    );
}
