import axios from './axios';

export const createConversation = async (senderid, recieveid,type) => {
    return axios.post('/conversation', { senderid, recieveid ,type});
};


export const getConversationById = async (senderid) => {
    return axios.get(`/conversation/${senderid}`);
};
