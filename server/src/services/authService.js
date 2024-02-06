import UserModel from "../models/User";
import { hashPassword, comparePassword } from "..//utils/crypto";
import { create_token, create_fresh_token } from "../utils/jwt";
export const register = async ({ username, password, phonenumber, res }) => {
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
    });
    await new_user.save();
    if (new_user) {
      return {
        errCode: 0,
        message: "Register successfully",
        data: new_user,
      };
    }
  } catch (err) {
    console.error(err);
  }
};

export const login = async ({ phonenumber, password, res }) => {
  try {
 

    const user = await UserModel.findOne({ phonenumber })
console.log("user>>>>>>>>>>>>>>>>>>",user)
    if (!user) {
      return {
        errCode: 1,
        message: "User not found",
      };
    }

    console.log("pass>>", user.password);
    if (!(await comparePassword(password, user.password))) {
      return {
        errCode: 2,
        message: "Password is incorrect",
      };
    }

    const payload = {
      id: user._id,
      avatarPicture: user.avatarPicture,
      username: user.username,
      backgroundPicture: user.backgroundPicture,
    };
    const access_token = create_token(payload, "1h");
    const fresh_token = create_fresh_token(payload, 258973);

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

    const response_user = user._doc;

    const {
      password: hashedPassword,
      phonenumber:phone,
      gender,
      birth,
      friends,
      groups,
      freshToken,
      createdAt,
      updatedAt,
      ...rest
    } = response_user;
    console.log("user:>>>>", response_user);
    return {
      errCode: 0,
      message: "Login successfully",
      data: rest,
      access_token,
      fresh_token,
    };
  } catch (err) {
    console.error(err);
  }
};

export const checkPhoneExist = async ({ phonenumber }) => {
  try {
    const user = await UserModel.findOne({ phonenumber });

    console.log("user:>>>>", user);
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
