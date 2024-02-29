import * as userServices from "../services/userService";
export const handleSearchUser = async (req, res) => {
  const { k } = req.query;
  if (!k) {
    return res.status(400).json({ message: "missing query" });
  }
  const data = await userServices.searchUser(k);
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

export const handleGetUserByFirstCharater =async(req,res)=>{

  console.log("xin chao")
 
  const data =await userServices.getUserByFirstCharater();
  if(data){
    return res.status(200).json(data);
  }
  return res.status(500).json({message: "Internal Server Error"});
}
