import { NextRequest, NextResponse } from "next/server"
import { cookies } from "next/headers"
import { redirect } from "next/navigation";

import axios from "axios"
import { Encrypt } from '@AES/Encryptor'

import {
    USERS_SERVER_ADDRESS,
    USERS_SERVER_COOKIE_NAME
} from '@Constants'

export const POST = async (req: NextRequest) => {
    try {
        let dto = await req.json()
        let token = null
        const cookie = await cookies()

        if (USERS_SERVER_COOKIE_NAME)
            token = cookie.get(USERS_SERVER_COOKIE_NAME)?.value

        if (!token)
            redirect("/Logout")

        await axios.post(`${USERS_SERVER_ADDRESS}/WebSocket/Approve_Invite`, {
            token: token,
            user: await Encrypt(`${dto.user}`),
            id: await Encrypt(`${dto.id}`),
            account_type: await Encrypt(`${dto.account_type}`),
            login_type: await Encrypt(`${dto.login_type}`),
            language: await Encrypt(`${dto.language}`),
            region: await Encrypt(`${dto.region}`),
            client_time: await Encrypt(`${dto.client_time}`),
            location: await Encrypt(`${dto.location}`),
            jwt_issuer_key: await Encrypt(`${dto.jwt_issuer_key}`),
            jwt_client_key: await Encrypt(`${dto.jwt_client_key}`),
            jwt_client_address: await Encrypt(`${dto.jwt_client_address}`),
            user_agent: await Encrypt(`${dto.user_agent}`),
            orientation: await Encrypt(`${dto.orientation}`),
            screen_width: await Encrypt(`${dto.screen_width}`),
            screen_height: await Encrypt(`${dto.screen_height}`),
            color_depth: await Encrypt(`${dto.color_depth}`),
            pixel_depth: await Encrypt(`${dto.pixel_depth}`),
            window_width: await Encrypt(`${dto.window_width}`),
            window_height: await Encrypt(`${dto.window_height}`),
            connection_type: await Encrypt(`${dto.connection_type}`),
            down_link: await Encrypt(`${dto.down_link}`),
            rtt: await Encrypt(`${dto.rtt}`),
            data_saver: await Encrypt(`${dto.data_saver}`),
            device_ram_gb: await Encrypt(`${dto.device_ram_gb}`),
        }, { withCredentials: true }
        ).catch((error) => {
            return NextResponse.json({ error: error.message }, { status: 500 })
        }).then(async (response: any) => {
            return NextResponse.json({ status: 200 })
        })
    } catch (err: any) {
        return NextResponse.json({ error: err.message }, { status: 500 })
    }
}