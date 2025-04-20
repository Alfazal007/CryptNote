import { decryptBase64, } from "./base64Encryption"
import { decryptBase58, } from "./base58Encryption"
import { decryptAES } from "./aesEncryption"

export const decryptFull = (valueToBeDecrypted: string, password: string): string => {
    const aesDecryptedData = decryptAES(valueToBeDecrypted, password)
    const base58DecodedData = decryptBase58(aesDecryptedData)
    const base64DecodedData = decryptBase64(base58DecodedData)
    return base64DecodedData
}

