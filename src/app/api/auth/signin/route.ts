import { generateAccessToken } from "@/helpers/generateToken"
import { isPasswordCorrect } from "@/helpers/hashPassword"
import { tryCatch } from "@/helpers/tryCatch"
import { prisma } from "@/prisma"
import { SignUpSignInType } from "@/types/authTypes/signUpType"

export async function POST(request: Request) {
    const body = await tryCatch(request.json())
    if (body.error) {
        return Response.json({
            message: "Check request body again"
        }, {
            status: 400
        })
    }

    const parsedDataResult = SignUpSignInType.safeParse(body.data)
    if (!parsedDataResult.success) {
        const errors: string[] = []
        parsedDataResult.error.errors.forEach((err) => {
            errors.push(err.message)
        })
        return Response.json({
            errors
        }, {
            status: 400
        })
    }

    const userFromDb = await tryCatch(prisma.user.findFirst({
        where: {
            username: parsedDataResult.data.username
        }
    }))
    if (userFromDb.error) {
        return Response.json({
            message: "Issue talking to the database"
        }, {
            status: 500
        })
    }

    if (!userFromDb.data) {
        return Response.json({
            message: "Not found"
        }, {
            status: 404
        })
    }

    const passwordResult = await isPasswordCorrect(parsedDataResult.data.password, userFromDb.data?.password);
    if (!passwordResult) {
        return Response.json({
            message: "Incorect password"
        }, {
            status: 400
        })
    }

    const accessToken = await generateAccessToken(userFromDb.data.username, userFromDb.data.id)

    const headers = new Headers();
    headers.set('Content-Type', 'application/json');
    headers.append('Set-Cookie', `accessToken=${accessToken}; HttpOnly; Path=/; Max-Age=86400; SameSite=Strict; Secure=true`);
    headers.append('Set-Cookie', `username=${userFromDb.data.username}; HttpOnly; Path=/; Max-Age=86400; SameSite=Strict; Secure=true`);

    return Response.json({
        username: userFromDb.data.username,
        accessToken
    }, {
        status: 200,
        headers
    })
}
