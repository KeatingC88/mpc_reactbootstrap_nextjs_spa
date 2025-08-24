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

            await axios.post(`${USERS_CACHE_SERVER_ADDRESS}/set/user`, {
                token: token,
                id: Encrypt(`${dto.id}`),
                online_status: Encrypt(`${dto.online_status}`),
                custom_lbl: Encrypt(`${dto.custom_lbl}`),
                name: Encrypt(`${dto.name}`),
                created_on: Encrypt(`${dto.created_on}`),
                avatar_url_path: Encrypt(`${dto.avatar_url_path}`),
                avatar_title: Encrypt(`${dto.avatar_title}`),
                language_code: Encrypt(`${dto.language}`),
                region_code: Encrypt(`${dto.region}`),
                login_on: Encrypt(`${dto.login_on}`),
                logout_on: Encrypt(`${dto.logout_on}`),
                login_type: Encrypt(`EMAIL`),
                account_type: Encrypt(`${dto.account_type}`),
                email_address: Encrypt(`${dto.email_address}`),
            })

            await axios.put(`${USERS_SERVER_ADDRESS}/Account/Logout`, {
                token: token,
                id: await Encrypt(`${dto.id}`),
                online_status: await Encrypt(`${dto.online_status}`),
                theme: await Encrypt(`${dto.theme}`),
                alignment: await Encrypt(`${dto.alignment}`),
                text_alignment: await Encrypt(`${dto.text_alignment}`),
                grid_type: await Encrypt(`${dto.grid_type}`),
                locked: await Encrypt(`${dto.nav_lock}`),
                language: await Encrypt(`${dto.language}`),
                region: await Encrypt(`${dto.region}`),
                client_time: await Encrypt(`${dto.client_time}`),
                location: await Encrypt(`${dto.location}`),
                jwt_issuer_key: await Encrypt(`${dto.jwt_issuer_key}`),
                jwt_client_key: await Encrypt(`${dto.jwt_client_key}`),
                jwt_client_address: await Encrypt(`${dto.jwt_client_address}`),
                user_agent: await Encrypt(`${dto.user_agent}`),
                orientation: await Encrypt(`${dto.orientation_type}`),
                screen_width: await Encrypt(`${dto.screen_width}`),
                screen_height: await Encrypt(`${dto.screen_height}`),
                color_depth: await Encrypt(`${dto.color_depth}`),
                pixel_depth: await Encrypt(`${dto.pixel_depth}`),
                window_width: await Encrypt(`${dto.window_width}`),
                window_height: await Encrypt(`${dto.window_height}`),
                connection_type: await Encrypt(`${dto.effectiveType}`),
                down_link: await Encrypt(`${dto.downlink}`),
                rtt: await Encrypt(`${dto.rtt}`),
                data_saver: await Encrypt(`${dto.saveData}`),
                device_ram_gb: await Encrypt(`${dto.deviceMemory}`),
            }).catch((error) => {
                return NextResponse.json({ error: error.message }, { status: 500 })
            })

            cookie.set({
                name: `${USERS_SERVER_COOKIE_NAME}`,
                value: "",
                expires: new Date(0),
                path: "/"
            })

            return NextResponse.json({ status: 200 })
        }
        return NextResponse.json({ status: 200 })
    } catch (err: any) {
        return NextResponse.json({error: err.message}, { status: 200 })
    }
}