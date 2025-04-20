import { decryptAES, } from "./aesEncryption"
import { decryptBase64, } from "./base64Encryption"
import { decryptBase58, } from "./base58Encryption"

export const decryptFull = (valueToBeDecrypted: string): string => {
    const base58DecodedData = decryptBase58(valueToBeDecrypted)
    const base64DecodedData = decryptBase64(base58DecodedData)
    const aesDecryptedData = decryptAES(base64DecodedData)
    return aesDecryptedData
}

