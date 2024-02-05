import * as authServices from "../services/authService";
export const handleRegister = async (req, res) => {
  const { username, password, phonenumber } = req.body;
  if (!username ||!phonenumber|| !password) {
    return res.status(400).json({ message: "missing params" });
  }
  const response = await authServices.register({
    username,

    password,
    phonenumber,
  });
  if (response) {
    return res.status(200).json(response);
  }
  return res.status(500).json({ message: "Internal Server Error" });
};

export const handleLogin = async (req, res) => {
  const { phonenumber,password} = req.body;
  if (!phonenumber|| !password) {
    return res.status(400).json({ message: "missing params" });
  }
  const response = await authServices.login({

    phonenumber,
    password,
    res
  });
  if (response) {
    return res.status(200).json(response);
  }
  return res.status(500).json({ message: "Internal Server Error" });
};
