import { request } from "http";
import jwt from "jsonwebtoken";
import { NextRequest } from "next/server";


export const getTokenData = (request:NextRequest) =>{
    try {
        const encToken = request.cookies.get('token')?.value || '';
        const decToken:any = jwt.verify(encToken, process.env.TOKEN_SECRET!)
        return decToken.id;
    } catch (error:any) {
        console.log(error);

    }
}