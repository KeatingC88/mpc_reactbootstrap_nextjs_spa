import {
    UPDATE_NETWORK_ERROR_STATE,
    DEFAULT_NETWORK_ERROR_STATE,
} from '@Constants'

interface Network_Error_State {
    id: string | null
    code: string | number | null
    config: any
    message: string | null
    name: string | null
    request: any
    stack: string | null
}

interface Network_Error_Action {
    type: string
    payload?: Partial<Network_Error_State>
}

const initial_state: Network_Error_State = {
    id: null,
    code: null,
    config: null,
    message: null,
    name: null,
    request: null,
    stack: null
}

const Network_Error_State_Reducer = (
    state: Network_Error_State = initial_state,
    action: Network_Error_Action
): Network_Error_State => {
    if (action.type.indexOf(`NETWORK_ERROR`) > -1) {

        switch (action.type) {
            case UPDATE_NETWORK_ERROR_STATE:
                return {
                    ...state,
                    id: action.payload?.id ?? initial_state.id,
                    code: action.payload?.code ?? initial_state.code,
                    config: action.payload?.config ?? initial_state.config,
                    message: action.payload?.message ?? initial_state.message,
                    name: action.payload?.name ?? initial_state.name,
                    request: action.payload?.request ?? initial_state.request,
                    stack: action.payload?.stack ?? initial_state.stack
                }
            case DEFAULT_NETWORK_ERROR_STATE:
                return {
                    ...state,
                    id: initial_state.id,
                    code: initial_state.code,
                    config: initial_state.config,
                    message: initial_state.message,
                    name: initial_state.name,
                    request: initial_state.request,
                    stack: initial_state.stack
                }
            default:
                break
        }
    }

    return {
        ...state,
        id: state.id ?? initial_state.id,
        code: state.code ?? initial_state.code,
        config: state.config ?? initial_state.config,
        message: state.message ?? initial_state.message,
        name: state.name ?? initial_state.name,
        request: state.request ?? initial_state.request,
        stack: state.stack ?? initial_state.stack
    }
}

export default Network_Error_State_Reducer
