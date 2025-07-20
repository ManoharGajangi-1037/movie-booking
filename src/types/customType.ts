import { Request } from "express";

interface decodedToken {
    userId:string,
    role:string
}
export interface AuthenticationRequest extends Request{
    user?:decodedToken
}