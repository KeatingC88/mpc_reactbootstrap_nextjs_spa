import {
    UPDATE_APPLICATION_LANGUAGE_CURRENT_VALUE,
    DEFAULT_APPLICATION_LANGUAGE_CURRENT_VALUE,
    LANGUAGE_DICTIONARIES
} from '@Constants'

interface Application_Language_State {
    current_language: string
    language: string
    region: string
    language_dictionaries: any
}

interface Application_Language_Action {
    type: string
    payload?: {
        current_language: string
    }
}

const initial_state: Application_Language_State = {
    current_language: `en-US`,
    language: `en`,
    region: `US`,
    language_dictionaries: LANGUAGE_DICTIONARIES
}

const Application_Language_State_Reducer = (
    state: Application_Language_State = initial_state,
    action: Application_Language_Action
): Application_Language_State => {
    if (action.type.indexOf(`APPLICATION_LANGUAGE`) > -1) {
        switch (action.type) {
            case UPDATE_APPLICATION_LANGUAGE_CURRENT_VALUE:
                return {
                    ...state,
                    current_language: action.payload?.current_language ?? initial_state.current_language,
                    language: action.payload?.current_language.split(`-`)[0] ?? initial_state.language,
                    region: action.payload?.current_language.split(`-`)[1] ?? initial_state.region
                }
            case DEFAULT_APPLICATION_LANGUAGE_CURRENT_VALUE:
                return {
                    ...state,
                    current_language: initial_state.current_language,
                    language: initial_state.language,
                    region: initial_state.region
                }
            default:
                break
        }
    }

    return {
        ...state,
        language_dictionaries: initial_state.language_dictionaries,
        current_language: state.current_language ?? initial_state.current_language,
        language: state.language ?? initial_state.language,
        region: state.region ?? initial_state.region
    }
}

export default Application_Language_State_Reducer
