import { NextRequest, NextResponse } from "next/server"

import {
    APPLICATION_TWITCH_CLIENT_ID
} from '@Constants'
import axios from "axios"

export const POST = async (req: NextRequest) => {

    try {

        let dto = await req.json()

        const response = await axios.get(` https://api.twitch.tv/helix/users?login=${dto.twitch_login_id}`, {
            headers: {
                "Client-Id": APPLICATION_TWITCH_CLIENT_ID,
                "Authorization": `Bearer ${dto.app_token}`,
            },
        })

        const user = response.data.data[0]

        return NextResponse.json({
            twitch_channel_id: user.id,
            twitch_login: user.login,
            twitch_display_name: user.display_name,
            twitch_type: user.type,
            twitch_broadcaster_type: user.broadcaster_type,
            twitch_description: user.description,
            twitch_profile_image_url: user.profile_image_url,
            twitch_offline_image_url: user.offline_image_url,
            twitch_current_view_count: user.view_count,
            twitch_created_at: user.created_at
        }, { status: 200 })

    } catch (err: any) {
        console.error("Error fetching stream info:", err.response?.data || err.message)
    }
}