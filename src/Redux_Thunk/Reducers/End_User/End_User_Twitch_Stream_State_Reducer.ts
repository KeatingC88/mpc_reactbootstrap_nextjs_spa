import {
    UPDATE_END_USER_TWITCH_STREAM_STATE,
    NULL_END_USER_TWITCH_STREAM_STATE,
} from '@Constants'

interface end_user_twitch_stream_state {
    id: BigInt | null
    user_id: BigInt | null
    game_id: BigInt | null
    viewer_count: BigInt | null
    started_at: string | null
    user_login: string | null
    user_name: string | null
    game_name: string | null
    type: string | null
    title: string | null
    language: string | null
    thumbnail_url: string | null
    tag_ids: [string] | null
    tags: [string] | null
    is_mature: boolean | null
}

interface end_user_twitch_stream_action {
    type: string
    payload?: Partial<end_user_twitch_stream_state>
}

const initial_state: end_user_twitch_stream_state = {
    id: null,
    user_id: null,
    game_id: null,
    viewer_count: null,
    started_at: null,
    user_login: null,
    user_name: null,
    game_name: null,
    type: null,
    title: null,
    language: null,
    thumbnail_url: null,
    tag_ids: null,
    tags: null,
    is_mature: null,
}

const End_User_Twitch_Stream_State_Reducer = (
    state: end_user_twitch_stream_state = initial_state,
    action: end_user_twitch_stream_action
): end_user_twitch_stream_state => {
    if (action.type.includes('END_USER_TWITCH_STREAM')) {
        switch (action.type) {
            case UPDATE_END_USER_TWITCH_STREAM_STATE:
                return {
                    ...state,
                    id: action.payload?.id ?? state.id,
                    user_id: action.payload?.user_id ?? state.user_id,
                    game_id: action.payload?.game_id ?? state.game_id,
                    viewer_count: action.payload?.viewer_count ?? state.viewer_count,
                    started_at: action.payload?.started_at ?? state.started_at,
                    user_login: action.payload?.user_login ?? state.user_login,
                    user_name: action.payload?.user_name ?? state.user_name,
                    game_name: action.payload?.game_name ?? state.game_name,
                    type: action.payload?.type ?? state.type,
                    title: action.payload?.title ?? state.title,
                    language: action.payload?.language ?? state.language,
                    thumbnail_url: action.payload?.thumbnail_url ?? state.thumbnail_url,
                    tag_ids: action.payload?.tag_ids ?? state.tag_ids,
                    tags: action.payload?.tags ?? state.tags,
                    is_mature: action.payload?.is_mature ?? state.is_mature,
                }
            case NULL_END_USER_TWITCH_STREAM_STATE:
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
        user_id: state.user_id ?? initial_state.user_id,
        game_id: state.game_id ?? initial_state.game_id,
        viewer_count: state.viewer_count ?? initial_state.viewer_count,
        started_at: state.started_at ?? initial_state.started_at,
        user_login: state.user_login ?? initial_state.user_login,
        user_name: state.user_name ?? initial_state.user_name,
        game_name: state.game_name ?? initial_state.game_name,
        type: state.type ?? initial_state.type,
        title: state.title ?? initial_state.title,
        language: state.language ?? initial_state.language,
        thumbnail_url: state.thumbnail_url ?? initial_state.thumbnail_url,
        tag_ids: state.tag_ids ?? initial_state.tag_ids,
        tags: state.tags ?? initial_state.tags,
        is_mature: state.is_mature ?? initial_state.is_mature
    }
}

export default End_User_Twitch_Stream_State_Reducer
