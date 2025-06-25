import {
    UPDATE_END_USER_ACCOUNT_STATE,
    NULL_END_USER_ACCOUNT_STATE,
    UPDATE_END_USER_ACCOUNT_ONLINE_STATUS,
    UPDATE_END_USER_ACCOUNT_CUSTOM_LABEL,
    UPDATE_END_USER_ACCOUNT_EMAIL_ADDRESS,
    UPDATE_END_USER_ACCOUNT_TOKEN,
    UPDATE_END_USER_ACCOUNT_LOGIN_TYPE,
    UPDATE_END_USER_ACCOUNT_ACCOUNT_TYPE,
    UPDATE_END_USER_ACCOUNT_NAME,
    UPDATE_END_USER_ACCOUNT_AVATAR_URL_PATH,
    UPDATE_END_USER_ACCOUNT_AVATAR_TITLE,
    UPDATE_END_USER_ACCOUNT_GROUPS,
    UPDATE_END_USER_ACCOUNT_ROLES
} from '@Constants'

interface End_User_Account_State {
    token: string | null
    token_expire: number | any | string | undefined | null
    token_expire_notification: string | null
    id: BigInt | null
    avatar_title: string | null
    avatar_url_path: string | undefined | null
    created_on: string | null
    custom_lbl: string | null
    email_address: string | null
    login_on: string | null
    logout_on: string | null
    login_type: string | null
    name: string | null
    public_id: string | null
    online_status: number | string | null
    account_type: number
    roles: any
    client_address: string | null
    groups: any
    user_agent: string | null
    phone_country_code: number | null
    phone_carrier: string | null
    telephone: number | null
}

interface End_User_Account_Action {
    type: string
    payload?: Partial<End_User_Account_State>
}

const initial_state: End_User_Account_State = {
    token: null,
    token_expire: null,
    token_expire_notification: null,
    id: null,
    avatar_title: null,
    avatar_url_path: null,
    created_on: null,
    custom_lbl: null,
    email_address: null,
    login_on: null,
    logout_on: null,
    login_type: null,
    name: null,
    public_id: null,
    online_status: null,
    account_type: 0,
    roles: null,
    client_address: null,
    groups: null,
    user_agent: typeof navigator !== 'undefined' ? navigator.userAgent : null,
    phone_country_code: null,
    phone_carrier: null,
    telephone: null
}

const End_User_Account_State_Reducer = (
    state: End_User_Account_State = initial_state,
    action: End_User_Account_Action
): End_User_Account_State => {
    if (action.type.indexOf(`END_USER_ACCOUNT`) > -1) {
        switch (action.type) {
            case UPDATE_END_USER_ACCOUNT_STATE:
                return {
                    ...state,
                    token: action.payload?.token ?? initial_state.token,
                    token_expire: action.payload?.token_expire ?? initial_state.token_expire,
                    id: action.payload?.id ?? initial_state.id,
                    public_id: action.payload?.public_id ?? initial_state.public_id,
                    avatar_title: action.payload?.avatar_title ?? initial_state.avatar_title,
                    avatar_url_path: action.payload?.avatar_url_path ?? initial_state.avatar_url_path,
                    account_type: action.payload?.account_type ?? initial_state.account_type,
                    login_type: action.payload?.login_type ?? initial_state.login_type,
                    created_on: action.payload?.created_on ?? initial_state.created_on,
                    custom_lbl: action.payload?.custom_lbl ?? initial_state.custom_lbl,
                    email_address: action.payload?.email_address ?? initial_state.email_address,
                    login_on: action.payload?.login_on ?? initial_state.login_on,
                    logout_on: action.payload?.logout_on ?? initial_state.logout_on,
                    name: action.payload?.name ?? initial_state.name,
                    online_status: action.payload?.online_status ?? initial_state.online_status,
                    roles: action.payload?.roles ?? initial_state.roles,
                    client_address: action.payload?.client_address ?? initial_state.client_address,
                    groups: action.payload?.groups ?? initial_state.groups
                }
            case NULL_END_USER_ACCOUNT_STATE:
                return {
                    ...state,
                    token: initial_state.token,
                    token_expire: initial_state.token_expire,
                    id: initial_state.id,
                    public_id: initial_state.public_id,
                    avatar_title: initial_state.avatar_title,
                    avatar_url_path: initial_state.avatar_url_path,
                    created_on: initial_state.created_on,
                    custom_lbl: initial_state.custom_lbl,
                    email_address: initial_state.email_address,
                    login_on: initial_state.login_on,
                    logout_on: initial_state.logout_on,
                    login_type: initial_state.login_type,
                    name: initial_state.name,
                    online_status: initial_state.online_status,
                    account_type: 0,
                    roles: initial_state.roles,
                    client_address: initial_state.client_address,
                    groups: initial_state.groups
                }
            case UPDATE_END_USER_ACCOUNT_CUSTOM_LABEL:
                return {
                    ...state,
                    custom_lbl: action.payload?.custom_lbl ?? state.custom_lbl
                }
            case UPDATE_END_USER_ACCOUNT_EMAIL_ADDRESS:
                return {
                    ...state,
                    email_address: action.payload?.email_address ?? state.email_address
                }
            case UPDATE_END_USER_ACCOUNT_TOKEN:
                return {
                    ...state,
                    token: action.payload?.token ?? state.token,
                    token_expire: action.payload?.token_expire ?? state.token_expire
                }
            case UPDATE_END_USER_ACCOUNT_LOGIN_TYPE:
                return {
                    ...state,
                    login_type: action.payload?.login_type ?? state.login_type
                }
            case UPDATE_END_USER_ACCOUNT_ACCOUNT_TYPE:
                return {
                    ...state,
                    account_type: action.payload?.account_type ?? state.account_type
                }
            case UPDATE_END_USER_ACCOUNT_NAME:
                return {
                    ...state,
                    name: action.payload?.name ?? state.name
                }
            case UPDATE_END_USER_ACCOUNT_ONLINE_STATUS:
                return {
                    ...state,
                    online_status: action.payload?.online_status ?? state.online_status
                }
            case UPDATE_END_USER_ACCOUNT_AVATAR_URL_PATH:
                return {
                    ...state,
                    avatar_url_path: action.payload?.avatar_url_path ?? state.avatar_url_path
                }
            case UPDATE_END_USER_ACCOUNT_AVATAR_TITLE:
                return {
                    ...state,
                    avatar_title: action.payload?.avatar_title ?? state.avatar_title
                }
            case UPDATE_END_USER_ACCOUNT_GROUPS:
                return {
                    ...state,
                    groups: action.payload?.groups ?? state.groups
                }
            case UPDATE_END_USER_ACCOUNT_ROLES:
                return {
                    ...state,
                    roles: action.payload?.roles ?? state.roles
                }
            default:
                break
        }
    }

    return {
        ...state,
        token: state.token ?? initial_state.token,
        token_expire: state.token_expire ?? initial_state.token_expire,
        id: state.id ?? initial_state.id,
        public_id: state.public_id ?? initial_state.public_id,
        account_type: state.account_type ?? initial_state.account_type,
        login_type: state.login_type ?? initial_state.login_type,
        avatar_title: state.avatar_title ?? initial_state.avatar_title,
        avatar_url_path: state.avatar_url_path ?? initial_state.avatar_url_path,
        created_on: state.created_on ?? initial_state.created_on,
        custom_lbl: state.custom_lbl ?? initial_state.custom_lbl,
        email_address: state.email_address ?? initial_state.email_address,
        login_on: state.login_on ?? initial_state.login_on,
        logout_on: state.logout_on ?? initial_state.logout_on,
        name: state.name ?? initial_state.name,
        online_status: state.online_status ?? initial_state.online_status,
        roles: state.roles ?? initial_state.roles,
        client_address: state.client_address ?? initial_state.client_address,
        groups: state.groups ?? initial_state.groups,
        user_agent: initial_state.user_agent,
        phone_country_code: initial_state.phone_country_code,
        phone_carrier: initial_state.phone_carrier,
        telephone: initial_state.telephone
    }
}

export default End_User_Account_State_Reducer
