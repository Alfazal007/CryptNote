export function envFileLoader() {
    return (
        {
            databaseUrl: process.env.DATABASE_URL as string,
            jwtSecret: process.env.JWTSECRET as string,
            aesSecret: process.env.AESSECRET as string
        }
    )
}
