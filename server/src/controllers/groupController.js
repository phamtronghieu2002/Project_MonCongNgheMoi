import * as groupServices from "..//services//groupService";

export const handleCreateGroup = async (req, res) => {
  const { groupName, groupPicture, members, createdBy } = req.body;
  if (!groupName || !groupPicture || !members || !createdBy) {
    return res.status(400).json({ message: "missing param" });
  }
  const data = await groupServices.createGroup(
    groupName,
    groupPicture,
    members,
    createdBy
  );
  if (data) {
    return res.status(200).json(data);
  }
  return res.status(500).json({ message: "Internal Server Error" });
};

export const handleGetGroupById = async (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({ message: "missing param" });
  }
  const data = await groupServices.getGroupById(id);
  if (data) {
    return res.status(200).json(data);
  }
  return res.status(500).json({ message: "Internal Server Error" });
};