import { NextRequest, NextResponse } from "next/server"
import { cookies } from "next/headers"
import axios from "axios"

import { Encrypt } from '@AES/Encryptor'

import {
    USERS_SERVER_ADDRESS,
    USERS_SERVER_COOKIE_NAME
} from '@Constants'

export const POST = async (req: NextRequest) => {
    try {
        const res = NextResponse.json({ success: true })
        let dto = await req.json()

        await axios.post(`${USERS_SERVER_ADDRESS}/Load/Session`, {
            id: Encrypt(`${dto.id}`),
            login_type: Encrypt(`${dto.login_type}`),
            account_type: Encrypt(`${dto.account_type}`),
            account_groups: Encrypt(`${dto.groups}`),
            account_roles: Encrypt(`${dto.roles}`),
            language: Encrypt(`${dto.language}`),
            region: Encrypt(`${dto.region}`),
            client_time: Encrypt(`${dto.client_time}`),
            location: Encrypt(`${dto.location}`),
            jwt_issuer_key: Encrypt(`${dto.jwt_issuer_key}`),
            jwt_client_key: Encrypt(`${dto.jwt_client_key}`),
            jwt_client_address: Encrypt(`${dto.jwt_client_address}`),
            user_agent: Encrypt(`${dto.user_agent}`),
            orientation: Encrypt(`${dto.orientation_type}`),
            screen_width: Encrypt(`${dto.screen_width}`),
            screen_height: Encrypt(`${dto.screen_height}`),
            color_depth: Encrypt(`${dto.color_depth}`),
            pixel_depth: Encrypt(`${dto.pixel_depth}`),
            window_width: Encrypt(`${dto.window_width}`),
            window_height: Encrypt(`${dto.window_height}`),
            connection_type: Encrypt(`${dto.effectiveType}`),
            down_link: Encrypt(`${dto.downlink}`),
            rtt: Encrypt(`${dto.rtt}`),
            data_saver: Encrypt(`${dto.saveData}`),
            device_ram_gb: Encrypt(`${dto.deviceMemory}`),
        }, { withCredentials: true }).catch((error) => {
            return NextResponse.json({ error: error.message }, { status: 500 })
        }).then((response: any) => {

            const setCookieHeader = response.headers['set-cookie']
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

            res.cookies.set({
                name: cookieName,
                value: jwt_token,
                httpOnly: true,
                path: "/"
            })

        })

        return res

    } catch (err: any) {
        return NextResponse.json({error: err.message}, { status: 500 })
    }
}