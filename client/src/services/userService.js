import axios from './axios';

//api tìm kiếm user theo keyword, tham số truyền vô dạng:searchUser("123","abc")
//trong đó id là id của current user,keyword là từ  khóa tìm kiếm
export const searchUser = (id, keyword) => {
    return axios.get(`/user/search/${id}?k=${keyword}`);
}
//get user theo id, tham số truyền vô dạng:"abc",getUserId("abc")
export const getUserById = (id) => {
    return axios.get(`/user/${id}`);
}


//api kiểm tra user có phải là bạn bè hay không, tham số truyền vô dạng:isFriend("abc","xyz")
export const isFriend = (senderId, friendId) => {
    return axios.post(`/user/checkFriend`, { senderId, friendId });
}

//api thêm bạn bè, tham số truyền vô dạng:addFriend("abc","xyz")
export const addFriend = (senderId, friendId) => {
    return axios.post(`/user/addFriend`, { senderId, friendId });
}

//get all user theo chữ cái đầu tiên, tham số truyền vô dạng:getUserByFirstCharacter("123")
//trong đó 123 là id của current user
export const getUserByFirstCharacter = (userid) => {
    return axios.get(`/user/firstCharacter/${userid}`);
}

//api cập nhật thông tin user(không có ảnh,ảnh là api riêng),
//tham số truyền vô dạng:updateUser("abc",{username:"abc",gender:0,bỉth:"2021-12-12"})
export const updateUser = (_id, data) => {

    return axios.put(`/user/${_id}`, data);
}

//api cập nhật  ảnh user, tham số truyền vô dạng:uploadImage("123",formData)
// dữ liệu trả về sẽ là 1 url ảnh
export const updateImageUser = (_id, formData) => {
    return axios.put(`/user/updateAvatar/${_id}`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    });

}


