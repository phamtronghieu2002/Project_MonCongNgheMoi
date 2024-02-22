import { useEffect, useState, useContext } from 'react';
import { useInfor } from '../../../../hooks';
import { socketContext } from '../../../../providers/Socket/SocketProvider';
import * as requestService from '../../../../services/requestFriendService';
import FriendRequestItem from './FriendRequestItem/FriendRequestItem';

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
        console.log('fetch friend request');
        fetchFriendRequest();
        const onGetFriendRequest = () => {
            console.log('get friend request');
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
                <h3>Lời mời kết bạn</h3>
                <div className="content">
                    <div className="row ">
                        {friendRequests.length > 0 &&
                            friendRequests.map((req, index) => (
                                <FriendRequestItem
                                  socket={socket}
                                    reciverId={currentUser._id}
                                    key={index}
                                    _id={req._id}
                                    sender={req.senderId}
                                    fetchFriendRequest={fetchFriendRequest}
                                />
                            ))}
                    </div>
                </div>
            </div>
            <div className="mb-4">
                <h3>Đã gửi lời mời</h3>
                <div className="content">
                    <div className="row "></div>
                </div>
            </div>
        </div>
    );
}
