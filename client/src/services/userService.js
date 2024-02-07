import axios from './axios';
export const searchUser =  (keyword) => {

    return axios.get(`/user/search/?k=${keyword}`);

}