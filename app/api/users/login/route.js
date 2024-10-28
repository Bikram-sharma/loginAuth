// login.js
import dbConnect from "@/dbconfic/dbconfic";
import User from "@/models/userModel";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";
import { custom_middleware } from "@/helpers/global-route-middleware";
import { ApiError } from "next/dist/server/api-utils";

const loginHandler = async (req) => {
    await dbConnect();
    const { email, password } = await req.json();

    if (!email || !password) {
        throw new ApiError(400, "Email and password are required");
    }

    const user = await User.findOne({ email });
    if (!user) {
        throw new ApiError(400, "Invalid credentials");
    }

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
        throw new ApiError(400, "Invalid credentials");
    }

    return NextResponse.json({
        message: "Login successful",
        redirectTo: `/profile/${user.username}`,
    });
};

export const POST = custom_middleware(loginHandler)
