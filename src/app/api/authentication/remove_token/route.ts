import { NextRequest, NextResponse } from "next/server"
import { cookies } from "next/headers"

import {
    USERS_SERVER_COOKIE_NAME
} from '@Constants'

export const GET = async (req: NextRequest) => {
    try {
        let token = null
        const cookie = await cookies()

        if (USERS_SERVER_COOKIE_NAME) {
            token = cookie.get(USERS_SERVER_COOKIE_NAME)?.value
            if (token) {
                cookie.delete(USERS_SERVER_COOKIE_NAME)
            }
        }

        return NextResponse.json({ status: 200 })
    } catch (err: any) {
        return NextResponse.json({error: err.message}, { status: 500 })
    }
}