import {
    UPDATE_APPLICATION_PROFILE_VIEWER_STATE,
    NULL_APPLICATION_PROFILE_VIEWER_STATE,
} from '@Constants'

interface Application_Profile_Viewer_State {
    id: BigInt | null
    email_address: string | null
    name: string | null
    login_on: string | null
    logout_on: BigInt | null
    language: string | null
    online_status: string | null
    custom_lbl: string | null
    created_on: BigInt | null
    avatar_url_path: string | null
    avatar_title: string | null
}

interface Application_Profile_Viewer_Action {
    type: string
    payload?: Partial<Application_Profile_Viewer_State>
}

const initial_state: Application_Profile_Viewer_State = {
    id: null,
    email_address: null,
    name: null,
    login_on: null,
    logout_on: null,
    language: null,
    online_status: null,
    custom_lbl: null,
    created_on: null,
    avatar_url_path: null,
    avatar_title: null,
}

const Application_Profile_Viewer_State_Reducer = (
    state: Application_Profile_Viewer_State = initial_state,
    action: Application_Profile_Viewer_Action
): Application_Profile_Viewer_State => {
    if (action.type.indexOf(`APPLICATION_PROFILE_VIEWER`) > -1) {
        switch (action.type) {
            case UPDATE_APPLICATION_PROFILE_VIEWER_STATE:
                return {
                    ...state,
                    id: action.payload?.id ?? initial_state.id,
                    email_address: action.payload?.email_address ?? initial_state.email_address,
                    name: action.payload?.name ?? initial_state.name,
                    login_on: action.payload?.login_on ?? initial_state.login_on,
                    logout_on: action.payload?.logout_on ?? initial_state.logout_on,
                    language: action.payload?.language ?? initial_state.language,
                    online_status: action.payload?.online_status ?? initial_state.online_status,
                    custom_lbl: action.payload?.custom_lbl ?? initial_state.custom_lbl,
                    created_on: action.payload?.created_on ?? initial_state.created_on,
                    avatar_url_path: action.payload?.avatar_url_path ?? initial_state.avatar_url_path,
                    avatar_title: action.payload?.avatar_title ?? initial_state.avatar_title,
                }
            case NULL_APPLICATION_PROFILE_VIEWER_STATE:
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
        email_address: state.email_address ?? initial_state.email_address,
        name: state.name ?? initial_state.name,
        login_on: state.login_on ?? initial_state.login_on,
        logout_on: state.logout_on ?? initial_state.logout_on,
        language: state.language ?? initial_state.language,
        online_status: state.online_status ?? initial_state.online_status,
        custom_lbl: state.custom_lbl ?? initial_state.custom_lbl,
        created_on: state.created_on ?? initial_state.created_on,
        avatar_url_path: state.avatar_url_path ?? initial_state.avatar_url_path,
        avatar_title: state.avatar_title ?? initial_state.avatar_title
    }
}

export default Application_Profile_Viewer_State_Reducer