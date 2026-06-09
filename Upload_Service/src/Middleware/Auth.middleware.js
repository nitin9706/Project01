import { User } from "../feature/Users/user.model.js";
import { ApiError } from "../utility/ApiError.js";
import { asyncHandler } from "../utility/asyncHandler.js";
import jwt from "jsonwebtoken";

export const verifyJWT = asyncHandler(async (req, res, next) => {
  try {
    const token =
      req.cookies?.accessToken ||
      req.header("authorization")?.replace("Bearer ", "");

    if (!token) {
      throw new ApiError(401, "unauthorized request");
    }

    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    const user = await User.findById(decodedToken?.id).select(
      "-password -refreshToken",
    );

    if (!user) {
      throw new ApiError(401, `Invaild Access Token${user}`);
    }

    req.user = user;
    next();
  } catch (error) {
    throw new ApiError(401, error?.message || "Invaild accessToken");
  }
});
