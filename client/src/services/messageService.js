import axios from './axios';


//apui lấy tất cả tin nhắn theo conversationId(id của cuộc trò truyện)
//tham số truyền vô dạng:getMessageByConversationId("abc")
export const getMessageByConversationId = (conversationId) => {
    return axios.get('/message/' + conversationId);
};

//api gửi tin nhắn,
//tham số truyền vô dạng:sendMessage("text",{content:"abc",senderId:"abc",conversationId:"abc"})
export const sendMessage = (type, data) => {
    console.log("type>>>", type);
    return axios.post(`/message?type=${type}`, data);
};

//api cập nhật trạng thái tin nhắn là :đã xem,
//tham số truyền vô dạng:updateStatus("abc","abc","abc")
export const updateStatus = (senderId, conversationId, receiverId) => {
    console.log(senderId, conversationId, receiverId);
    return axios.post('/message/updateStatus', { senderId, conversationId, receiverId });
};
//api cập nhật tin nhắn cuối của conversation
//tham số truyền vô dạng:updateLastMessage("abc","abc","abc")
export const updateLastMessage = (conversationId, content, senderid) => {
    return axios.put(`/conversation/${conversationId}?lastMessage=${content}&senderid=${senderid}`);
}

//api upload ảnh tin nhắn
//tham số truyền vô dạng:uploadImageMessage(formData)
//api này sẽ trả về 1 url ảnh
// sau đó gửi gọi api gửi tin nhắn url này
export const uploadImageMessage = (data) => {
    return axios.post('/message/uploadImage', data);
}

//api upload file tin nhắn
//tham số truyền vô dạng:uploadFileMessage(formData)
//api này sẽ trả về 1 url file
// sau đó gửi gọi api gửi tin nhắn url này


export const uploadFileMessage = (formData) => {

    return axios.post('/message/uploadFile', formData,
        {
            headers: { "Content-Type": "multipart/form-data" },
        });
}
export const updateReactionMessage = (messageId, emoji) => {
    return axios.put('/message/updateReaction', { messageId, emoji });
}


export const deleteMessage = (id) => {
    return axios.delete(`/message/${id}`);
}


export const recallMessage = (id) => {
    return axios.delete(`/message/recall/${id}`);
}