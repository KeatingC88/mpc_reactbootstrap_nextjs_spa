import { NextRequest, NextResponse } from "next/server"
import { cookies } from "next/headers"
import { redirect } from "next/navigation";

import axios from "axios"
import { Encrypt } from '@AES/Encryptor'

import {
    APPLICATION_NEWS_SERVER_ADDRESS,
    USERS_SERVER_COOKIE_NAME,
} from '@Constants'

export const POST = async (req: NextRequest) => {
    try {
        const dto = await req.json()
        let token = null
        const cookie = await cookies()

        if (USERS_SERVER_COOKIE_NAME)
            token = cookie.get(USERS_SERVER_COOKIE_NAME)?.value

        if (!token)
            redirect("/Logout")

        await axios.post(
            `${APPLICATION_NEWS_SERVER_ADDRESS}/new/article/`,
            {
                user_id: Encrypt(dto.id),
                token: token,
                headline: Encrypt(dto.headline),
                sub_headline: Encrypt(dto.sub_headline),
                byline: Encrypt(dto.byline),
                image_urls: Encrypt(dto.image_urls),
                body: Encrypt(dto.body),
                tags: Encrypt(dto.tags),
                source_urls: Encrypt(dto.source_urls),
                language: Encrypt(dto.language),
                region: Encrypt(dto.region)
            },
            { withCredentials: true }
        ).catch((error) => {
            return NextResponse.json({ error: error.message }, { status: 500 })
        })

        return NextResponse.json({ status: 200 })
    } catch (err: any) {
        return NextResponse.json({ error: err.message }, { status: 500 })
    }
}