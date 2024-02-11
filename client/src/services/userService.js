import axios from './axios';
export const searchUser =  (keyword) => {

    return axios.get(`/user/search/?k=${keyword}`);

}
export const getUserById= async (id) => {
    return axios.get(`/user/${id}`);
}