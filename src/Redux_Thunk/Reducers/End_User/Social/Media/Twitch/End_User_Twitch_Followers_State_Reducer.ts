import {
    UPDATE_END_USER_TWITCH_FOLLOWERS_STATE,
    NULL_END_USER_TWITCH_FOLLOWERS_STATE,
} from '@Constants'

interface end_user_twitch_followers_state {
    total: BigInt | null
}

interface end_user_twitch_followers_action {
    type: string
    payload?: Partial<end_user_twitch_followers_state>
}

const initial_state: end_user_twitch_followers_state = {
    total: null,
}

const End_User_Twitch_Followers_State_Reducer = (
    state: end_user_twitch_followers_state = initial_state,
    action: end_user_twitch_followers_action
): end_user_twitch_followers_state => {
    if (action.type.includes('END_USER_TWITCH_FOLLOWERS')) {
        switch (action.type) {
            case UPDATE_END_USER_TWITCH_FOLLOWERS_STATE:
                return {
                    total: action.payload?.total ?? state.total,
                }
            case NULL_END_USER_TWITCH_FOLLOWERS_STATE:
                return {
                    ...initial_state
                }
            default:
                break
        }
    }

    return {
        total: state.total ?? initial_state.total
    }
}

export default End_User_Twitch_Followers_State_Reducer