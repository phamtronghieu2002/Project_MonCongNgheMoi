import axios from './axios';
export const sendRequestFriend = (senderId, recieverId) => {
    return axios.post(`/requestFriend`, { senderId, recieverId });
};

export const cancelRequestFriend = (status,id) => {
    return axios.put(`/requestFriend/${id}?status=${status}`);
};

export const getFriendRequest = (userId) => {
    return axios.get(`/requestFriend/${userId}`);
};


export const isSendRequestFriend = (senderId, recieverId) => {
    return axios.get(`/requestFriend?senderId=${senderId}&recieverId=${recieverId}`);
}
export const acceptFriendRequest = (id) => {
    return axios.put(`/requestFriend/${id}?status=2`);
}
export const declineFriendRequest = (id) => {
    return axios.put(`/requestFriend/${id}?status=3`);
}
