import RequestFriendModal from "../models/RequestFriend";
export const addRequestFriend = async (senderId, recieverId) => {
  const request = await RequestFriendModal.findOne({
    senderId,
    recieverId,
    status: 0,
  });

  if (request) {
    const new_request = await RequestFriendModal.findOneAndUpdate(
      { senderId, recieverId },
      {
        status: 1,
      },
      {
        new: true,
      }
    );

    return new_request;
  }
  const new_request = new RequestFriendModal({
    senderId,
    recieverId,
    status: 1,
  });
  await new_request.save();
  return new_request;
};

export const updateStatus = async (status, requestId) => {
  const request = await RequestFriendModal.findByIdAndUpdate(
    { _id: requestId },
    {
      status,
    },
    {
      new: true,
    }
  );
  return request;
};

export const getRequestFriend = async (userId) => {
  try {
    const request = await RequestFriendModal.find({
      recieverId: userId,
      status: 1,
    })
      .populate("senderId", "_id username avatarPicture")
      .exec();
    return request;
  } catch (error) {
    console.log(error);
  }
};

export const checkSendRequestFriend = async (senderId, recieverId) => {
  try {
    const request = await RequestFriendModal.findOne({
      senderId,
      recieverId,
      status: 1,
    });
    return request?._id
      ? {
        status: true,
        requestId: request._id,
      }
      : {
        status: false,
      };
  } catch (error) {
    console.log(error);
  }
};
