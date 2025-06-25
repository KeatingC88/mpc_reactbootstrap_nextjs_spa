import {
    UPDATE_FACEBOOK_API_STATE,
    NULL_FACEBOOK_API_STATE,
} from '@Constants'

interface FacebookAPIState {
    [key: string]: unknown
}

interface FacebookAPIAction {
    type: string
    payload?: Partial<FacebookAPIState>
}

const initial_state: FacebookAPIState = {}

const Facebook_API_State_Reducer = (
    state: FacebookAPIState = initial_state,
    action: FacebookAPIAction
): FacebookAPIState => {
    if (action.type.includes('FACEBOOK_API')) {
        switch (action.type) {
            case UPDATE_FACEBOOK_API_STATE:
                return {
                    ...state,
                    ...(action.payload ?? {})
                }
            case NULL_FACEBOOK_API_STATE:
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

export default Facebook_API_State_Reducer
