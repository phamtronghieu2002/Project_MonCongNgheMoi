import axios from "./axios"
export const sendRequestFriend = async (senderId,recieverId) => {

    return  axios.post(`/requestFriend`,{senderId,recieverId});

    }

    export const cancelRequestFriend = async (status,senderId,recieverId) => {

        return  axios.put(`/requestFriend?status=${status}`,{senderId,recieverId});
    
        }
    

