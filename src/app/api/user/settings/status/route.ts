import { NextRequest, NextResponse } from "next/server"
import { cookies } from "next/headers"

import axios from "axios"
import { Encrypt } from '@AES/Encryptor'

import {
    USERS_SERVER_ADDRESS,
    USERS_SERVER_COOKIE_NAME,
    USERS_CACHE_SERVER_ADDRESS
} from '@Constants'

export const PUT = async (req: NextRequest) => {
    try {
        let token = null
        const cookie = await cookies()

        if (USERS_SERVER_COOKIE_NAME)
            token = cookie.get(USERS_SERVER_COOKIE_NAME)?.value

        if (token) {
            let dto = await req.json()

            await axios.put(`${USERS_SERVER_ADDRESS}/Selected/Status`, {
                online_status: `${dto.online_status}`,
                token: token,
                id: `${dto.id}`,
                account_type: `${dto.account_type}`,
                login_type: `${dto.login_type}`,
                language: `${dto.language}`,
                region: `${dto.region}`,
                client_time: `${dto.client_time}`,
                location: `${dto.location}`,
                jwt_issuer_key: `${dto.jwt_issuer_key}`,
                jwt_client_key: `${dto.jwt_client_key}`,
                jwt_client_address: `${dto.jwt_client_address}`,
                user_agent: `${dto.user_agent}`,
                orientation: `${dto.orientation}`,
                screen_width: `${dto.screen_width}`,
                screen_height: `${dto.screen_height}`,
                color_depth: `${dto.color_depth}`,
                pixel_depth: `${dto.pixel_depth}`,
                window_width: `${dto.window_width}`,
                window_height: `${dto.window_height}`,
                connection_type: `${dto.connection_type}`,
                down_link: `${dto.down_link}`,
                rtt: `${dto.rtt}`,
                data_saver: `${dto.data_saver}`,
                device_ram_gb: `${dto.device_ram_gb}`,
            }, { withCredentials: true }).catch((error) => {
                return NextResponse.json({ error: error.message }, { status: 500 })
            }).then(async () => {

                await axios.post(`${USERS_CACHE_SERVER_ADDRESS}/set/user`, {
                    token: token,
                    custom_lbl: Encrypt(`${dto.custom_lbl}`),
                    name: Encrypt(`${dto.name}`),
                    created_on: Encrypt(`${dto.created_on}`),
                    avatar_url_path: Encrypt(`${dto.avatar_url_path}`),
                    avatar_title: Encrypt(`${dto.avatar_title}`),
                    login_on: Encrypt(`${dto.login_on}`),
                    logout_on: Encrypt(`${dto.logout_on}`),
                    online_status: Encrypt(`${dto.online_status}`),
                    id: Encrypt(`${dto.id}`),
                    account_type: Encrypt(`${dto.account_type}`),
                    login_type: Encrypt(`${dto.login_type}`),
                    language_code: Encrypt(`${dto.language}`),
                    region_code: Encrypt(`${dto.region}`),
                    email_address: Encrypt(`${dto.email_address ? dto.email_address : ``}`)
                })

            })
        }
        return NextResponse.json({ status: 200 })
    } catch (err: any) {
        return NextResponse.json({ error: err.message }, { status: 500 })
    }
}