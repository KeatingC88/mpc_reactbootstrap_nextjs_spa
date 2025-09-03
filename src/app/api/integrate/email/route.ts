import { NextRequest, NextResponse } from "next/server"
import { cookies } from "next/headers"
import axios from "axios"

import {
    USERS_SERVER_ADDRESS
} from '@Constants'

export const POST = async (req: NextRequest) => {
    try {
        const body = await req.json()

        const res = await axios.post(
            `${USERS_SERVER_ADDRESS}/Email/Submit`,
            body,
            { withCredentials: true }
        )

        return NextResponse.json( res.data )
    } catch (err: any) {
        return NextResponse.json({ error: err.message }, { status: 500 })
    }
}