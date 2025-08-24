import { NextRequest, NextResponse } from "next/server"
import { cookies } from "next/headers"
import { redirect } from "next/navigation";

import axios from "axios"
import { Decrypt } from '@AES/Decryptor'
import { Encrypt } from '@AES/Encryptor'

import {
    USERS_PROFILE_CACHE_SERVER_ADDRESS,
    USERS_CACHE_SERVER_ADDRESS,
    USERS_SERVER_COOKIE_NAME,
} from '@Constants'

export const POST = async (req: NextRequest) => {
    try {
        let obj: any = {}
        let token = null
        const cookie = await cookies()

        if (USERS_SERVER_COOKIE_NAME)
            token = cookie.get(USERS_SERVER_COOKIE_NAME)?.value

        if (token) {
            let dto = await req.json()

            await axios.post(
                `${USERS_PROFILE_CACHE_SERVER_ADDRESS}/get/user/profile`,
                {
                    token: token,
                    id: Encrypt(`${dto.id}`)
                },
                { withCredentials: true }
            ).then(async (response: any) => {
                if (response.data) {
                    Object.keys(response.data).forEach((index: any) => {
                        const set_decrypted_string = Decrypt(`${response.data[index]}`)
                        const set_decrypted_number = parseInt(set_decrypted_string)

                        obj[index] = Number.isNaN(set_decrypted_number) ? set_decrypted_string : set_decrypted_number
                    })
                }
            }).then(async () => {
                await axios.post(`${USERS_CACHE_SERVER_ADDRESS}/get/user`,
                    {
                        token: token,
                        id: Encrypt(`${dto.id}`)
                    },
                    { withCredentials: true }
                ).then(async (response: any) => {
                    if (response.data) {
                        Object.keys(response.data).forEach((index: any) => {
                            const set_decrypted_string = Decrypt(`${response.data[index]}`)
                            const set_decrypted_number = parseInt(set_decrypted_string)

                            obj[index] = Number.isNaN(set_decrypted_number) ? set_decrypted_string : set_decrypted_number
                        })
                    }
                })
            })
            return NextResponse.json({ obj }, { status: 200 })
        }
        return NextResponse.json({ obj }, { status: 200 })
    } catch (err: any) {
        return NextResponse.json({ error: err.message }, { status: 500 })
    }
}