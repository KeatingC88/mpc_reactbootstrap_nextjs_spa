import { NextRequest, NextResponse } from "next/server"
import { cookies } from "next/headers"
import { redirect } from "next/navigation";

import axios from "axios"
import { Encrypt } from '@AES/Encryptor'
import { Decrypt } from '@AES/Decryptor'

import {
    USERS_SERVER_ADDRESS,
    USERS_SERVER_COOKIE_NAME,
    USERS_PROFILE_CACHE_SERVER_ADDRESS,
    USERS_CACHE_SERVER_ADDRESS
} from '@Constants'

export const PUT = async (req: NextRequest) => {
    try {
        const dto = await req.json()
        let token = null
        const cookie = await cookies()

        if (USERS_SERVER_COOKIE_NAME)
            token = cookie.get(USERS_SERVER_COOKIE_NAME)?.value

        if (!token)
            redirect("/Logout")

        axios.put(`${USERS_SERVER_ADDRESS}/Email/Login`, {
            email_address: Encrypt(`${dto.email_address}`),
            password: Encrypt(`${dto.password}`),
            theme: Encrypt(`${dto.theme}`),
            alignment: Encrypt(`${dto.alignment}`),
            text_alignment: Encrypt(`${dto.text_alignment}`),
            grid_type: Encrypt(`${dto.grid_type}`),
            locked: Encrypt(`${dto.locked}`),
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
        }).catch((error) => {
            return NextResponse.json({ error: error.message }, { status: 500 })
        }).then(async (response: any) => {

            let response_data = JSON.parse(JSON.parse(Decrypt(response.data)).mpc_data)

            await axios.post(`${USERS_CACHE_SERVER_ADDRESS}/set/user`, {
                token: token,
                id: Encrypt(`${response_data.id}`),
                online_status: Encrypt(`${response_data.online_status}`),
                custom_lbl: Encrypt(`${response_data.custom_lbl}`),
                name: Encrypt(`${response_data.name}`),
                created_on: Encrypt(`${response_data.created_on}`),
                avatar_url_path: Encrypt(`${response_data.avatar_url_path}`),
                avatar_title: Encrypt(`${response_data.avatar_title}`),
                language_code: Encrypt(`${response_data.language}`),
                region_code: Encrypt(`${response_data.region}`),
                login_on: Encrypt(`${response_data.login_on}`),
                logout_on: Encrypt(`${response_data.logout_on}`),
                login_type: Encrypt(`EMAIL`),
                account_type: Encrypt(`${response_data.account_type}`),
                email_address: Encrypt(`${response_data.email_address}`)
            })

            let birth_month = parseInt(response_data.birth_month)
            let birth_day = parseInt(response_data.birth_day)
            let birth_year = parseInt(response_data.birth_year)

            await axios.post(`${USERS_PROFILE_CACHE_SERVER_ADDRESS}/set/user/profile`, {
                token: token,
                id: Encrypt(`${response_data.id}`),
                birth_date: Encrypt(`${birth_month}/${birth_day}/${birth_year}`),
                ethnicity: Encrypt(`${response_data.ethnicity}`),
                first_name: Encrypt(`${response_data.first_name}`),
                last_name: Encrypt(`${response_data.last_name}`),
                middle_name: Encrypt(`${response_data.middle_name}`),
                maiden_name: Encrypt(`${response_data.maiden_name}`),
                gender: Encrypt(`${response_data.gender}`)
            })

            return await new Promise(() => {
                return NextResponse.json({ mpc_data: response_data }, { status: 200 })
            })
        })
    } catch (err: any) {
        return NextResponse.json({ error: err.message }, { status: 500 })
    }
}