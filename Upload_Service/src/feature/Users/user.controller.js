import { asyncHandler } from "../../../../Backend/src/utility/asyncHandler.js";
import { User } from "./user.model.js";
import { ApiResponse } from "../../../../Backend/src/utility/ApiResponse.js";
import { ApiError } from "../../../../Backend/src/utility/ApiError.js";
import jwt from "jsonwebtoken";

// making the access and refresh token for the user

const generateAccessAndRefreshToken = async (userId) => {
  const user = await User.findById(userId);

  const accessToken = jwt.sign(
    { id: user._id },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: process.env.ACCESS_TOKEN_EXPIRATION },
  );

  const refreshToken = jwt.sign(
    { id: user._id },
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: process.env.REFRESH_TOKEN_EXPIRATION },
  );

  // save refresh token in DB
  user.refreshToken = refreshToken;
  await user.save({ validateBeforeSave: false });

  return { accessToken, refreshToken };
};

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    throw new ApiError(400, "All fields are required");
  }

  const userExist = await User.findOne({ email });

  if (userExist) {
    throw new ApiError(409, "User already exists");
  }

  const user = await User.create({
    name,
    email,
    password,
  });

  const userCreated = await User.findById(user._id).select("-password");

  if (!userCreated) {
    throw new ApiError(500, "Error while creating user");
  }

  return res
    .status(201)
    .json(new ApiResponse(201, userCreated, "User created successfully"));
});

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email: email });

  if (!user) {
    throw new ApiError(404, ` User Not Found with this email `);
  }

  const isPasswordMatch = await user.isPasswordCorrect(password);

  if (!isPasswordMatch) {
    throw new ApiError(401, ` Invalid Password `);
  }
  const userData = await User.findById(user._id).select(
    "-password -refreshToken",
  );

  const options = {
    httpOnly: true,
    secure: false,
    sameSite: "lax",
  };

  const { accessToken, refreshToken } = await generateAccessAndRefreshToken(
    user._id,
  );
  res
    .status(200)
    .cookie("refreshToken", refreshToken, options)
    .cookie("accessToken", accessToken, options)
    .json(new ApiResponse(200, userData, "User Logged In Successfully"));
});

const logoutUser = asyncHandler(async (req, res) => {
  const userId = req.user.id;
  const user = await User.findById(userId);

  if (!user) {
    return res.json(new ApiError(404, ` User Not Found `));
  }
  user.refreshToken = null;
  await user.save({ validateBeforeSave: false });

  const options = {
    httpOnly: true,
    secure: false,
    sameSite: "lax",
  };

  return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(new ApiResponse(200, {}, "User Logged Out Successfully"));
});

const refreshAccessToken = asyncHandler(async (req, res) => {
  const refreshToken = req.cookies.refreshToken;
  if (!refreshToken) {
    throw new ApiError(401, ` No Refresh Token Provided `);
  }

  const user = await User.findOne({ refreshToken: refreshToken });
  if (!user) {
    throw new ApiError(401, ` Invalid Refresh Token `);
  }

  const options = {
    httpOnly: true,
    secure: false,
    sameSite: "lax",
  };

  const { accessToken, refreshToken: newRefreshToken } =
    await generateAccessAndRefreshToken(user._id);

  res
    .status(200)
    .cookie("refreshToken", newRefreshToken, options)
    .cookie("accessToken", accessToken, options)
    .json(new ApiResponse(200, {}, "Access Token Refreshed Successfully"));
});

const deleteUser = asyncHandler(async (req, res) => {
  const userId = req.user.id;
  const user = await User.findById(userId);
  if (!user) {
    throw new ApiError(404, ` User Not Found `);
  }
  await User.findByIdAndDelete(userId);
  const options = {
    httpOnly: true,
    secure: false,
    sameSite: "lax",
  };
  return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(new ApiResponse(200, {}, "User Deleted Successfully"));
});

export { registerUser, loginUser, logoutUser, refreshAccessToken, deleteUser };
