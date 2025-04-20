import { isPasswordCorrect } from "@/helpers/hashPassword";
import { tryCatch } from "@/helpers/tryCatch";
import { authMiddleware } from "@/middlewares/auth";
import { prisma } from "@/prisma";
import { getSecretType } from "@/types/fileTypes/getSecretType";
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

    const parsedData = getSecretType.safeParse(body.data)
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

    const secretDataFromDBResult = await tryCatch(prisma.secret.findFirst({
        where: {
            AND: [
                {
                    key: parsedData.data.key
                },
                {
                    userId: id
                }
            ]
        }
    }))

    if (secretDataFromDBResult.error) {
        return Response.json({
            message: "Issue talking to the database"
        }, {
            status: 500
        })
    }

    if (!secretDataFromDBResult.data) {
        return Response.json({
            message: "Could not find the key in the database"
        }, {
            status: 404
        })
    }

    const deleteResult = await tryCatch(prisma.secret.delete({
        where: {
            id: secretDataFromDBResult.data.id
        }
    }))

    if (deleteResult.error) {
        console.log({ err: deleteResult.error })
        return Response.json({
            message: "Issue deleting the secret, try again later"
        }, {
            status: 500
        })
    }

    return Response.json({}, {
        status: 200
    })
}
