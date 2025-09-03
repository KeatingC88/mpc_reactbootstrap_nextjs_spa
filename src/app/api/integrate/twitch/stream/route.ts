import { NextRequest, NextResponse } from "next/server"
import {
    APPLICATION_TWITCH_CLIENT_ID,
} from '@Constants'
import axios from "axios"

export const POST = async (req: NextRequest) => {

    try {
        let dto = await req.json()

        const response = await axios.get(`https://api.twitch.tv/helix/streams?user_id=${dto.twitch_id}`, {
            headers: {
                "Client-Id": APPLICATION_TWITCH_CLIENT_ID,
                "Authorization": `Bearer ${dto.app_token}`,
            },
        })

        if (response.data.data.length > 0) {
            return NextResponse.json(response.data.data[0], { status: 200 })
        } else {
            return NextResponse.json([], { status: 200 })
        }
    } catch (err: any) {
        console.error("Error fetching stream info:", err.response?.data || err.message)
    }
}