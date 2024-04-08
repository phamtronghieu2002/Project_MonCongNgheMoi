import axios from './axios';
export const getMessageByConversationId = (conversationId) => {
    return axios.get('/message/' + conversationId);
};
export const sendMessage = (type, data) => {
    console.log("type>>>", type);
    return axios.post(`/message?type=${type}`, data);
};

export const updateStatus = (senderId, conversationId, receiverId) => {
    console.log(senderId, conversationId, receiverId);
    return axios.post('/message/updateStatus', { senderId, conversationId, receiverId });
};

export const updateLastMessage = (conversationId, content, senderid) => {
    return axios.put(`/conversation/${conversationId}?lastMessage=${content}&senderid=${senderid}`);
}
export const uploadImageMessage = (data) => {
    return axios.post('/message/uploadImage', data);
}

export const uploadFileMessage = (formData) => {

    return axios.post('/message/uploadFile', formData,
        {
            headers: { "Content-Type": "multipart/form-data" },
        });
}