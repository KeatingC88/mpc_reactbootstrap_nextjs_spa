import { NextRequest, NextResponse } from "next/server"
import axios from "axios"


import { Encrypt } from '@AES/Encryptor'
import { Decrypt } from '@AES/Decryptor'

import {
    USERS_SERVER_ADDRESS,
    USERS_SERVER_COOKIE_NAME,
    USERS_PROFILE_CACHE_SERVER_ADDRESS,
    USERS_CACHE_SERVER_ADDRESS
} from '@Constants'

import { Validating_Claims } from '@JWT/Validating_Claims'
import { Securing_Cookie } from '@JWT/Securing_Cookie'

export const POST = async (req: NextRequest) => {
    try {
        const dto = await req.json()
        let token = null

        let response: any = await axios.post(`${USERS_SERVER_ADDRESS}/Email/Submit`, {
            email_address: Encrypt(`${dto.email_address}`),
            name: Encrypt(`${dto.name}`),
            password: Encrypt(`${dto.password}`),
            code: `${dto.code}`,
            theme: Encrypt(`${dto.theme}`),
            alignment: Encrypt(`${dto.alignment}`),
            nav_lock: Encrypt(`${dto.nav_lock}`),
            text_alignment: Encrypt(`${dto.text_alignment}`),
            grid_type: Encrypt(`${dto.grid_type}`),
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
            device_ram_gb: Encrypt(`${dto.device_ram_gb}`)
        }, {
            withCredentials: true
        })

        response.data = JSON.parse(Decrypt(response.data)).account_creation_data
        Validating_Claims({ token: await Securing_Cookie(response.headers['set-cookie']), comparable_data: response.data })
        token = response.headers["set-cookie"][0].split(`${USERS_SERVER_COOKIE_NAME}=`)[1].split(`;`)[0]

        let birth_month = parseInt(response.data.birth_month)
        let birth_day = parseInt(response.data.birth_day)
        let birth_year = parseInt(response.data.birth_year)

        await axios.post(`${USERS_CACHE_SERVER_ADDRESS}/set/user`, {
            token: token,
            id: Encrypt(`${response.data.id}`),
            online_status: Encrypt(`${response.data.online_status}`),
            custom_lbl: Encrypt(`${response.data.custom_lbl}`),
            name: Encrypt(`${response.data.name}`),
            created_on: Encrypt(`${response.data.created_on}`),
            avatar_url_path: Encrypt(`${response.data.avatar_url_path}`),
            avatar_title: Encrypt(`${response.data.avatar_title}`),
            language_code: Encrypt(`${response.data.language}`),
            region_code: Encrypt(`${response.data.region}`),
            login_on: Encrypt(`${response.data.login_on}`),
            logout_on: Encrypt(`${response.data.logout_on}`),
            login_type: Encrypt(`EMAIL`),
            account_type: Encrypt(`${response.data.account_type}`),
            email_address: Encrypt(`${response.data.email_address}`)
        })

        await axios.post(`${USERS_PROFILE_CACHE_SERVER_ADDRESS}/set/user/profile`, {
            token: token,
            id: Encrypt(`${response.data.id}`),
            birth_date: Encrypt(`${birth_month}/${birth_day}/${birth_year}`),
            ethnicity: Encrypt(`${response.data.ethnicity}`),
            first_name: Encrypt(`${response.data.first_name}`),
            last_name: Encrypt(`${response.data.last_name}`),
            middle_name: Encrypt(`${response.data.middle_name}`),
            maiden_name: Encrypt(`${response.data.maiden_name}`),
            gender: Encrypt(`${response.data.gender}`)
        })

        return NextResponse.json(response.data)
    } catch (error: any) {
        return NextResponse.json({
            error: error,
            status: 500
        })
    }
}