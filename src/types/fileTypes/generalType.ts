import { z } from "zod"

export const generalType = z.object({
    key: z.string({ message: "Key should be provided" })
        .min(3, { message: "The minimum size of key is 3 characters" })
        .max(30, { message: "The maximum size of key is 30 characters" }),

    generalData: z.string({ message: "Secret should be provided" })
        .min(1, { message: "The minimum size of general data is 1 characters" })
})
