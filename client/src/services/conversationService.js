import axios from './axios';

export const createConversation = async (senderid, recieveid) => {
    return axios.post('/conversation', { senderid, recieveid });
};


export const getConversationById = async (senderid) => {
    return axios.get(`/conversation/${senderid}`);
};
