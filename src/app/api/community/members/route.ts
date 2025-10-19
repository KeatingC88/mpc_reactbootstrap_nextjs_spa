import { NextRequest, NextResponse } from "next/server"
import { cookies } from "next/headers"

import axios from "axios"

import {
    USERS_CACHE_SERVER_ADDRESS,
    USERS_SERVER_COOKIE_NAME,
    USERS_PROFILE_CACHE_SERVER_ADDRESS,
    USERS_SERVER_ADDRESS,
    USERS_TWITCH_CACHE_SERVER_ADDRESS

} from '@Constants'

import { Encrypt } from '@AES/Encryptor'
import { Decrypt } from "@AES/Decryptor"

export const POST = async (req: NextRequest) => {
    try {

        let token = null
        const cookie = await cookies()
        let dto = await req.json()

        if (USERS_SERVER_COOKIE_NAME)
            token = cookie.get(USERS_SERVER_COOKIE_NAME)?.value

        if (!token) 
            throw Error("Invalid Token")

        const { headers } = req
        const protocol = headers.get("x-forwarded-proto") || "http"
        const host = headers.get("host")
        const baseUrl = `${protocol}://${host}`

        let response_twitch_access_token = await axios.post(`${USERS_SERVER_ADDRESS}/Twitch/Access_Token`, {
            token: token,
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
        })

        let twitch_access_token = JSON.parse(Decrypt(response_twitch_access_token.data)).app_token
        
        const community_users_twitch_data: {
            [user_id: string]: {
                id: string,
                twitch_id: string,
                twitch_email: string,
                twitch_user_name: string,
                follower_count: string,
                stream_data: {}
            }
        } = {}

        await axios.post(`${USERS_TWITCH_CACHE_SERVER_ADDRESS}/get/users`, {
            token: token
        }).then(async (response: any) => {
            
            if (response.status !== 200)
                return {}

            if (!response.data)
                return {}

            response.data = Decrypt(response.data)

            if (response.data === "null")
                return {}

            response.data = JSON.parse(response.data)

            for (const community_user_id in response.data) {

                const userData: string = response.data[community_user_id]

                const mpc_user_id: string = userData[0]
                const twitch_user_id: string = userData[1]
                const twitch_user_email: string = userData[2].toUpperCase()
                const twitch_user_name: string = userData[3]

                const follower_count_response: any = await axios.post(`${baseUrl}/api/twitch/follower_count`, {
                    twitch_channel_id: twitch_user_id,
                    app_token: twitch_access_token
                })

                const stream_response: any = await axios.post(`${baseUrl}/api/twitch/stream`, {
                    twitch_channel_id: twitch_user_id,
                    app_token: twitch_access_token
                })

                community_users_twitch_data[community_user_id] = {
                    id: mpc_user_id,
                    twitch_id: twitch_user_id,
                    twitch_email: twitch_user_email,
                    twitch_user_name: twitch_user_name,
                    follower_count: follower_count_response.data,
                    stream_data: stream_response.data,
                }
            }

        })

        const community_users_profiles_data: {
            [user_id: string]: {
                id: string,
                birth_date: string,
                ethnicity: string,
                first_name: string,
                last_name: string,
                middle_name: string,
                maiden_name: string,
                gender: string,
            }
        } = {}

        await axios.post(`${USERS_PROFILE_CACHE_SERVER_ADDRESS}/get/users/profiles`, {
            token: token
        }).then( async (response: any) => {

            if (!response.data)
                return {}

            response.data = JSON.parse(Decrypt(`${response.data}`))

            if (response.data === "null")
                return {}

            for (const community_user_id in response.data) {

                community_users_profiles_data[community_user_id] = {
                    id: response.data[community_user_id][0],
                    birth_date: response.data[community_user_id][1],
                    ethnicity: response.data[community_user_id][2],
                    first_name: response.data[community_user_id][3],
                    last_name: response.data[community_user_id][4],
                    middle_name: response.data[community_user_id][5],
                    maiden_name: response.data[community_user_id][6],
                    gender: response.data[community_user_id][7],
                }

            }
        })

        const community_users_data: {
            [user_id: string]: {
                id: string,
                online_status: number,
                custom_lbl: string,
                name: string,
                created_on: string,
                avatar_url_path: string,
                avatar_title: string,
                language_code: string,
                region_code: string,
                login_on: string,
                logout_on: string,
                login_type: string,
                account_type: string,
                email_address: string
            }
        } = {}

        await axios.post(`${USERS_CACHE_SERVER_ADDRESS}/get/users`, {
            token: token
        }).then( async (response: any) => {

            if (!response.data)
                return {}

            response.data = JSON.parse(Decrypt(response.data))

            for (const community_user_id in response.data) {

                let mpc_user_id = response.data[community_user_id][0]
                let mpc_user_online_status = response.data[community_user_id][1]
                let mpc_user_custom_status_label = response.data[community_user_id][2]
                let mpc_user_name = response.data[community_user_id][3]
                let mpc_user_created_on = response.data[community_user_id][4]
                let mpc_user_avatar_url_path = response.data[community_user_id][5]
                let mpc_user_avatar_title = response.data[community_user_id][6]
                let mpc_user_language_code = response.data[community_user_id][7]
                let mpc_user_region_code = response.data[community_user_id][8]
                let mpc_user_login_on = response.data[community_user_id][9]
                let mpc_user_logout_on = response.data[community_user_id][10]
                let mpc_user_login_type = response.data[community_user_id][11]
                let mpc_user_account_type = response.data[community_user_id][12]
                let mpc_user_email_address = response.data[community_user_id][13]

                community_users_data[community_user_id] = {
                    id: mpc_user_id,
                    online_status: mpc_user_online_status,
                    custom_lbl: mpc_user_custom_status_label,
                    name: mpc_user_name,
                    created_on: mpc_user_created_on,
                    avatar_url_path: mpc_user_avatar_url_path,
                    avatar_title: mpc_user_avatar_title,
                    language_code: mpc_user_language_code,
                    region_code: mpc_user_region_code,
                    login_on: mpc_user_login_on,
                    logout_on: mpc_user_logout_on,
                    login_type: mpc_user_login_type,
                    account_type: mpc_user_account_type,
                    email_address: mpc_user_email_address.toUpperCase()
                }

            }

        })

        let community_users_data_combined = {
            users_data: community_users_data,
            users_profile_data: community_users_profiles_data,
            users_twitch_data: community_users_twitch_data
        }

        return NextResponse.json(community_users_data_combined, { status: 200 })
    } catch (err: any) {
        return NextResponse.json({ error: err.message }, { status: 500 })
    }
}