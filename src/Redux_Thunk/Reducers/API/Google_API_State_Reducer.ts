import {
    UPDATE_GOOGLE_API_STATE,
    NULL_GOOGLE_API_STATE,
} from '@Constants'

interface GoogleAPIState {
    // Define specific keys if needed, or allow dynamic keys
    [key: string]: unknown
}

interface GoogleAPIAction {
    type: string
    payload?: Partial<GoogleAPIState>
}

const initial_state: GoogleAPIState = {}

const Google_API_State_Reducer = (
    state: GoogleAPIState = initial_state,
    action: GoogleAPIAction
): GoogleAPIState => {
    if (action.type.includes('GOOGLE_API')) {
        switch (action.type) {
            case UPDATE_GOOGLE_API_STATE:
                return {
                    ...state,
                    ...(action.payload ?? {})
                }
            case NULL_GOOGLE_API_STATE:
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

export default Google_API_State_Reducer
