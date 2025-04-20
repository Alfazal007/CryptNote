import { z } from "zod"

export const getSecretType = z.object({
    key: z.string({ message: "Key should be provided" })
        .min(3, { message: "The minimum size of key is 3 characters" })
        .max(30, { message: "The maximum size of key is 30 characters" }),

    password: z.string({ message: "Password not provided" })
        .min(6, { message: "The minimum length of password is 6" })
        .max(20, { message: "The maximum length of password is 20" })
})
