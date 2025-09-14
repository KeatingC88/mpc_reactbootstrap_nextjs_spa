import { NextRequest, NextResponse } from "next/server"
import {
    APPLICATION_TWITCH_CLIENT_ID,
} from '@Constants'
import axios from "axios"

export const POST = async (req: NextRequest) => {

    try {

        let dto = await req.json()
        const response = await axios.get(`https://api.twitch.tv/helix/channels/followers?broadcaster_id=${dto.twitch_channel_id}`, {
            headers: {
                "Client-Id": APPLICATION_TWITCH_CLIENT_ID,
                "Authorization": `Bearer ${dto.app_token}`,
            },
        })
        
        return NextResponse.json(response.data.total ?? 0, { status: 200 })
    } catch (err: any) {
        console.error("Error fetching stream info:", err.message)
    }
}