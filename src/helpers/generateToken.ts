import { envFileLoader } from "@/envFiles"
import * as jose from "jose"

export async function generateAccessToken(username: string, id: number): Promise<string> {
    const secret = new TextEncoder().encode(
        envFileLoader().jwtSecret,
    )
    const alg = 'HS256'
    const jwt = await new jose.SignJWT({ username, id })
        .setProtectedHeader({ alg })
        .setExpirationTime('24h')
        .sign(secret)
    return jwt
}
