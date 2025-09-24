import {
    UPDATE_END_USER_TWITCH_ACCOUNT_STATE,
    NULL_END_USER_TWITCH_ACCOUNT_STATE,
} from '@Constants'

interface end_user_twitch_account_state {
    id: BigInt | null
    display_name: string | null
    login: string | null
    email_address: string | null
    profile_image_url: string | null
}

interface end_user_twitch_account_action {
    type: string
    payload?: Partial<end_user_twitch_account_state>
}

const initial_state: end_user_twitch_account_state = {
    id: null,
    display_name: null,
    login: null,
    email_address: null,
    profile_image_url: null
}

const End_User_Twitch_Account_State_Reducer = (
    state: end_user_twitch_account_state = initial_state,
    action: end_user_twitch_account_action
): end_user_twitch_account_state => {
    if (action.type.includes('END_USER_TWITCH_ACCOUNT')) {
        switch (action.type) {
            case UPDATE_END_USER_TWITCH_ACCOUNT_STATE:
                return {
                    ...state,
                    id: action.payload?.id ?? state.id,
                    display_name: action.payload?.display_name ?? state.display_name,
                    login: action.payload?.login ?? state.login,
                    email_address: action.payload?.email_address ?? state.email_address,
                    profile_image_url: action.payload?.profile_image_url ?? state.profile_image_url
                }
            case NULL_END_USER_TWITCH_ACCOUNT_STATE:
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
        display_name: state.display_name ?? initial_state.display_name,
        login: state.login ?? initial_state.login,
        email_address: state.email_address ?? initial_state.email_address,
        profile_image_url: state.profile_image_url ?? initial_state.profile_image_url
    }
}

export default End_User_Twitch_Account_State_Reducer
