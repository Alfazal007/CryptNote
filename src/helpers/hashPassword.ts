import bcrypt from "bcryptjs";
import { Result, tryCatch } from "./tryCatch";

export async function hashPassword(password: string): Promise<Result<string>> {
    const hashedPasswordResult = await tryCatch(bcrypt.hash(password, 12));
    if (hashedPasswordResult.error) {
        return {
            data: null,
            error: hashedPasswordResult.error
        }
    }
    return {
        error: null,
        data: hashedPasswordResult.data
    }
}

export async function isPasswordCorrect(plainPassword: string, hashedPassword: string): Promise<boolean> {
    const isPasswordCorrectResult = await tryCatch(bcrypt.compare(plainPassword, hashedPassword))
    if (isPasswordCorrectResult.error) {
        return false
    }
    return isPasswordCorrectResult.data
}
