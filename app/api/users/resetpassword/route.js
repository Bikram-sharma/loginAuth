import dbConnect from '@/dbconfic/dbconfic';
import { NextResponse } from 'next/server';
import User from '@/models/userModel';
import bcryptjs from 'bcryptjs';

export async function POST(request) {
  await dbConnect();

  try {
    const reqBody = await request.json();
    const { token, newPassword } = reqBody;

    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(newPassword, salt);

    const user = await User.findOneAndUpdate(
      {forgotPasswordToken:token}, 
      { password: hashedPassword }
    );

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json({
      message: "Password Updated Successfully",
      redirect: '/login',
    });

  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
