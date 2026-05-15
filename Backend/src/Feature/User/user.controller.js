import { asyncHandler } from "../../utility/asyncHandler.js";
import { User } from "./user.model.js";
import { ApiResponse } from "../../utility/ApiResponse.js";
import { ApiError } from "../../utility/ApiError.js";

const registerUser = asyncHandler(async (req, res) => {
  // getting the data from the user
  const { name, email, password } = req.data;

  const userExist = await User.findOne({ email: email });
  if (userExist) return res.json(new ApiError(500, ` The User already Exist `));

  const user = await User.create({
    name: name,
    email: email,
    password: password,
  });

  const userCreated = await User.findById(user._id).select("-password");

  if (!userCreated) {
    res.json(new ApiError(500, ` Error While creating the user in db `));
  }

  res.json(new ApiResponse(201, userCreated, "User Created Successfully"));
});

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.data;

  const user = await User.findOne({ email: email });

  if (!user) {
    return res.json(new ApiError(404, ` User Not Found with this email `));
  }

  const isPasswordMatch = await user.isPasswordCorrect(password);

  if (!isPasswordMatch) {
    return res.json(new ApiError(401, ` Invalid Password `));
  }
  const userData = await User.findById(user._id).select("-password");
  res.json(new ApiResponse(200, userData, "User Logged In Successfully"));
});
export { registerUser, loginUser };
