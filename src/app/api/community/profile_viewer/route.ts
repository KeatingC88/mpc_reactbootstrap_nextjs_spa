import { NextRequest, NextResponse } from "next/server"
import { cookies } from "next/headers"

import axios from "axios"
import { Decrypt } from '@AES/Decryptor'
import { Encrypt } from '@AES/Encryptor'

import {
    USERS_PROFILE_CACHE_SERVER_ADDRESS,
    USERS_CACHE_SERVER_ADDRESS,
    USERS_SERVER_COOKIE_NAME,
    USERS_TWITCH_CACHE_SERVER_ADDRESS
} from '@Constants'

export const POST = async (req: NextRequest) => {
    try {

        let obj: any = {}
        let token:string | null | undefined = null
        const cookie = await cookies()

        if (USERS_SERVER_COOKIE_NAME)
            token = cookie.get(USERS_SERVER_COOKIE_NAME)?.value

        if (token) {

            let dto = await req.json()

            let user_profile = await axios.post(`${USERS_PROFILE_CACHE_SERVER_ADDRESS}/get/user/profile`, {
                token: token,
                id: Encrypt(`${dto.id.toString()}`)
            }, {
                withCredentials: true
            })

            let user = await axios.post(`${USERS_CACHE_SERVER_ADDRESS}/get/user`, {
                token: token,
                id: Encrypt(`${dto.id}`)
            }, {
                withCredentials: true
            })

            let user_twitch = await axios.post(`${USERS_TWITCH_CACHE_SERVER_ADDRESS}/get/user`, {
                token: token,
                id: Encrypt(`${dto.id}`)
            }, {
                withCredentials: true
            })

            Object.assign(obj, JSON.parse(Decrypt(user_profile.data)))
            Object.assign(obj, JSON.parse(Decrypt(user.data)))

            obj.created_on = parseInt(obj.created_on)
            obj.gender = parseInt(obj.gender)
            obj.account_type = parseInt(obj.account_type)
            obj.login_on = parseInt(obj.login_on)
            obj.online_status = parseInt(obj.online_status)
            obj.id = parseInt(obj.id.toString())

            if (Object.keys(user_twitch).length > 0)
                Object.assign(obj, JSON.parse(Decrypt(user_twitch.data)))
                obj.twitch_id = parseInt(obj.twitch_id)
                obj.twitch_email_address = obj.twitch_email

            return NextResponse.json(obj, { status: 200 })
        }
    } catch (err: any) {
        return NextResponse.json({ error: err.message }, { status: 500 })
    }
}