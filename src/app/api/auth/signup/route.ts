import { tryCatch } from "@/app/helpers/tryCatch";

export async function POST(request: Request) {
    const body = await tryCatch(request.json())
    if (body.error) {
        return Response.json({
            message: "Check request body again"
        }, {
            status: 400
        })
    }

    return Response.json({
        message: "done here"
    })
}

