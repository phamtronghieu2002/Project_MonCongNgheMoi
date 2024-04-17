import axios from "./axios";
export const addGroup = async (groupName, members, createdBy, groupPicture) => {
    return axios.post('/group', { groupName, members, createdBy, groupPicture });
}

export const getGroupById = async (id) => {
    return axios.get(`/group/${id}`);
}

export const addUserToGroup = async (id_group, members) => {
    return axios.post('/group/addUserToGroup', { id_group, members });
}