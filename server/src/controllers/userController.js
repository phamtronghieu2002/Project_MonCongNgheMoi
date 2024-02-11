import * as userServices from "../services/userService";
export const handleSearchUser  =async(req,res)=>{

    const {k} = req.query;
     if (!k) {
       return res.status(400).json({ message: "missing query" });
     }
     const response = await userServices.searchUser(k);
     if (response) {
       return res.status(200).json(response);
     }
     return res.status(500).json({ message: "Internal Server Error" });
   
   }


   export const handleGetUserById = async (req, res) => {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ message: "missing param" });
    }
    const response = await userServices.getUserById(id);
    if (response) {
      return res.status(200).json(response);
    }
    return res.status(500).json({ message: "Internal Server Error" });
  }