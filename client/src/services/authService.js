import axios from './axios';

//api đăng kí ,tham số truyền vô dạng {username:"abc",password:"123",phonenumber:"+8412342347"}
export const register = (data) => {
    return axios.post('/auth/register', data);
};

//api đăng nhập ,tham số truyền vô dạng {phonenumber:"+8412342347",password:"123"}
export const login = (data) => {
    return axios.post('/auth/login', data);
};

//api logout =>mobile khỏi làm
export const logout = () => {
    return axios.post('/auth/logout');
};


//api kiểm tra số điện thoại có tồn tại hay không ,tham số truyền vô dạng: {phonenumber:"+8412342347"}
export const checkExitPhone = (phonenumber) => {
    return axios.post('/auth/checkPhoneExit', { phonenumber });
};

