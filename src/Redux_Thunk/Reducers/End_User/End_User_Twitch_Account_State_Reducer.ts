import {
    UPDATE_END_USER_TWITCH_ACCOUNT_STATE,
    NULL_END_USER_TWITCH_ACCOUNT_STATE,
} from '@Constants'

interface EndUserTwitchAccountState {
    id: string | null
}

interface EndUserTwitchAccountAction {
    type: string
    payload?: Partial<EndUserTwitchAccountState>
}

const initial_state: EndUserTwitchAccountState = {
    id: null
}

const End_User_Twitch_Account_State_Reducer = (
    state: EndUserTwitchAccountState = initial_state,
    action: EndUserTwitchAccountAction
): EndUserTwitchAccountState => {
    if (action.type.includes('END_USER_TWITCH_ACCOUNT')) {
        switch (action.type) {
            case UPDATE_END_USER_TWITCH_ACCOUNT_STATE:
                return {
                    ...state,
                    id: action.payload?.id ?? state.id,
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
        id: state.id ?? initial_state.id
    }
}

export default End_User_Twitch_Account_State_Reducer
