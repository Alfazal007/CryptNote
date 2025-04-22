import { tryCatch } from "@/helpers/tryCatch";
import { authMiddleware } from "@/middlewares/auth";
import { prisma } from "@/prisma";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
    const { isAuthenticated, id } = await authMiddleware(request)
    if (!isAuthenticated) {
        return Response.json({
            message: "Login to use this endpoint"
        }, {
            status: 401
        })
    }

    const secretDataFromDBResult = await tryCatch(prisma.secret.findMany({
        where: {
            userId: id
        }, select: {
            id: true,
            key: true,
            createdAt: true
        }
    }))

    if (secretDataFromDBResult.error) {
        return Response.json({
            message: "Issue talking to the database"
        }, {
            status: 500
        })
    }

    return Response.json({
        data: secretDataFromDBResult.data
    }, {
        status: 200
    })
}
