import { cache } from "react";
import { connectMongo } from "./db";
import { AdminModel } from "./models";
import { getAuthCookie, verifyJwt } from "./auth";

export const getCurrentUser = cache(async () => {
  const token = getAuthCookie();
  if (!token) return null;

  try {
    const payload = verifyJwt(token);
    await connectMongo();
    const user = await AdminModel.findById(payload.sub).select("-password").lean();
    if (!user) return null;
    return {
      id: user._id.toString(),
      username: user.username,
      role: payload.role
    };
  } catch (error) {
    console.warn("Failed to get current user", error);
    return null;
  }
});


