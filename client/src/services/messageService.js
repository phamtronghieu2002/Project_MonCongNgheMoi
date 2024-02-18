import axios from './axios';
export const getMessageByConversationId = (conversationId) => {
    return axios.get('/message/' + conversationId);
};
export const sendMessage = (data) => {
    return axios.post('/message', data);
};

export const updateStatus = (senderId,conversationId) => {
    return axios.post('/message/updateStatus', {senderId,conversationId});
};

export const updateLastMessage = (conversationId,content) => {
    return axios.put(`/conversation/${conversationId}?lastMessage=${content}`);
}