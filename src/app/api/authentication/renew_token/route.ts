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

            cookie.set({
                name: `${USERS_SERVER_COOKIE_NAME}`,
                value: "",
                expires: new Date(0),
                path: "/"
            })

            await axios.put(`${USERS_SERVER_ADDRESS}/Load/Renewal/Session/Token`, {
                token: token,
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
        }

        return NextResponse.json({ status: 200 })
    } catch (err: any) {
        return NextResponse.json({error: err.message}, { status: 200 })
    }
}