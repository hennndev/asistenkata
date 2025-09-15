import jwt from "jsonwebtoken"

interface CreateTokenParams {
  payload: string
  secret: string
  maxAge: number
}

export const createToken = ({payload, secret, maxAge}: CreateTokenParams) => {
  return jwt.sign({payload}, secret, {expiresIn: maxAge})
}