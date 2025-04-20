import { NextRequest } from 'next/server';
import * as jose from "jose"
import { envFileLoader } from '@/envFiles';
import { tryCatch } from '@/helpers/tryCatch';
import { prisma } from '@/prisma';

type AuthMiddlewareData = {
    isAuthenticated: boolean,
    username: string,
    password: string
    id: number
}

export async function authMiddleware(request: NextRequest): Promise<AuthMiddlewareData> {
    const accessToken = request.cookies.get('accessToken')?.value;
    const usernameFromRequest = request.cookies.get('username')?.value;
    if (!accessToken || !usernameFromRequest) {
        return {
            isAuthenticated: false,
            username: "",
            id: -1,
            password: ""
        }
    }
    const secret = new TextEncoder().encode(
        envFileLoader().jwtSecret,
    )

    const verificationResult = await tryCatch(jose.jwtVerify(accessToken, secret))
    if (verificationResult.error) {
        return {
            isAuthenticated: false,
            username: "",
            id: -1,
            password: ""
        }
    }

    const { username, id } = verificationResult.data.payload as { username: string, id: number }
    if (!username || !id || username !== usernameFromRequest) {
        return {
            isAuthenticated: false,
            username: "",
            id: -1,
            password: ""
        }
    }

    const userFromDbResult = await tryCatch(prisma.user.findFirst({
        where: {
            username
        }
    }))

    if (userFromDbResult.error) {
        return {
            isAuthenticated: false,
            id: -1,
            password: "",
            username: ""
        }
    }

    if (!userFromDbResult.data) {
        return {
            isAuthenticated: false,
            id: -1,
            username: "",
            password: ""
        }
    }

    return {
        isAuthenticated: true,
        username,
        id: userFromDbResult.data.id,
        password: userFromDbResult.data.password
    }
}
