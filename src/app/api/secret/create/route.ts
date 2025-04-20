import { envFileLoader } from "@/envFiles";
import { encryptFull } from "@/helpers/encryptFull";
import { isPasswordCorrect } from "@/helpers/hashPassword";
import { tryCatch } from "@/helpers/tryCatch";
import { authMiddleware } from "@/middlewares/auth";
import { prisma } from "@/prisma";
import { secretType } from "@/types/fileTypes/secretType";
import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
    const { isAuthenticated, password, id } = await authMiddleware(request)
    if (!isAuthenticated) {
        return Response.json({
            message: "Login to use this endpoint"
        }, {
            status: 401
        })
    }

    const body = await tryCatch(request.json())
    if (body.error) {
        return Response.json({
            message: "Request body invalid"
        }, {
            status: 400
        })
    }

    const parsedData = secretType.safeParse(body.data)
    if (!parsedData.success) {
        const errors: string[] = []
        parsedData.error.errors.map((err) => {
            errors.push(err.message)
        })
        return Response.json({
            errors
        }, { status: 400 })
    }

    const passwordResult = await isPasswordCorrect(parsedData.data.password, password);
    if (!passwordResult) {
        return Response.json({
            message: "Incorect password"
        }, {
            status: 400
        })
    }

    let encryptedData = encryptFull(parsedData.data.secret, parsedData.data.password + envFileLoader().aesSecret)
    const addSecretResult = await tryCatch(prisma.secret.create({
        data: {
            key: parsedData.data.key,
            value: encryptedData,
            userId: id
        }
    }))
    if (addSecretResult.error) {
        return Response.json({
            message: "Issue writing to the database, try changing the key if there already exists a key with same name"
        }, {
            status: 400
        })
    }

    return Response.json({
        message: "Successfully created the secret"
    }, {
        status: 201
    })
}

