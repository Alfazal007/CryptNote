import { NextRequest } from "next/server";

export function GET(request: NextRequest) {
    const accessToken = request.cookies.get('accessToken')?.value;
    const usernameFromRequest = request.cookies.get('username')?.value;
    if (!accessToken || !usernameFromRequest) {
        return Response.json({}, {
            status: 401
        })
    }
    return Response.json({
        accessToken,
        username: usernameFromRequest
    }, {
        status: 200
    })
}
