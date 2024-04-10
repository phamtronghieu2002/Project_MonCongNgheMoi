import axios from './axios';


//api gủi lời mời kết bạn
//tham số truyền vô dạng:sendRequestFriend("abc","xyz")
export const sendRequestFriend = (senderId, recieverId) => {
    return axios.post(`/requestFriend`, { senderId, recieverId });
};


//api hủy lời mời kết bạn
//tham số truyền vô dạng:cancelRequestFriend(1,"abc")
//note: status=1 là hủy lời mời kết bạn
//note"id là id của lời mời kết bạn
export const cancelRequestFriend = (id) => {
    return axios.put(`/requestFriend/${id}?status=0`);
};

//api chấp nhận lời mời kết bạn
//tham số truyền vô dạng:acceptFriendRequest(1)
//note: status=2 là chấp nhận lời mời kết bạn
//note"id là id của lời mời kết bạn
export const acceptFriendRequest = (id) => {
    return axios.put(`/requestFriend/${id}?status=2`);
}

//api từ chối lời mời kết bạn
//tham số truyền vô dạng:declineFriendRequest(1)
//note: status=3 là từ chối lời mời kết bạn
export const declineFriendRequest = (id) => {
    return axios.put(`/requestFriend/${id}?status=3`);
}


//api get lời mời kết bạn theo userId
//tham số truyền vô dạng:getFriendRequest("abc")
export const getFriendRequest = (userId) => {
    return axios.get(`/requestFriend/${userId}`);
};

//api kiểm tra đã gửi lời mời kết bạn chưa
//tham số truyền vô dạng:isSendRequestFriend("abc","xyz")
export const isSendRequestFriend = (senderId, recieverId) => {
    return axios.get(`/requestFriend?senderId=${senderId}&recieverId=${recieverId}`);
}

