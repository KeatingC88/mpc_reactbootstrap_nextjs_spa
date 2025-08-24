import { NextRequest, NextResponse } from "next/server"
import { cookies } from "next/headers"

import {
    USERS_SERVER_ADDRESS,
    USERS_SERVER_COOKIE_NAME,
    USERS_CACHE_SERVER_ADDRESS
} from '@Constants'

import axios from "axios"

import { Encrypt } from '@AES/Encryptor'
import { Decrypt } from '@AES/Decryptor'

import { JWT_Email_Validation } from '@JWT/Decoder'

let iteration = 0

export const POST = async (req: NextRequest) => {
    
    const dto = await req.json()
    let token = null
    let twitch_data: any = null
    let mpc_data: any = null

    await axios.post(`${USERS_SERVER_ADDRESS}/Twitch/Login`, {
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
        },
        withCredentials: true
    }).catch((error) => {

        return NextResponse.json({ error: error.message }, { status: 500 })

    }).then( async (response: any) => {
        iteration++
        if (iteration === 2) {

            token = response.headers['set-cookie'][0].split(`;`)[0].split(`${USERS_SERVER_COOKIE_NAME}=`)[1]
            twitch_data = JSON.parse(Decrypt(response.data)).twitch_data
            mpc_data = JSON.parse(Decrypt(response.data)).mpc_data

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

            token = response.headers["set-cookie"][0].split(`${USERS_SERVER_COOKIE_NAME}=`)[1].split(`;`)[0]

            let jwt_token = jwtMatch[1].split(`;`)[0]

            if (!JWT_Email_Validation({ token: jwt_token, comparable_data: mpc_data })) {
                throw new Error("JWT Mis-Match Data")
            }

            axios.post(`${USERS_CACHE_SERVER_ADDRESS}/set/user`, {
                token: token,
                id: Encrypt(`${mpc_data.id}`),
                online_status: Encrypt(`${mpc_data.online_status}`),
                custom_lbl: mpc_data.custom_lbl ? Encrypt(`${mpc_data.custom_lbl}`) : Encrypt(``),
                name: Encrypt(`${twitch_data.display_name}${mpc_data.name}`),
                created_on: Encrypt(`${mpc_data.created_on}`),
                avatar_url_path: twitch_data.profile_image_url ? Encrypt(`${twitch_data.profile_image_url}`) : Encrypt(``),
                avatar_title: mpc_data.avatar_title ? Encrypt(`${mpc_data.avatar_title}`) : Encrypt(``),
                language_code: Encrypt(`${mpc_data.language}`),
                region_code: Encrypt(`${mpc_data.region}`),
                login_on: mpc_data.login_on ? Encrypt(`${mpc_data.login_on}`) : Encrypt(``),
                logout_on: mpc_data.logout_on ? Encrypt(`${mpc_data.logout_on}`) : Encrypt(``),
                login_type: Encrypt(`TWITCH`),
                account_type: Encrypt(`${mpc_data.account_type}`),
                email_address: twitch_data.email === mpc_data.email_address ? Encrypt(`${twitch_data.email}`) : Encrypt(``)
            })

            let cookie = await cookies()
            cookie.set(cookieName, jwt_token, { httpOnly: true, path: "/" })

        }
    })

    if (twitch_data && mpc_data) {
        return NextResponse.json({ twitch_data: twitch_data, mpc_data: mpc_data }, { status: 200 })
    }
}