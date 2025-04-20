import { encryptAES } from "./aesEncryption"
import { encryptBase64 } from "./base64Encryption"
import { encryptBase58 } from "./base58Encryption"

export const encryptFull = (valueToBeEncrypted: string, password: string): string => {
    const base64EncodedData = encryptBase64(valueToBeEncrypted)
    const base58EncodedData = encryptBase58(base64EncodedData)
    const aesEncryptedData = encryptAES(base58EncodedData, password)
    return aesEncryptedData
}

