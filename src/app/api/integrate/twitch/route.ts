import { NextRequest, NextResponse } from "next/server"
import { cookies } from "next/headers"

import {
    USERS_SERVER_ADDRESS,
    USERS_SERVER_COOKIE_NAME
} from '@Constants'

import axios from "axios"

import { Encrypt } from '@AES/Encryptor'
import { Decrypt } from '@AES/Decryptor'

export const POST = async (req: NextRequest) => {

    const dto = await req.json()
    let token = null
    const cookie = await cookies()
    let twitch_data: any = null
    let twitch_data_combined: any = null

    if (USERS_SERVER_COOKIE_NAME)
        token = cookie.get(USERS_SERVER_COOKIE_NAME)?.value

    if (token) {
        await axios.post(`${USERS_SERVER_ADDRESS}/Twitch/Integrate`, {
            token: token,
            code: dto.code,
            language: Encrypt(`${dto.language}`),
            region: Encrypt(`${dto.region}`),
            client_time: Encrypt(`${dto.client_time}`),
            location: Encrypt(`${dto.location}`),
            theme: Encrypt(`${dto.theme}`),
            alignment: Encrypt(`${dto.alignment}`),
            nav_lock: Encrypt(`${dto.nav_lock}`),
            text_alignment: Encrypt(`${dto.text_alignment}`),
            grid_type: Encrypt(`${dto.grid_type}`),
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
            connection_type: Encrypt(`${dto.connection_type}`),
            down_link: Encrypt(`${dto.down_link}`),
            rtt: Encrypt(`${dto.rtt}`),
            data_saver: Encrypt(`${dto.data_saver}`),
            device_ram_gb: Encrypt(`${dto.device_ram_gb}`),
        }, {
            headers: {
                'Content-Type': 'application/json'
            }
        }).catch((error) => {

            return NextResponse.json({ error: error.message }, { status: 500 })

        }).then(async (response: any) => {
            if (response.data) {

                const { headers } = req
                const protocol = headers.get("x-forwarded-proto") || "http"
                const host = headers.get("host")
                const baseUrl = `${protocol}://${host}`

                twitch_data = JSON.parse(Decrypt(response.data)).twitch_data
                let app_token: string = JSON.parse(Decrypt(response.data)).app_token

                let user_channel: any = await axios.post(`${baseUrl}/api/authentication/login/twitch_account/channel_id`, {
                    twitch_login: twitch_data.login,
                    app_token: app_token
                })

                let follower_count_response: any = await axios.post(`${baseUrl}/api/authentication/login/twitch_account/follower_count`, {
                    twitch_channel_id: twitch_data.id,
                    app_token: app_token
                })

                let stream_response: any = await axios.post(`${baseUrl}/api/authentication/login/twitch_account/stream`, {
                    twitch_channel_id: twitch_data.id,
                    app_token: app_token
                })

                twitch_data_combined = {
                    user: twitch_data,
                    channel: user_channel.data,
                    follower_count: follower_count_response.data,
                    stream: stream_response.data,
                }
            }
        })

        if (twitch_data_combined) {
            return NextResponse.json({
                twitch_data: twitch_data_combined
            }, { status: 200 })
        }
    }
}