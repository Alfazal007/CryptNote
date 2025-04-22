import { NextRequest } from "next/server";

export function GET(_: NextRequest) {
    const headers = new Headers();
    headers.set('Content-Type', 'application/json');
    headers.append('Set-Cookie', `accessToken=; HttpOnly; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT; SameSite=Strict; Secure=true`);
    headers.append('Set-Cookie', `username=; HttpOnly; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT; SameSite=Strict; Secure=true`);
    return Response.json({}, {
        status: 200,
        headers
    })
}
