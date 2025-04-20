import { tryCatch } from "@/helpers/tryCatch";
import { authMiddleware } from "@/middlewares/auth";
import { prisma } from "@/prisma";
import { getGeneralType } from "@/types/fileTypes/getGeneralType";
import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
    const { isAuthenticated, id } = await authMiddleware(request)
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

    const parsedData = getGeneralType.safeParse(body.data)
    if (!parsedData.success) {
        const errors: string[] = []
        parsedData.error.errors.map((err) => {
            errors.push(err.message)
        })
        return Response.json({
            errors
        }, { status: 400 })
    }

    const generalDataFromDBResult = await tryCatch(prisma.generalFile.findFirst({
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

    if (generalDataFromDBResult.error) {
        return Response.json({
            message: "Issue talking to the database"
        }, {
            status: 500
        })
    }

    if (!generalDataFromDBResult.data) {
        return Response.json({
            message: "Could not find the key in the database"
        }, {
            status: 404
        })
    }

    const deleteResult = await tryCatch(prisma.generalFile.delete({
        where: {
            id: generalDataFromDBResult.data.id
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
