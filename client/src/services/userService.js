import axios from './axios';
export const searchUser = (keyword) => {
    return axios.get(`/user/search/?k=${keyword}`);
}
export const getUserById = (id) => {
    return axios.get(`/user/${id}`);
}

export const isFriend = (senderId, friendId) => {
    return axios.post(`/user/checkFriend`, { senderId, friendId });
}

export const addFriend = (senderId, friendId) => {
    return axios.post(`/user/addFriend`, { senderId, friendId });
}

export const getUserByFirstCharacter = () => {
    return axios.get(`/user/firstCharacter/`);
}


export const updateUser = (_id, data) => {

    return axios.put(`/user/${_id}`, data);
}


export const updateImageUser = (_id, formData) => {
    return axios.put(`/user/updateAvatar/${_id}`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    });

}

