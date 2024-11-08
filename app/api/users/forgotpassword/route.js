import dbConnect from "@/dbconfic/dbconfic";
import {NextResponse } from "next/server";
import User from "@/models/userModel";
import { sendEmail } from "@/helpers/mailer";





export async function POST(request){

    await dbConnect()

    try {
        const reqBody = await request.json()
        const {email} = reqBody
        

        const user = await User.findOne({email: email});


        if (!user) {
            return NextResponse.json({error: "user does not exist"}, {status: 400})
            
        }

        // const {userId} = user
        // const hashedToken = await bcryptjs.hash(userId.toString(), 10)

        // user.isVerfied = true;
        // user.verifyToken = undefined;
        // user.verifyTokenExpiry = undefined;
        // await user.save();
        await sendEmail({email, emailType: "RESET", userId: user._id});
        
        return NextResponse.json({
            message: user.username,
            success: true,
            redirect: "/login"
        })


      } catch (error) {
          return NextResponse.json({error: error.message}, {status: 500})
    }

   }