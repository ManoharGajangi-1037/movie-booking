import { Prisma } from "@prisma/client";
import { comparePassword, generateToken, hashPassword } from "../utils/auth";
import prisma from "../config/prisma";
import { Role } from "../generated/prisma";

interface UserData {
  name: string;
  email: string;
  password: string;
  role?: "ADMIN" | "CUSTOMER";
}

export const createUser = async (userData: UserData) => {
  const hashedPassword = await hashPassword(userData.password);
  const user = await prisma.user.create({
    data: {
      email: userData.email,
      name: userData.name,
      password: hashedPassword,
      role: userData.role,
    },
  });
  return { user };
};

export const loginUser = async (email: string, password: string) => {
   const user = await prisma.user.findUnique({where:{email}})
   if (!user){
       throw new Error("User Not Found");
   }

   const isValidPassword = await comparePassword(password,user.password);
   if (!isValidPassword){
        throw new Error('Invalid Password');
   }
   const token = generateToken(user.id,user.role);
   return {token,user}
};
