import {
    UPDATE_APPLICATION_COMMUNITY_STATE,
    NULL_APPLICATION_COMMUNITY_STATE,
} from '@Constants'

interface Application_Community_State {
    users: {
        account_types: {
            [id: number]: number
        },
        avatars: {
            Avatar_url_path: string,
            Avatar_title: string
        }[] | never,
        display_names: {
            ID: BigInt,
            Name: string
        }[] | never,
        languages: {
            Language_code: string,
            Region_code: string
        }[]
    } | null
}

interface Application_Community_Action {
    type: string
    payload?: {
        users: {
            account_types: {
                [id: number]: number
            },
            avatars: {
                Avatar_url_path: string,
                Avatar_title: string
            }[] | never,
            display_names: {
                ID: BigInt,
                Name: string
            }[] | never,
            languages: {
                Language_code: string,
                Region_code: string
            }[]
        } | null
    }
}

const initial_state: Application_Community_State = {
    users: null
}

const Application_Community_State_Reducer = (
    state: Application_Community_State = initial_state,
    action: Application_Community_Action
): Application_Community_State => {
    if (action.type.indexOf(`APPLICATION_COMMUNITY`) > -1) {
        switch (action.type) {
            case UPDATE_APPLICATION_COMMUNITY_STATE:
                return {
                    ...state,
                    users: action.payload?.users ?? initial_state.users
                }
            case NULL_APPLICATION_COMMUNITY_STATE:
                return {
                    ...state,
                    users: null
                }
            default:
                break
        }
    }

    return {
        ...state,
        users: state.users ?? initial_state.users
    }
}

export default Application_Community_State_Reducer
