import axios from './axios';
export const getMessageByConversationId = (conversationId) => {
    return axios.get('/message/' + conversationId);
};
export const sendMessage = (data) => {
    return axios.post('/message', data);
};
