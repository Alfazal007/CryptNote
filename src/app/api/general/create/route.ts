import { tryCatch } from "@/helpers/tryCatch";
import { authMiddleware } from "@/middlewares/auth";
import { prisma } from "@/prisma";
import { generalType } from "@/types/fileTypes/generalType";
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

    const parsedData = generalType.safeParse(body.data)
    if (!parsedData.success) {
        const errors: string[] = []
        parsedData.error.errors.map((err) => {
            errors.push(err.message)
        })
        return Response.json({
            errors
        }, { status: 400 })
    }

    const addGeneralResult = await tryCatch(prisma.generalFile.create({
        data: {
            key: parsedData.data.key,
            value: parsedData.data.generalData,
            userId: id
        }
    }))

    if (addGeneralResult.error) {
        return Response.json({
            message: "Issue writing to the database, try changing the key if there already exists a key with same name"
        }, {
            status: 400
        })
    }

    return Response.json({
        message: "Successfully created the file"
    }, {
        status: 201
    })
}
