import { getTokenData } from "@/helpers/getTokenData";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel";
import { connect } from "@/dbConfig/dbConfig";

connect();

export async function GET(request: NextRequest) {
  try {
    const userInfo = await getTokenData(request);
    const user = await User.findOne({_id:userInfo}).
    select("-password -__v");
    return NextResponse.json({
        message: `Welcome ${user}!`,
        data:user
    });
  } catch (error: any) {
    console.log("Error in middleware", error);
    return NextResponse.json(
      {
        error: error.message,
      },
      { status: 500 }
    );
  }
}
