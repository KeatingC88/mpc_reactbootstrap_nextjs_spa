import { NextRequest, NextResponse } from "next/server"
import { cookies } from "next/headers"

import {
    USERS_SERVER_ADDRESS,
    USERS_SERVER_COOKIE_NAME,
    USERS_TWITCH_CACHE_SERVER_ADDRESS
} from '@Constants'

import axios from "axios"

import { Encrypt } from '@AES/Encryptor'
import { Decrypt } from '@AES/Decryptor'

export const POST = async (req: NextRequest) => {

    const dto = await req.json()
    let token: string | null | undefined = null
    const cookie = await cookies()
    let twitch_data: any = null
    let twitch_data_combined: any = null
    let end_user_id: any = null

    if (USERS_SERVER_COOKIE_NAME)
        token = cookie.get(USERS_SERVER_COOKIE_NAME)?.value

    if (token) {

        await axios.post(`${USERS_SERVER_ADDRESS}/Twitch/Integrate`, {
            token: token,
            code: dto.code,
            login_type: Encrypt(`${dto.login_type}`),
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

                let response_data = JSON.parse(Decrypt(response.data))

                twitch_data = response_data.twitch_data
                end_user_id = response_data.end_user_id

                let app_token: string = JSON.parse(Decrypt(response.data)).app_token

                let user_channel: any = await axios.post(`${baseUrl}/api/twitch/channel_id`, {
                    twitch_login_id: twitch_data.login,
                    app_token: app_token
                })

                let follower_count_response: any = await axios.post(`${baseUrl}/api/twitch/follower_count`, {
                    twitch_channel_id: twitch_data.id,
                    app_token: app_token
                })

                let stream_response: any = await axios.post(`${baseUrl}/api/twitch/stream`, {
                    twitch_channel_id: twitch_data.id,
                    app_token: app_token
                })

                await axios.post(`${USERS_TWITCH_CACHE_SERVER_ADDRESS}/set/user`, {
                    token: token,
                    id: Encrypt(`${end_user_id}`),
                    twitch_id: Encrypt(`${twitch_data.id}`),
                    twitch_email: Encrypt(`${twitch_data.email}`)
                })

                twitch_data_combined = {
                    user: twitch_data,
                    channel: user_channel.data,
                    follower_count: follower_count_response.data,
                    stream: stream_response.data,
                }

                if (twitch_data_combined) {
                    return NextResponse.json({
                        twitch_data: twitch_data_combined
                    }, { status: 200 })
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