import bs58 from "bs58"

export function encryptBase58(text: string): string {
    const textBuffer = Buffer.from(text, 'binary')
    const base58Encoded = bs58.encode(textBuffer)
    return base58Encoded
}

export function decryptBase58(encryptedText: string): string {
    const decoded = bs58.decode(encryptedText);
    return Buffer.from(decoded).toString('binary');
}
