import { NextRequest, NextResponse } from "next/server"
import axios from "axios"
import { Decrypt } from '@AES/Decryptor'
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

        return NextResponse.json({status: 204})
    } catch (err: any) {
        return NextResponse.json({ error: err.message }, { status: 500 })
    }
}