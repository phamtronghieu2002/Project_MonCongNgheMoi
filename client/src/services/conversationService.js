import axios from './axios';

export const createConversation = async (senderid, recieverid,type) => {
    return axios.post('/conversation', { senderid, recieverid ,type});
};


export const getConversationByUserId = async (senderid) => {
    return axios.get(`/conversation/${senderid}`);
};
