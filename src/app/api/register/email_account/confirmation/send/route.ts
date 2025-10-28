import { NextRequest, NextResponse } from "next/server"
import axios from "axios"

import { Encrypt } from '@AES/Encryptor'
import { MAIL_SERVER_ADDRESS } from '@Constants'

export const POST = async (req: NextRequest) => {
    try {
        const dto = await req.json()

        let response = await axios.post(`${MAIL_SERVER_ADDRESS}/Send/Confirmation/Email`, {
            email_address: Encrypt(`${dto.email_address}`),
            language: Encrypt(`${dto.language}`),
            region: Encrypt(`${dto.region}`)
        })

        return NextResponse.json({ code: response.data.code })
    } catch (error: any) {
        return NextResponse.json({
            error: error,
            status: 500
        })
    }
}