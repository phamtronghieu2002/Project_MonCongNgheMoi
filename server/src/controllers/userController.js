import * as userServices from "../services/userService";
export const handleSearchUser = async (req, res) => {
  const { k } = req.query;
  const { id } = req.params;

  if (!k) {
    return res.status(400).json({ message: "missing query" });
  }
  const data = await userServices.searchUser(id, k);
  if (data) {
    return res.status(200).json(data);
  }
  return res.status(500).json({ message: "Internal Server Error" });
};

export const handleGetUserById = async (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({ message: "missing param" });
  }
  const data = await userServices.getUserById(id);
  if (data) {
    return res.status(200).json(data);
  }
  return res.status(500).json({ message: "Internal Server Error" });
};

export const handleCheckFriend = async (req, res) => {
  const { senderId, friendId } = req.body;
  if (!senderId || !friendId) {
    return res.status(400).json({ message: "missing param" });
  }
  try {
    const data = await userServices.checkFriend(senderId, friendId);

    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const handleAddFriend = async (req, res) => {
  const { senderId, friendId } = req.body;
  if (!senderId || !friendId) {
    return res.status(400).json({ message: "missing param" });
  }
  const data = await userServices.addFriend(senderId, friendId);
  if (data) {
    return res.status(200).json(data);
  }

  return res.status(500).json({ message: "Internal Server Error" });
};

export const handleGetUserByFirstCharater = async (req, res) => {

const {id}=req.params;

  const data = await userServices.getUserByFirstCharater(id);
  if (data) {
    return res.status(200).json(data);
  }
  return res.status(500).json({ message: "Internal Server Error" });
}

export const handleUpdateInformationUser = async (req, res) => {

  console.log("req.body", req.body)
  const _id = req.params.id;
  const { username, gender, birth } = req.body;
  if (!username || !gender || !birth) {
    return res.status(400).json({ message: "missing param" });
  }
  const data = await userServices.updateUser(_id, username, gender, birth);
  if (data) {
    return res.status(200).json(data);
  }
  return res.status(500).json({ message: "Internal Server Error" });
}
export const handleUpdateImageUser = async (req, res) => {


  const _id = req.params.id;
  const imgURL = req.file.path;
  if (!imgURL) {
    return res.status(400).json({ message: "missing param" });
  }
  const data = await userServices.updateImageUser(_id, imgURL);
  if (data) {
    return res.status(200).json(data);
  }
  return res.status(500).json({ message: "Internal Server Error" });
}

