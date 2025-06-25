import {
    UPDATE_DISCORD_API_STATE,
    NULL_DISCORD_API_STATE,
} from '@Constants'

interface DiscordAPIState {
    [key: string]: unknown
}

interface DiscordAPIAction {
    type: string
    payload?: Partial<DiscordAPIState>
}

const initial_state: DiscordAPIState = {}

const Discord_API_State_Reducer = (
    state: DiscordAPIState = initial_state,
    action: DiscordAPIAction
): DiscordAPIState => {
    if (action.type.includes('DISCORD_API')) {
        switch (action.type) {
            case UPDATE_DISCORD_API_STATE:
                return {
                    ...state,
                    ...(action.payload ?? {})
                }
            case NULL_DISCORD_API_STATE:
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

export default Discord_API_State_Reducer
