import { NextRequest, NextResponse } from "next/server"
import axios from "axios"

import { Encrypt } from '@AES/Encryptor'
import { MAIL_SERVER_ADDRESS } from '@Constants'

export const POST = async (req: NextRequest) => {
    try {
        const dto = await req.json()

        let response = await axios.post(`${MAIL_SERVER_ADDRESS}/api/Send/Webmaster/Notification/Conflict/Client`, {
            email_address: Encrypt(`${dto.email_address}`),
            language: Encrypt(`${dto.language}`),
            region: Encrypt(`${dto.region}`),
            local_time: Encrypt(`${dto.local_time}`),
            date: Encrypt(`${dto.date}`),
            location: Encrypt(`${dto.location}`),
            user_agent: Encrypt(`${dto.user_agent}`)
        })

        return NextResponse.json({ status: response.status })
    } catch (error: any) {
        return NextResponse.json({
            error: error,
            status: 500
        })
    }
}