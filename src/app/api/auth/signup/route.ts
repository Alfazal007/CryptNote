import { checkUsernameExists, ExistsOutput } from "@/helpers/checkUsernameExists"
import { hashPassword } from "@/helpers/hashPassword"
import { tryCatch } from "@/helpers/tryCatch"
import { prisma } from "@/prisma"
import { SignupType } from "@/types/authTypes/signUpType"
import { parse } from "node:url"

export async function POST(request: Request) {
    const body = await tryCatch(request.json())
    if (body.error) {
        return Response.json({
            message: "Check request body again"
        }, {
            status: 400
        })
    }

    const parsedDataResult = SignupType.safeParse(body.data)
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

    const usernameExists = await checkUsernameExists(parsedDataResult.data.username);

    if (usernameExists == ExistsOutput.DBERROR) {
        return Response.json({
            message: "Issue talking to the database"
        }, {
            status: 500
        })
    } else if (usernameExists == ExistsOutput.EXISTS) {
        return Response.json({
            message: "Username already taken"
        }, {
            status: 400
        })
    }

    const hashedPasswordResult = await hashPassword(parsedDataResult.data.password);
    if (hashedPasswordResult.error) {
        return Response.json({
            message: "Issue hashing the password",
        }, {
            status: 500
        })
    }

    const newUserOutput = await tryCatch(
        prisma.user.create({
            data: {
                username: parsedDataResult.data.username,
                password: hashedPasswordResult.data
            }
        })
    );

    if (newUserOutput.error) {
        return Response.json({
            message: "Issue creating the new user"
        }, {
            status: 500
        })
    }

    return Response.json({
        message: "Signup successful"
    }, {
        status: 201
    })
}

