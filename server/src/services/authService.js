import UserModel from "../models/User";
import dotenv from "dotenv";
import { hashPassword, comparePassword } from "..//utils/crypto";
import { create_access_token, create_fresh_token } from "../utils/jwt";
import { generateKeywordsWithSpaces } from "../utils/user";
dotenv.config();
import jwt from "jsonwebtoken";

export const register = async ({ username, password, phonenumber }) => {
  try {
    const user = await UserModel.findOne({ phonenumber });

    if (user) {
      return {
        errCode: 1,
        message: "Phonenumber is already used",
      };
    }
    const new_user = new UserModel({
      username,
      password: await hashPassword(password),
      phonenumber,
      keywords: generateKeywordsWithSpaces(username),
    });
    const result = await new_user.save();
    if (result) {
      return {
        errCode: 0,
        message: "Register successfully",
        data: result,
      };
    }
  } catch (err) {
    console.error(err);
  }
};

export const login = async ({ phonenumber, password, res }) => {
  try {
    const user = await UserModel.findOne({ phonenumber });

    if (!user) {
      return {
        errCode: 1,
        message: "User not found",
      };
    }

    if (!(await comparePassword(password, user.password))) {
      return {
        errCode: 2,
        message: "Password is incorrect",
      };
    }

    const payload = {
      _id: user._id,
      username: user.username,
      phonenumber: user.phonenumber,
      backgroundPicture: user.backgroundPicture,
      avatarPicture: user.avatarPicture,
      gender: user.gender,
      birth: user.birth,
      keywords: user.keywords,
    };
    const access_token = create_access_token(payload, "1h");
    const fresh_token = create_fresh_token(payload, "24h");

    res
      .cookie("accessToken", access_token, {
        expires: new Date(new Date().getTime() + 31557600000),
        sameSite: "strict",
        httpOnly: true,
      })
      .cookie("freshToken", fresh_token, {
        expires: new Date(new Date().getTime() + 31557600000),
        sameSite: "strict",
        httpOnly: true,
      });
    user.freshToken = fresh_token;
    await user.save();

    return {
      errCode: 0,
      message: "Login successfully",
      data: payload,
      access_token,
    };
  } catch (err) {
    console.error(err);
  }
};

export const checkPhoneExist = async ({ phonenumber }) => {
  try {
    const user = await UserModel.findOne({ phonenumber });

    if (user) {
      return {
        errCode: 1,
        message: "Phonenumber is already used",
      };
    }
    return {
      errCode: 0,
      message: "Phonenumber is available",
    };
  } catch (err) {
    console.error(err);
  }
};

export const createFreshToken = async (freshToken, res, req) => {
  try {
    const user = await UserModel.findOne({ freshToken });
    if (user) {
      const decoded_freshToken = jwt.verify(
        freshToken,
        process.env.FRESH_TOKEN_SECRET
      );

      const expiresIn = decoded_freshToken.exp - Math.floor(Date.now() / 1000);

      delete decoded_freshToken.exp;
      delete decoded_freshToken.iat;
      const new_fresh_token = create_fresh_token(decoded_freshToken, expiresIn);

      const new_access_token = create_access_token(decoded_freshToken, "1m");

      res
        .cookie("accessToken", new_access_token, {
          expires: new Date(new Date().getTime() + 31557600000),
          sameSite: "strict",
          httpOnly: true,
        })
        .cookie("freshToken", new_fresh_token, {
          expires: new Date(new Date().getTime() + 31557600000),
          sameSite: "strict",
          httpOnly: true,
        });
      user.freshToken = new_fresh_token;
      await user.save();

      return res.status(200).json("refresh token successfull!!");
    }
    return res.status(401).json({ message: "unauthorized" });
  } catch (error) {
    console.error(error);
    return res.status(401).json({ message: "unauthorized" });
  }
};
