import {
    UPDATE_APPLICATION_PROFILE_VIEWER_STATE,
    NULL_APPLICATION_PROFILE_VIEWER_STATE,
} from '@Constants'

interface Application_Profile_Viewer_State {
    id: BigInt | number | null
    birth_date: string | null
    ethnicity: string | null
    first_name: string | null
    last_name: string | null
    maiden_name: string | null
    middle_name: string | null
    account_type: string | null
    avatar_title: string | null
    avatar_url_path: string | null
    created_on: number | null
    custom_lbl: string | null
    language_code: string | null
    region_code: string | null
    online_status: number | null
    gender: number | null
    name: string | null
    logout_on: number | null
    login_type: string | null
    login_on: number | null
    twitch_email_address: string | null
    twitch_id: BigInt | null
    twitch_user_name: string | null
}

interface Application_Profile_Viewer_Action {
    type: string
    payload: Partial<Application_Profile_Viewer_State>
}

const initial_state: Application_Profile_Viewer_State = {
    id: null,
    birth_date: null,
    ethnicity: null,
    first_name: null,
    last_name: null,
    maiden_name: null,
    middle_name: null,
    account_type: null,
    avatar_title: null,
    avatar_url_path: null,
    created_on: null,
    custom_lbl: null,
    language_code: null,
    region_code: null,
    online_status: null,
    name: null,
    logout_on: null,
    login_type: null,
    login_on: null,
    gender: null,
    twitch_email_address: null,
    twitch_id: null,
    twitch_user_name: null
}

const Application_Profile_Viewer_State_Reducer = (
    state: Application_Profile_Viewer_State = initial_state,
    action: Application_Profile_Viewer_Action
): Application_Profile_Viewer_State => {
    if (action.type.indexOf(`APPLICATION_PROFILE_VIEWER`) > -1) {
        switch (action.type) {
            case UPDATE_APPLICATION_PROFILE_VIEWER_STATE:
                if (action.payload) {
                    return {
                        id: action.payload?.id ?? initial_state.id,
                        birth_date: action.payload?.birth_date ?? initial_state.birth_date,
                        ethnicity: action.payload?.ethnicity ?? initial_state.ethnicity,
                        first_name: action.payload?.first_name ?? initial_state.first_name,
                        last_name: action.payload?.last_name ?? initial_state.last_name,
                        maiden_name: action.payload?.maiden_name ?? initial_state.maiden_name,
                        middle_name: action.payload?.middle_name ?? initial_state.middle_name,
                        gender: action.payload?.gender ?? initial_state.gender,
                        account_type: action.payload?.account_type ?? initial_state.account_type,
                        avatar_title: action.payload?.avatar_title ?? initial_state.avatar_title,
                        avatar_url_path: action.payload?.avatar_url_path ?? initial_state.avatar_url_path,
                        created_on: action.payload?.created_on ?? initial_state.created_on,
                        custom_lbl: action.payload?.custom_lbl ?? initial_state.custom_lbl,
                        language_code: action.payload?.language_code ?? initial_state.language_code,
                        region_code: action.payload?.region_code ?? initial_state.region_code,
                        online_status: action.payload?.online_status ?? initial_state.online_status,
                        name: action.payload?.name ?? initial_state.name,
                        logout_on: action.payload?.logout_on ?? initial_state.logout_on,
                        login_type: action.payload?.login_type ?? initial_state.login_type,
                        login_on: action.payload?.login_on ?? initial_state.login_on,
                        twitch_id: action.payload?.twitch_id ?? initial_state.twitch_id,
                        twitch_email_address: action.payload?.twitch_email_address ?? initial_state.twitch_email_address,
                        twitch_user_name: action.payload?.twitch_user_name ?? initial_state.twitch_user_name
                    }
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
        birth_date: state.birth_date ?? initial_state.birth_date,
        gender: state.gender ?? initial_state.gender,
        ethnicity: state.ethnicity ?? initial_state.ethnicity,
        first_name: state.first_name ?? initial_state.first_name,
        last_name: state.last_name ?? initial_state.last_name,
        maiden_name: state.maiden_name ?? initial_state.maiden_name,
        middle_name: state.middle_name ?? initial_state.middle_name,
        account_type: state.account_type ?? initial_state.account_type,
        avatar_title: state.avatar_title ?? initial_state.avatar_title,
        avatar_url_path: state.avatar_url_path ?? initial_state.avatar_url_path,
        created_on: state.created_on ?? initial_state.created_on,
        custom_lbl: state.custom_lbl ?? initial_state.custom_lbl,
        language_code: state.language_code ?? initial_state.language_code,
        region_code: state.region_code ?? initial_state.region_code,
        online_status: state.online_status ?? initial_state.online_status,
        name: state.name ?? initial_state.name,
        logout_on: state.logout_on ?? initial_state.logout_on,
        login_type: state.login_type ?? initial_state.login_type,
        login_on: state.login_on ?? initial_state.login_on,
        twitch_id: state.twitch_id ?? initial_state.twitch_id,
        twitch_email_address: state.twitch_email_address ?? initial_state.twitch_email_address,
        twitch_user_name: state.twitch_user_name ?? initial_state.twitch_user_name
    }
}

export default Application_Profile_Viewer_State_Reducer