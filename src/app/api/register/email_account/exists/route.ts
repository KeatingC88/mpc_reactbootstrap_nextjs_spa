import { NextRequest, NextResponse } from "next/server"
import axios from "axios"

import { Encrypt } from '@AES/Encryptor'
import { USERS_SERVER_ADDRESS } from '@Constants'

export const POST = async (req: NextRequest) => {
    try {
        const dto = await req.json()

        let response: boolean = await axios.post(`${USERS_SERVER_ADDRESS}/Email/Exists`, {
            email_address: Encrypt(`${dto.email_address}`),
            account_type: Encrypt(`${dto.account_type}`),
            login_type: Encrypt(`${dto.login_type}`),
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
        })

        return NextResponse.json(response)
    } catch (error: any) {
        return NextResponse.json({
            error: error,
            status: 500
        })
    }
}