import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel"
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import { sendEMail } from "@/helpers/mailer";

connect()

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const { username, email, password } = reqBody;

        const user = await User.findOne({ email });
        if (user) {
            return NextResponse.json({ "Error": "Email Already Exists" }, { status: 400 })
        }
        const salt = await bcryptjs.genSalt(10);
        const hashedPassowrd = await bcryptjs.hash(password, salt);
        const createdUser = new User({
            username,
            email,
            password: hashedPassowrd,
        });

        const savedUser = await createdUser.save();

        await sendEMail({email, emailType: "VERIFY", userId: savedUser._id});


        return NextResponse.json({
            message: "created user successfully! ",
            success: true,
        });


    } catch (error: any) {
        return NextResponse.json({ error: error.message },
            { status: 500 })
    }
}