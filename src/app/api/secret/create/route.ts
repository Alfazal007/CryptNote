import { decryptAES, encryptAES } from "@/helpers/aesEncryption";
import { decryptFull } from "@/helpers/decryptFull";
import { encryptFull } from "@/helpers/encryptFull";
import { tryCatch } from "@/helpers/tryCatch";
import { secretType } from "@/types/fileTypes/secretType";

export async function POST(request: Request) {
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

    let encryptedData = encryptFull(parsedData.data.secret)
    console.log({ encryptedData })
    let decryptedData = decryptFull(encryptedData)
    console.log({ decryptedData })

    return Response.json({
        message: "sent"
    })
}

