import { NextRequest, NextResponse } from "next/server"
import { cookies } from "next/headers"
import { redirect } from "next/navigation";

import axios from "axios"
import { Decrypt } from '@AES/Decryptor'

import {
    APPLICATION_NEWS_SERVER_ADDRESS,
    USERS_SERVER_COOKIE_NAME,
} from '@Constants'

export const POST = async (req: NextRequest) => {
    try {
        let token = null
        const cookie = await cookies()

        if (USERS_SERVER_COOKIE_NAME)
            token = cookie.get(USERS_SERVER_COOKIE_NAME)?.value

        if (!token)
            redirect("/Logout")

        const res = await axios.post(`${APPLICATION_NEWS_SERVER_ADDRESS}/get/articles/`, {token: token}, {withCredentials: true})

        return NextResponse.json(JSON.parse(Decrypt(res.data)), { status: 200 })
    } catch (err: any) {
        return NextResponse.json({ error: err.message }, { status: 500 })
    }
}