// login.js
import dbConnect from "@/dbconfic/dbconfic";
import User from "@/models/userModel";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";
import { ApiError } from "next/dist/server/api-utils";
import jwt  from "jsonwebtoken";

export async function POST(req) {
    await dbConnect();
    const { email, password } = await req.json();

    if (!email || !password) {
        throw new ApiError(400, "Email and password are required");
    }

    //Check user exist
    const user = await User.findOne({ email });
    if (!user) {
        throw ApiError(400, "Invalid credentials");
    }


    //Check password
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
        throw ApiError(400, "Invalid Password");
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

