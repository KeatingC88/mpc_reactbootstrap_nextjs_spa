import {
    UPDATE_END_USER_TWITCH_CHANNEL_STATE,
    NULL_END_USER_TWITCH_CHANNEL_STATE,
} from '@Constants'

interface end_user_twitch_channel_state {
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
}

interface end_user_twitch_channel_action {
    type: string
    payload?: Partial<end_user_twitch_channel_state>
}

const initial_state: end_user_twitch_channel_state = {
    channel_id: null,
    login: null,
    display_name: null,
    type: null,
    broadcaster_type: null,
    description: null,
    profile_image_url: null,
    offline_image_url: null,
    current_view_count: null,
    created_at: null
}

const End_User_Twitch_Channel_State_Reducer = (
    state: end_user_twitch_channel_state = initial_state,
    action: end_user_twitch_channel_action
): end_user_twitch_channel_state => {
    if (action.type.includes('END_USER_TWITCH_CHANNEL')) {
        switch (action.type) {
            case UPDATE_END_USER_TWITCH_CHANNEL_STATE:
                return {
                    channel_id: action.payload?.channel_id ?? state.channel_id,
                    login: action.payload?.login ?? state.login,
                    display_name: action.payload?.display_name ?? state.display_name,
                    type: action.payload?.type ?? state.type,
                    broadcaster_type: action.payload?.broadcaster_type ?? state.broadcaster_type,
                    description: action.payload?.description ?? state.description,
                    profile_image_url: action.payload?.profile_image_url ?? state.profile_image_url,
                    offline_image_url: action.payload?.offline_image_url ?? state.offline_image_url,
                    current_view_count: action.payload?.current_view_count ?? state.current_view_count,
                    created_at: action.payload?.created_at ?? state.created_at
                }
            case NULL_END_USER_TWITCH_CHANNEL_STATE:
                return {
                    ...initial_state
                }
            default:
                break
        }
    }

    return {
        channel_id: state.channel_id ?? initial_state.channel_id,
        login: state.login ?? initial_state.login,
        display_name: state.display_name ?? initial_state.display_name,
        type: state.type ?? initial_state.type,
        broadcaster_type: state.broadcaster_type ?? initial_state.broadcaster_type,
        description: state.description ?? initial_state.description,
        profile_image_url: state.profile_image_url ?? initial_state.profile_image_url,
        offline_image_url: state.offline_image_url ?? initial_state.offline_image_url,
        current_view_count: state.current_view_count ?? initial_state.current_view_count,
        created_at: state.created_at ?? initial_state.created_at
    }
}

export default End_User_Twitch_Channel_State_Reducer