import { encryptAES } from "./aesEncryption"
import { encryptBase64 } from "./base64Encryption"
import { encryptBase58 } from "./base58Encryption"

export const encryptFull = (valueToBeEncrypted: string): string => {
    const aesEncryptedData = encryptAES(valueToBeEncrypted)
    const base64EncodedData = encryptBase64(aesEncryptedData)
    const base58EncodedData = encryptBase58(base64EncodedData)
    return base58EncodedData
}

