import UserModel from "../models/User";
import dotenv from "dotenv";
import { hashPassword, comparePassword } from "..//utils/crypto";
import { create_access_token, create_fresh_token } from "../utils/jwt";
dotenv.config();
import jwt from "jsonwebtoken";
export const searchUser = async (keyword) => {
    try {
      const users = await UserModel.find(
        {
          $or: [
            { keywords: { $in: keyword } },
            {phonenumber: `+84${keyword.slice(1)}` }
          ],
        },
        "_id avatarPicture username backgroundPicture"
      );
      return users;
    } catch (err) {
      console.error(err);
    }
  };
  