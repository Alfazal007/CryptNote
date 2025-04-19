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
