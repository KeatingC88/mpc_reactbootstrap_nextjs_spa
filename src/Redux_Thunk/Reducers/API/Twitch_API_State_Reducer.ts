import {
    UPDATE_TWITCH_API_STATE,
    NULL_TWITCH_API_STATE,
} from '@Constants'

interface TwitchAPIState {
    // Define specific keys if known. For now, this allows any key with unknown value type.
    [key: string]: unknown
}

interface TwitchAPIAction {
    type: string
    payload?: Partial<TwitchAPIState>
}

const initial_state: TwitchAPIState = {}

const Twitch_API_State_Reducer = (
    state: TwitchAPIState = initial_state,
    action: TwitchAPIAction
): TwitchAPIState => {
    if (action.type.includes('TWITCH_API')) {
        switch (action.type) {
            case UPDATE_TWITCH_API_STATE:
                return {
                    ...state,
                    ...(action.payload ?? {})
                }
            case NULL_TWITCH_API_STATE:
                return {
                    ...initial_state
                }
            default:
                break
        }
    }

    return {
        ...state
    }
}

export default Twitch_API_State_Reducer
