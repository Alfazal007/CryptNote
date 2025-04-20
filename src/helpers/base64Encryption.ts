export function encryptBase64(text: string): string {
    const base64Encoded = Buffer.from(text).toString('base64');
    return base64Encoded
}

export function decryptBase64(encryptedText: string): string {
    const decodedData = Buffer.from(encryptedText, 'base64').toString('utf-8');
    return decodedData
}

