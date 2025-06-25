import {
    UPDATE_END_USER_DISCORD_ACCOUNT_STATE,
    NULL_END_USER_DISCORD_ACCOUNT_STATE,
} from '@Constants'

interface EndUserDiscordAccountState {
    id: string | null
}

interface EndUserDiscordAccountAction {
    type: string
    payload?: {
        id?: string | null
    }
}

const initial_state: EndUserDiscordAccountState = {
    id: null,
}

const End_User_Discord_Account_State_Reducer = (
    state: EndUserDiscordAccountState = initial_state,
    action: EndUserDiscordAccountAction
): EndUserDiscordAccountState => {
    if (action.type.includes('END_USER_DISCORD_ACCOUNT')) {
        switch (action.type) {
            case UPDATE_END_USER_DISCORD_ACCOUNT_STATE:
                return {
                    ...state,
                    id: action.payload?.id ?? initial_state.id
                }
            case NULL_END_USER_DISCORD_ACCOUNT_STATE:
                return {
                    ...state,
                    id: null
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

export default End_User_Discord_Account_State_Reducer
