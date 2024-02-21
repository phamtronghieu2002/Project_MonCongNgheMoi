import RequestFriendModal from "../models/RequestFriend";
export const addRequestFriend = async (senderId, recieverId) => {
  const request = new RequestFriendModal({
    senderId,
    recieverId,
    status: 1,
  });
  await request.save();
  return request;
};

export const updateStatus = async (status, senderId,    recieverId) => {
  const request = await RequestFriendModal.findOneAndUpdate(
    {
      senderId,
      recieverId,
    },
    {
      status,
    },
    {
      new: true,
    }
  );
  return request;
};
