import axios from './axios';

export const register =  (data) => {
    return axios.post('/auth/register', data);
};

export const login =  (data) => {
    return axios.post('/auth/login', data);
};

export const checkExitPhone =  (phonenumber) => {
    return axios.post('/auth/checkPhoneExit', {phonenumber});
};

