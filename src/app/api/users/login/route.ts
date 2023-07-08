import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel"
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";


connect()

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const { email, password } = reqBody;
        console.log(reqBody);

        const user = await User.findOne({ email });
        if (!user) {
            return NextResponse.json({ error: "User not found" }, { status: 500 })
        }
        //check the hashed passwords match
        const validPassword = await bcryptjs.compare(password, user.password);
        if (!validPassword) {
            return NextResponse.json({ error: "Invalid password" }, { status: 500 });
        }
        // create token data
        let accessTokenData = {
            id: user._id,
            username: user.username,
            email: user.email,
        };

        //  create token
        const token = await jwt.sign(accessTokenData, process.env.TOKEN_SECRET!, { expiresIn: "1d" });

        const resposne = NextResponse.json({
            message: "Login successful",
            success: true
        });
        resposne.cookies.set(
            "token",
            token,
            {
                httpOnly: true
            }
        );
        return resposne;

    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}