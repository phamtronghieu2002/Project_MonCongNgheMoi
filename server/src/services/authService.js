import UserModel from "../models/User";
export const register = async ({ username, password, phonenumber }) => {
  try {
    const user = new UserModel({
      username,
      password,
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
