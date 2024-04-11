import axios from './axios';


//api tạo cuộc trò truyện
//tham số truyền vô dạng:createConversation("abc","xyz",0)
//note: 0 là cuộc trò truyện 1-1, 1 là cuộc trò truyện nhóm
export const createConversation = async (senderid, recieverid, type) => {
    return axios.post('/conversation', { senderid, recieverid, type });
};

//api get all cuộc trò truyện của user theo id
//tham số truyền vô dạng:getConversationByUserId("abc")
export const getConversationByUserId = async (senderid) => {
    return axios.get(`/conversation/${senderid}`);
};
