import { NextRequest, NextResponse } from "next/server"
import { cookies } from "next/headers"

import axios from "axios"
import { Encrypt } from '@AES/Encryptor'

import {
    USERS_SERVER_ADDRESS,
    USERS_SERVER_COOKIE_NAME
} from '@Constants'

export const PUT = async (req: NextRequest) => {
    try {
        let token = null
        const cookie = await cookies()

        if (USERS_SERVER_COOKIE_NAME)
            token = cookie.get(USERS_SERVER_COOKIE_NAME)?.value

        if (token) {
            let dto = await req.json()

            await axios.put(`${USERS_SERVER_ADDRESS}/Selected/Grid`, {
                grid: Encrypt(`${dto.grid}`),
                token: token,
                id: Encrypt(`${dto.id}`),
                account_type: Encrypt(`${dto.account_type}`),
                login_type: Encrypt(`${dto.login_type}`),
                language: Encrypt(`${dto.language}`),
                region: Encrypt(`${dto.region}`),
                client_time: Encrypt(`${dto.client_time}`),
                location: Encrypt(`${dto.location}`),
                jwt_issuer_key: Encrypt(`${dto.jwt_issuer_key}`),
                jwt_client_key: Encrypt(`${dto.jwt_client_key}`),
                jwt_client_address: Encrypt(`${dto.jwt_client_address}`),
                user_agent: Encrypt(`${dto.user_agent}`),
                orientation: Encrypt(`${dto.orientation}`),
                screen_width: Encrypt(`${dto.screen_width}`),
                screen_height: Encrypt(`${dto.screen_height}`),
                color_depth: Encrypt(`${dto.color_depth}`),
                pixel_depth: Encrypt(`${dto.pixel_depth}`),
                window_width: Encrypt(`${dto.window_width}`),
                window_height: Encrypt(`${dto.window_height}`),
                connection_type: Encrypt(`${dto.connection_type}`),
                down_link: Encrypt(`${dto.down_link}`),
                rtt: Encrypt(`${dto.rtt}`),
                data_saver: Encrypt(`${dto.data_saver}`),
                device_ram_gb: Encrypt(`${dto.device_ram_gb}`),
            }, { withCredentials: true }).catch((error) => {
                return NextResponse.json({ error: error.message }, { status: 500 })
            })
        }
        return NextResponse.json({ status: 200 })
    } catch (err: any) {
        return NextResponse.json({ error: err.message }, { status: 500 })
    }
}