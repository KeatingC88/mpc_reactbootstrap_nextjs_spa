import {
    UPDATE_END_USER_TWITCH_VIDEOS_STATE,
    NULL_END_USER_TWITCH_VIDEOS_STATE,
} from '@Constants'

interface end_user_twitch_video_state {
    id: string | null
    stream_id: string | null
    user_id: string | null
    user_login: string | null
    user_name: string | null
    title: string | null
    description: string | null
    created_at: string | null        // ISO 8601 timestamp
    published_at: string | null      // ISO 8601 timestamp
    url: string | null
    thumbnail_url: string | null
    viewable: 'public' | 'private' | null
    view_count: number | null
    language: string | null
    type: 'archive' | 'highlight' | 'upload' | null
    duration: string | null
}

interface end_user_twitch_video_action {
    type: string
    payload?: Partial<end_user_twitch_video_state>
}

const initial_state: end_user_twitch_video_state = {
    id: null,
    stream_id: null,
    user_id: null,
    user_login: null,
    user_name: null,
    title: null,
    description: null,
    created_at: null,
    published_at: null,
    url: null,
    thumbnail_url: null,
    viewable: null,
    view_count: null,
    language: null,
    type: null,
    duration: null
}

const End_User_Twitch_Videos_State_Reducer = (
    state: end_user_twitch_video_state = initial_state,
    action: end_user_twitch_video_action
): end_user_twitch_video_state => {
    if (action.type.includes('END_USER_TWITCH_VIDEOS')) {
        switch (action.type) {
            case UPDATE_END_USER_TWITCH_VIDEOS_STATE:
                return {
                    ...state,
                    id: action.payload?.id ?? state.id,
                    stream_id: action.payload?.stream_id ?? state.stream_id,
                    user_id: action.payload?.user_id ?? state.user_id,
                    user_login: action.payload?.user_login ?? state.user_login,
                    user_name: action.payload?.user_name ?? state.user_name,
                    title: action.payload?.title ?? state.title,
                    description: action.payload?.description ?? state.description,
                    created_at: action.payload?.created_at ?? state.created_at,
                    published_at: action.payload?.published_at ?? state.published_at,
                    url: action.payload?.url ?? state.url,
                    thumbnail_url: action.payload?.thumbnail_url ?? state.thumbnail_url,
                    viewable: action.payload?.viewable ?? state.viewable,
                    view_count: action.payload?.view_count ?? state.view_count,
                    language: action.payload?.language ?? state.language,
                    type: action.payload?.type ?? state.type,
                    duration: action.payload?.duration ?? state.duration,
                }
            case NULL_END_USER_TWITCH_VIDEOS_STATE:
                return {
                    ...initial_state
                }
            default:
                break
        }
    }

    return {
        ...state,
        id: state.id ?? initial_state.id,
        stream_id: state.stream_id ?? initial_state.stream_id,
        user_id: state.user_id ?? initial_state.user_id,
        user_login: state.user_login ?? initial_state.user_login,
        user_name: state.user_name ?? initial_state.user_name,
        title: state.title ?? initial_state.title,
        description: state.description ?? initial_state.description,
        created_at: state.created_at ?? initial_state.created_at,
        published_at: state.published_at ?? initial_state.published_at,
        url: state.url ?? initial_state.url,
        thumbnail_url: state.thumbnail_url ?? initial_state.thumbnail_url,
        viewable: state.viewable ?? initial_state.viewable,
        view_count: state.view_count ?? initial_state.view_count,
        language: state.language ?? initial_state.language,
        type: state.type ?? initial_state.type,
        duration: state.duration ?? initial_state.duration,
    }
}

export default End_User_Twitch_Videos_State_Reducer
