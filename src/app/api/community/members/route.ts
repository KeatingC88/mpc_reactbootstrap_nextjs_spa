import { NextRequest, NextResponse } from "next/server"
import { cookies } from "next/headers"
import { redirect } from "next/navigation";

import axios from "axios"
import { Decrypt } from '@AES/Decryptor'

import {
    USERS_CACHE_SERVER_ADDRESS,
    USERS_SERVER_COOKIE_NAME,
} from '@Constants'

export const POST = async (req: NextRequest) => {
    try {
        let token = null
        const cookie = await cookies()

        if (USERS_SERVER_COOKIE_NAME)
            token = cookie.get(USERS_SERVER_COOKIE_NAME)?.value

        if (!token)
            redirect("/Logout")

        const decrypted_end_users_data: {
            [key: string]: {
                id: number,
                online_status: number,
                custom_lbl: string,
                name: string,
                created_on: number,
                avatar_url_path: string,
                avatar_title: string,
                language_code: string,
                region_code: string,
                login_on: number,
                logout_on: number,
                login_type: string,
                account_type: number
            }
        } = {}

        await axios.post(`${USERS_CACHE_SERVER_ADDRESS}/get/users`, {
            token: token
        }).then(async (response: any) => {

            for (const key in response.data) {

                let decrypted_end_user_data = []

                for (const encrypted_value of response.data[key]) {
                    decrypted_end_user_data.push(Decrypt(encrypted_value))
                }

                decrypted_end_users_data[key] = {
                    id: parseInt(decrypted_end_user_data[0]),
                    online_status: parseInt(decrypted_end_user_data[1]),
                    custom_lbl: decrypted_end_user_data[2],
                    name: decrypted_end_user_data[3],
                    created_on: parseInt(decrypted_end_user_data[4]),
                    avatar_url_path: decrypted_end_user_data[5],
                    avatar_title: decrypted_end_user_data[6],
                    language_code: decrypted_end_user_data[7],
                    region_code: decrypted_end_user_data[8],
                    login_on: parseInt(decrypted_end_user_data[9]),
                    logout_on: parseInt(decrypted_end_user_data[10]),
                    login_type: decrypted_end_user_data[11],
                    account_type: parseInt(decrypted_end_user_data[12]),
                }

            }

        })
        return NextResponse.json({ decrypted_end_users_data }, { status: 200 })
    } catch (err: any) {
        return NextResponse.json({ error: err.message }, { status: 500 })
    }
}