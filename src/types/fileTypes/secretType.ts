import { z } from "zod"

export const secretType = z.object({
    key: z.string({ message: "Key should be provided" })
        .min(3, { message: "The minimum size of key is 3 characters" })
        .max(30, { message: "The maximum size of key is 30 characters" }),

    secret: z.string({ message: "Secret should be provided" })
        .min(1, { message: "The minimum size of secret is 1 characters" })
        .max(255, { message: "The maximum size of secret is 255 characters" }),
})
