import dbConnect from "@/dbconfic/dbconfic";
import User from "@/models/userModel";
import { NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import { ApiError } from "next/dist/server/api-utils";



export async function POST(NextRequest){


    await dbConnect()
    const reqBody = await NextRequest.json()
    const { username, email, password } = reqBody;

    //check if user already exists
    const user = await User.findOne({ $or: [{ email }, { username }] })
    if (user) {
        let message = `User email ${email} already exist`
        if (user.username === username) {
            message = `User with username ${username} already exist`
        }
        throw new ApiError(400, message)
    }

    //hash password
    const salt = await bcryptjs.genSalt(10)
    const hashedpassword = await bcryptjs.hash(password, salt)

    const newUser = new User({
        username,
        email,
        password: hashedpassword,
    })

    const savedUser = await newUser.save();

    return NextResponse.json({
        message: "User created successfully",
        success: true,
        data: savedUser,
    })





}



