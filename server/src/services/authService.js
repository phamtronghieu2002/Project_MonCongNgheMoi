import UserModel from "../models/User";
import { hashPassword, comparePassword } from "..//utils/crypto";
import { create_token, create_fresh_token } from "../utils/jwt";
export const register = async ({ username, password, phonenumber ,res}) => {
  try {
    const user = new UserModel({
      username,
      password: await hashPassword(password),
      phonenumber,
    });
    await user.save();
    if (user) {
      return {
        message: "User created successfully",
        data: user,
      };
    }
  } catch (err) {
    console.error(err);
  }
};

export const login = async ({ phonenumber, password ,res}) => {
  try {
    const excludedFields = [
      "phonenumber",
      "gender",
      "birth",
      "friends",
      "groups",
      "freshToken",
    ];

    const user = await UserModel.findOne({ phonenumber }).select(
      excludedFields.map((field) => `-${field}`).join(" ")
    );

    console.log("user:>>>>", user);
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

    const payload={
      id:user._id,
      avatarPicture:user.avatarPicture,
      username:user.username,
      backgroundPicture:user.backgroundPicture,
    }
    const access_token = create_token(payload, "1h");
    const fresh_token = create_fresh_token(payload,258973);

    res
      .cookie("accessToken", access_token, {
        expires: new Date(new Date().getTime() + 30 * 1000),
        sameSite: "strict",
        httpOnly: true,
      })
      .cookie("refreshToken", fresh_token, {
        expires: new Date(new Date().getTime() + 31557600000),
        sameSite: "strict",
        httpOnly: true,
      });
    user.freshToken = fresh_token;
    await user.save();
    return {
      message: "Login successfully",
      data: user,
      access_token,
      fresh_token,
    };
  } catch (err) {
    console.error(err);
  }
};
