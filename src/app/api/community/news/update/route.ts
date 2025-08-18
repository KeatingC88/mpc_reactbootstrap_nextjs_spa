import { NextRequest, NextResponse } from "next/server"
import { cookies } from "next/headers"
import { redirect } from "next/navigation";

import axios from "axios"
import { Encrypt } from '@AES/Encryptor'

import {
    APPLICATION_NEWS_SERVER_ADDRESS,
    USERS_SERVER_COOKIE_NAME,
} from '@Constants'

export const PUT = async (req: NextRequest) => {
    try {
        const dto = await req.json()
        let token = null
        const cookie = await cookies()

        if (USERS_SERVER_COOKIE_NAME)
            token = cookie.get(USERS_SERVER_COOKIE_NAME)?.value

        if (!token)
            redirect("/Logout")

        await axios.put(`${APPLICATION_NEWS_SERVER_ADDRESS}/edit/article/`, {
            user_id: Encrypt(`${dto.user_id}`),
            document_id: Encrypt(`${dto.document_id}`),
            token: token,
            headline: Encrypt(`${dto.headline}`),
            sub_headline: Encrypt(`${dto.sub_headline}`),
            byline: Encrypt(`${dto.byline}`),
            image_urls: Encrypt(dto.image_urls),
            body: Encrypt(dto.body),
            tags: Encrypt(dto.tags),
            source_urls: Encrypt(dto.source_urls),
            language: Encrypt(`${dto.language}`),
            region: Encrypt(`${dto.region}`)
        }, {
            headers: {
                "Content-Type": "application/json"
            }, withCredentials: true
        }).catch((error) => {
            return NextResponse.json({ error: error.message }, { status: 500 })
        })

        return NextResponse.json({ status: 200 })
    } catch (err: any) {
        return NextResponse.json({ error: err.message }, { status: 500 })
    }
}