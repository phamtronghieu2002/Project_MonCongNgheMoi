require("dotenv").config();
import jwt from "jsonwebtoken";
export const veryfyUser = async (req, res, next) => {
  const accessToken = req.cookies.accessToken;
  console.log("token server:>>", accessToken);
  if (accessToken) {
    try {
      const decoded_token = jwt.verify(
        accessToken,
        process.env.ACCESS_TOKEN_SECRET
      );

      console.log("decoded_token:>>", decoded_token);
      req.user = decoded_token;
      next();
    } catch (error) {
      return res.status(401).json({ message: "token invalid" });
    }
  } else {
    return res.status(401).json({ message: "token invalid" });
  }
};
