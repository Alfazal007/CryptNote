import { z } from "zod"

export const getGeneralType = z.object({
    key: z.string({ message: "Key should be provided" })
        .min(3, { message: "The minimum size of key is 3 characters" })
        .max(30, { message: "The maximum size of key is 30 characters" }),
})
