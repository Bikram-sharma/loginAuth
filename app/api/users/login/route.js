// login.js
import dbConnect from "@/dbconfic/dbconfic";
import User from "@/models/userModel";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";
import { custom_middleware } from "@/helpers/global-route-middleware";
import { ApiError } from "next/dist/server/api-utils";
import jwt  from "jsonwebtoken";

const loginHandler = async (req) => {
    await dbConnect();
    const { email, password } = await req.json();

    if (!email || !password) {
        throw new ApiError(400, "Email and password are required");
    }

    //Check user exist
    const user = await User.findOne({ email });
    if (!user) {
        throw new ApiError(400, "Invalid credentials");
    }


    //Check password
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
        throw new ApiError(400, "Invalid Password");
    }

    const tokenData = {
        id:user._id,
        username: user.username,
        email: user.email,

    }

    const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET, {expiresIn:"1d"});

    const response = NextResponse.json({
        message: "Login successful",
        success: true,
    });

    response.cookies.set('token', token,{
        httpOnly:true,
    })

    return response;



    // return NextResponse.json({
    //     message: "Login successful",
    //     redirectTo: `/profile/${user.username}`,
    // });

    


};

export const POST = custom_middleware(loginHandler)
