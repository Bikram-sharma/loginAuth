import dbConnect from "@/dbconfic/dbconfic";
import User from "@/models/userModel";
import { NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import {sendEmail} from "@/helpers/mailer";

export async function POST(nextRequest) {
    await dbConnect();
    const reqBody = await nextRequest.json();
    const { username, email, password } = reqBody;

    // Check if user already exists
    const existingUser = await User.findOne({ $or: [{ email }, { username }] });
    if (existingUser) {
        let message = `User with email ${email} already exists`;
        if (existingUser.username === username) {
            message = `User with username ${username} already exists`;
        }
        return NextResponse.json({ error: message }, { status: 400 });
    }

    // Hash password
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    const newUser = new User({
        username,
        email,
        password: hashedPassword,
    });


    const savedUser = await newUser.save();

    // Send verification email
   
    await sendEmail({email, emailType: "VERIFY", userId: savedUser._id});

        
   
    

    return NextResponse.json({
        message: "User created successfully",
        success: true,
        data: savedUser,
    });
}
