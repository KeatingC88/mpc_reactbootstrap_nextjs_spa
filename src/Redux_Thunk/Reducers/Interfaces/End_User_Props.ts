export interface End_User_Props {

    account: {
        id: BigInt | null,
        account_type: number
        login_type: string | null
        public_id: string | null
        roles: string[] | null
        email_address: string | null
        name: string | null
        online_status: number | string | null
        custom_lbl: string | null
        avatar_url_path: string | undefined | null
        avatar_title: string | null
        login_on: string | null
        logout_on: string | null
        created_on: string | null
        phone_country_code: number | null
        phone_carrier: string | null
        telephone: number | null
    }

    people: {
        friends: {
            sent_requests: [{
                participant_id: BigInt,
                request: boolean,
                block: boolean,
                approve: boolean,
                time_stamp: BigInt
            }] | null,
            blocked: [{

            }] | null,
            received_requests: [{
                participant_id: BigInt,
                request: boolean,
                block: boolean,
                approve: boolean,
                time_stamp: BigInt
            }],
            time_stamped: BigInt
        } | null
    } | null
    notification: {
        alert_color: string
        alert_text: string
    }

    discord: {
        id: string | null
    }

    twitch: {
        id: BigInt | null
        display_name: string | null
        login: string | null
        email_address: string | null
        profile_image_url: string | null,
        follower_count: BigInt | null,
        channel: {
            channel_id: BigInt | null,
            login: string | null,
            display_name: string | null,
            type: string | null,
            broadcaster_type: string | null,
            description: string | null,
            profile_image_url: string | null,
            offline_image_url: string | null,
            current_view_count: BigInt | null,
            created_at: string | null
        },
        stream: {
            id: BigInt | null,
            user_id: BigInt | null,
            game_id: BigInt |null,
            viewer_count: BigInt |null,
            started_at: string | null,
            user_login: string | null,
            user_name: string | null,
            game_name: string | null,
            type: string | null,
            title: string | null,
            language: string | null,
            thumbnail_url: string | null,
            tag_ids: [string] | null,
            tags: [string] | null,
            is_mature: boolean | null,
        },
        videos: {
            id: string | null
            stream_id: string | null
            user_id: string | null
            user_login: string | null
            user_name: string | null
            title: string | null
            description: string | null
            created_at: string | null
            published_at: string | null
            url: string | null
            thumbnail_url: string | null
            viewable: 'public' | 'private' | null
            view_count: number | null
            language: string | null
            type: 'archive' | 'highlight' | 'upload' | null
            duration: string | null
        },
        clips: {
            id: string | null
            url: string | null
            embed_url: string | null
            broadcaster_id: string | null
            creator_id: string | null
            video_id: string | null
            game_id: string | null
            language: string | null
            title: string | null
            view_count: number | null
            created_at: string | null // ISO date string
            thumbnail_url: string | null
        }
    }

    profile: {
        first_name: string | null
        last_name: string | null
        middle_name: string | null
        maiden_name: string | null
        gender: number
        birth_month: number
        birth_day: number
        birth_year: number
        ethnicity: string | null
        avatar_url_path: string | undefined | null
        avatar_title: string | null
    }

    custom_design: {
        card_header_font_color: string,
        card_body_font_color: string,
        card_footer_font_color: string,
        card_header_background_color: string,
        card_body_background_color: string,
        card_footer_background_color: string,
        card_header_font: string,
        card_body_font: string,
        card_footer_font: string,
        button_font_color: string,
        button_font: string,
        button_background_color: string,
        navigation_menu_font_color: string,
        navigation_menu_font: string,
        navigation_menu_background_color: string,
        card_border_color: string,
    }
}