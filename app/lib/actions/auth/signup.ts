"use server"
import { hash } from "bcryptjs"
import { prisma } from "../../config/prisma"
import { SignupValuesTypes } from "@/types/auth"

export const signup = async (values: SignupValuesTypes) => {
  try {
    const user = await prisma.user.findFirst({
      where: {
        email: values.email
      }
    })
    if(user) {
      throw new Error("Email already used")
    }
    const hashPassword = await hash(values.password, 10)
    const response = await prisma.user.create({
      data: {
        name: values.name,
        email: values.email,
        password: hashPassword
      }
    })
    const { password, ...dataResponse } = response
    return {
      ok: true,
      message: "New user has created",
      data: dataResponse
    }
    
  } catch (error: any) {
    return { error: error instanceof Error ? error.message : "Something went wrong" }
  }
}