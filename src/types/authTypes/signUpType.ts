import { z } from "zod";

export const SignUpSignInType = z.object({
    username: z.string({ message: "Username not provided" })
        .min(6, { message: "The minimum length of username is 6" })
        .max(20, { message: "The maximum length of username is 20" }),

    password: z.string({ message: "Password not provided" })
        .min(6, { message: "The minimum length of password is 6" })
        .max(20, { message: "The maximum length of password is 20" })
})
