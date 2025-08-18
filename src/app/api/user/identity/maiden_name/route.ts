import { NextRequest, NextResponse } from "next/server"
import { cookies } from "next/headers"
import { redirect } from "next/navigation";

import axios from "axios"
import { Encrypt } from '@AES/Encryptor'

import {
    USERS_SERVER_ADDRESS,
    USERS_SERVER_COOKIE_NAME,
    USERS_PROFILE_CACHE_SERVER_ADDRESS
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

        await axios.post(`${USERS_SERVER_ADDRESS}/Identity/MaidenName`, {
            maiden_name: Encrypt(`${dto.maiden_name}`),
            token: token,
            id: Encrypt(`${dto.id}`),
            account_type: Encrypt(`${dto.account_type}`),
            login_type: Encrypt(`${dto.login_type}`),
            language: Encrypt(`${dto.current_language.split(`-`)[0]}`),
            region: Encrypt(`${dto.current_language.split(`-`)[1]}`),
            client_time: Encrypt(`${new Date().getTime() + (new Date().getTimezoneOffset() * 60000)}`),
            location: Encrypt(`${Intl.DateTimeFormat().resolvedOptions().timeZone}`),
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
        }, {withCredentials:true}).catch((error) => {
            return NextResponse.json({ error: error.message }, { status: 500 })
        }).then(async () => {

            await axios.post(`${USERS_PROFILE_CACHE_SERVER_ADDRESS}/set/user/profile`, {
                token: token,
                id: Encrypt(`${dto.id}`),
                birth_date: Encrypt(`${dto.birth_date}`),
                ethnicity: Encrypt(`${dto.ethnicity}`),
                first_name: Encrypt(`${dto.first_name}`),
                last_name: Encrypt(`${dto.last_name}`),
                middle_name: Encrypt(`${dto.middle_name}`),
                maiden_name: Encrypt(`${dto.maiden_name}`),
                gender: Encrypt(`${dto.gender}`)
            })

        })

        return NextResponse.json({ status: 200 })
    } catch (err: any) {
        return NextResponse.json({ error: err.message }, { status: 500 })
    }
}