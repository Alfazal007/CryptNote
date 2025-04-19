import { prisma } from "@/prisma";
import { tryCatch } from "./tryCatch";

export enum ExistsOutput {
    DBERROR = "DBERROR",
    EXISTS = "EXISTS",
    DOESNOTEXISTS = "DOESNOTEXISTS"
}

export async function checkUsernameExists(username: string): Promise<ExistsOutput> {
    const dbResult = await tryCatch(prisma.user.findFirst({
        where: {
            username
        }
    }))
    if (dbResult.error) {
        return ExistsOutput.DBERROR
    }
    if (dbResult.data) {
        return ExistsOutput.EXISTS
    }
    return ExistsOutput.DOESNOTEXISTS
}
