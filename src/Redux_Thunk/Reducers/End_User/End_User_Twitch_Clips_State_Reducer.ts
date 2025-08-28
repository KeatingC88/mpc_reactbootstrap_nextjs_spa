import {
    UPDATE_END_USER_TWITCH_CLIPS_STATE,
    NULL_END_USER_TWITCH_CLIPS_STATE,
} from '@Constants'

interface end_user_twitch_clip_state {
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

interface end_user_twitch_clip_action {
    type: string
    payload?: Partial<end_user_twitch_clip_state>
}

const initial_state: end_user_twitch_clip_state = {
    id: null,
    url: null,
    embed_url: null,
    broadcaster_id: null,
    creator_id: null,
    video_id: null,
    game_id: null,
    language: null,
    title: null,
    view_count: null,
    created_at: null,
    thumbnail_url: null
}

const End_User_Twitch_Clips_State_Reducer = (
    state: end_user_twitch_clip_state = initial_state,
    action: end_user_twitch_clip_action
): end_user_twitch_clip_state => {
    if (action.type.includes('END_USER_TWITCH_CLIPS')) {
        switch (action.type) {
            case UPDATE_END_USER_TWITCH_CLIPS_STATE:
                return {
                    ...state,
                    id: action.payload?.id ?? state.id,
                    url: action.payload?.url ?? state.url,
                    embed_url: action.payload?.embed_url ?? state.embed_url,
                    broadcaster_id: action.payload?.broadcaster_id ?? state.broadcaster_id,
                    creator_id: action.payload?.creator_id ?? state.creator_id,
                    video_id: action.payload?.video_id ?? state.video_id,
                    game_id: action.payload?.game_id ?? state.game_id,
                    language: action.payload?.language ?? state.language,
                    title: action.payload?.title ?? state.title,
                    view_count: action.payload?.view_count ?? state.view_count,
                    created_at: action.payload?.created_at ?? state.created_at,
                    thumbnail_url: action.payload?.thumbnail_url ?? state.thumbnail_url,
                }
            case NULL_END_USER_TWITCH_CLIPS_STATE:
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
        url: state.url ?? initial_state.url,
        embed_url: state.embed_url ?? initial_state.embed_url,
        broadcaster_id: state.broadcaster_id ?? initial_state.broadcaster_id,
        creator_id: state.creator_id ?? initial_state.creator_id,
        video_id: state.video_id ?? initial_state.video_id,
        game_id: state.game_id ?? initial_state.game_id,
        language: state.language ?? initial_state.language,
        title: state.title ?? initial_state.title,
        view_count: state.view_count ?? initial_state.view_count,
        created_at: state.created_at ?? initial_state.created_at,
        thumbnail_url: state.thumbnail_url ?? initial_state.thumbnail_url,
    }
}

export default End_User_Twitch_Clips_State_Reducer
