import {
    UPDATE_HOST_ERROR_STATE,
    DEFAULT_HOST_ERROR_STATE,
} from '@Constants'

interface Host_Error_State {
    id: string | null
}

interface Host_Error_Action {
    type: string
    payload?: {
        id: string | null
    }
}

const initial_state: Host_Error_State = {
    id: null
}

const Host_Error_State_Reducer = (
    state: Host_Error_State = initial_state,
    action: Host_Error_Action
): Host_Error_State => {
    if (action.type.indexOf(`HOST_ERROR`) > -1) {
        switch (action.type) {
            case UPDATE_HOST_ERROR_STATE:
                return {
                    ...state,
                    id: action.payload?.id ?? initial_state.id
                }
            case DEFAULT_HOST_ERROR_STATE:
                return {
                    ...state,
                    id: initial_state.id
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

export default Host_Error_State_Reducer
