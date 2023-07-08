import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel"
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";

connect()

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const { username, email, password } = reqBody;

        const user = await User.findOne({ email: email });
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
        console.log(savedUser);

        return NextResponse.json({
            message: "created user successfully! ",
            success: true,
            savedUser
        });


        // if (!username ||!email ||!password ) throw new Error("Please provide all required fields");
        // Check for existing user with same credentials
        // let foundUser = await User.findOne({$or:[
        //     {"_id": {$ne : undefined}},
        //     {'username': username },
        //     {'email'   : email }]});
        //     console.log('found',foundUser);
        //     if(!foundUser &&!(await checkPasswordStrength(password)))
        //     throw new Error(`Username or Email already exists`);
        //     else{
        //         var saltRounds=12
        //         const hashedPassowrd = await hashPasswordWithSaltAndRounds(saltRounds,
        //             String(reqBody['password']));
        //             delete reqBody["confirm-password"]
        //             Object.assign(foundUser,{...reqBody,"hashedPassword":hashedPassowrd })
        //             updatedUser = await foundUser?.save().catch((err)=>console.log(err))

    } catch (error: any) {
        return NextResponse.json({ error: error.message },
            { status: 500 })
    }
}