import { NextRequest, NextResponse } from "next/server"
import { cookies } from "next/headers"
import axios from "axios"

import { Decrypt } from '@AES/Decryptor'
import { Encrypt } from '@AES/Encryptor'

import {
    USERS_SERVER_ADDRESS,
    USERS_SERVER_COOKIE_NAME,
    USERS_CACHE_SERVER_ADDRESS
} from '@Constants'

import { JWT_Email_Validation } from '@JWT/Decoder'

export const POST = async (req: NextRequest) => {
    try {
        const body = await req.json()

        const res = await axios.post(
            `${USERS_SERVER_ADDRESS}/Email/Submit`,
            body,
            { withCredentials: true }
        )

        const setCookieHeader = res.headers['set-cookie']
        if (!setCookieHeader) {
            throw new Error("No Set-Cookie header received from server")
        }

        const cookieName = USERS_SERVER_COOKIE_NAME ?? ""
        const jwtMatch = setCookieHeader[0].match(
            new RegExp(`${cookieName}=([^]+)`)
        )

        if (!jwtMatch) {
            throw new Error("JWT token not found in Set-Cookie")
        }

        let jwt_token = jwtMatch[1].split(`;`)[0]

        let account_creation_data = JSON.parse(Decrypt(res.data)).account_creation_data

        if (!JWT_Email_Validation({ token: jwt_token, comparable_data: account_creation_data })) {
            throw new Error("JWT Mis-Match Data")
        }  

        let cookie = await cookies()
        await cookie.set(cookieName, jwt_token, { httpOnly: true, path: "/" })

        await axios.post(`${USERS_CACHE_SERVER_ADDRESS}/set/user`, {
            token: jwt_token,
            id: Encrypt(`${account_creation_data.id}`),
            online_status: Encrypt(`${account_creation_data.online_status}`),
            custom_lbl: Encrypt(`${account_creation_data.custom_lbl}`),
            name: Encrypt(`${account_creation_data.name}`),
            created_on: Encrypt(`${account_creation_data.created_on}`),
            avatar_url_path: Encrypt(`${account_creation_data.avatar_url_path}`),
            avatar_title: Encrypt(`${account_creation_data.avatar_title}`),
            language_code: Encrypt(`${account_creation_data.language}`),
            region_code: Encrypt(`${account_creation_data.region}`),
            login_on: Encrypt(`${account_creation_data.login_on}`),
            logout_on: Encrypt(`${account_creation_data.logout_on}`),
            login_type: Encrypt(`EMAIL`),
            account_type: Encrypt(`${account_creation_data.account_type}`),
            email_address: Encrypt(`${account_creation_data.email_address}`)
        })
        return NextResponse.json({ success: account_creation_data }, { status: 200 })
    } catch (err: any) {
        return NextResponse.json({ error: err.message }, { status: 500 })
    }
}
