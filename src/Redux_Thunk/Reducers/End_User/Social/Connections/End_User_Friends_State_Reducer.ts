import {
    NULL_END_USER_FRIENDS_STATE,
    UPDATE_END_USER_FRIENDS_PERMISSION_STATE,
    UPDATE_END_USER_FRIENDS_SENT_PERMISSION_STATE,
    UPDATE_END_USER_FRIENDS_RECEIVED_PERMISSION_STATE,
    UPDATE_END_USER_FRIENDS_APPROVED_PERMISSION_STATE
} from '@Constants'

interface End_User_Friends_State {
    approved: {
        user_ids: [],
        users_data: {
            [user_id: string]: {
                user_id: BigInt,
                account: {
                    avatar_title: string | null
                    avatar_url_path: string | null
                    created_on: string | null
                    custom_lbl: string | null
                    email_address: string | null
                    login_on: string | null
                    login_type: string | null
                    name: string | null
                    public_id: string | null
                    online_status: number | string | null
                    account_type: number
                    roles: any
                    groups: any
                },
                identity: {
                    first_name: string,
                    last_name: string,
                    middle_name: string,
                    maiden_name: string,
                    gender: number,
                    birth_month: number,
                    birth_day: number,
                    birth_year: number,
                    ethnicity: string,
                },
                twitch: {
                    twitch_id: BigInt | null,
                    display_name: string | null,
                    login: string | null,
                    email_address: string | null,
                    profile_image_url: string | null,
                },
            }
        } | {}
    } | null,
    sent_requests: {
        participant_id: BigInt | null,
        request: boolean | null,
        block: boolean | null,
        approve: boolean | null,
        time_stamp: BigInt | null
    }[] | {},
    received_requests: {
        participant_id: BigInt | null,
        request: boolean | null,
        block: boolean | null,
        approve: boolean | null,
        time_stamp: BigInt | null
    }[] | {},
    blocked: {
        by_other_user_ids: BigInt[],
        user_ids: BigInt[],
        users_data: {
            [user_id: string]: {
                user_id: BigInt,
                account: {
                    avatar_title: string | null
                    avatar_url_path: string | null
                    created_on: string | null
                    custom_lbl: string | null
                    email_address: string | null
                    login_on: string | null
                    login_type: string | null
                    name: string | null
                    public_id: string | null
                    online_status: number | string | null
                    account_type: number
                    roles: any
                    groups: any
                },
                identity: {
                    first_name: string,
                    last_name: string,
                    middle_name: string,
                    maiden_name: string,
                    gender: number,
                    birth_month: number,
                    birth_day: number,
                    birth_year: number,
                    ethnicity: string,
                },
                twitch: {
                    twitch_id: BigInt | null,
                    display_name: string | null,
                    login: string | null,
                    email_address: string | null,
                    profile_image_url: string | null,
                },
            }
        },
    },
    time_stamped: BigInt | null
}
interface End_User_Friends_Action {
    type: string
    payload?: Partial<End_User_Friends_State>
}

const initial_state: End_User_Friends_State = {
    approved: {
        user_ids: [],
        users_data: {}
    },
    sent_requests: [],
    received_requests: [],
    time_stamped: null,
    blocked: {
        by_other_user_ids: [],
        user_ids: [],
        users_data: {}
    }
}

const End_User_Friends_State_Reducer = (
    state: End_User_Friends_State = initial_state,
    action: End_User_Friends_Action
): End_User_Friends_State => {

    if (action.type.includes('END_USER_FRIENDS')) {
        switch (action.type) {
            case UPDATE_END_USER_FRIENDS_PERMISSION_STATE:
                return {
                    ...state,
                    sent_requests: action.payload?.sent_requests ?? initial_state.sent_requests,
                    received_requests: action.payload?.received_requests ?? initial_state.received_requests,
                    approved: action.payload?.approved ?? initial_state.approved,
                    blocked: action.payload?.blocked ?? initial_state.blocked,
                    time_stamped: action.payload?.time_stamped ?? initial_state.time_stamped,
                }
            case UPDATE_END_USER_FRIENDS_SENT_PERMISSION_STATE:
                return {
                    ...state,
                    sent_requests: action.payload?.sent_requests ?? initial_state.sent_requests,
                    time_stamped: action.payload?.time_stamped ?? initial_state.time_stamped,
                }
            case UPDATE_END_USER_FRIENDS_RECEIVED_PERMISSION_STATE:
                return {
                    ...state,
                    received_requests: action.payload?.received_requests ?? initial_state.received_requests,
                    time_stamped: action.payload?.time_stamped ?? initial_state.time_stamped,
                }
            case UPDATE_END_USER_FRIENDS_APPROVED_PERMISSION_STATE:
                return {
                    ...state,
                    approved: action.payload?.approved ?? initial_state.approved,
                }
            case NULL_END_USER_FRIENDS_STATE:
                return {
                    ...initial_state
                }
            default:
                break
        }
    }

    return {
        ...state,
        approved: state.approved ?? initial_state.approved,
        sent_requests: state.sent_requests ?? initial_state.sent_requests,
        received_requests: state.received_requests ?? initial_state.received_requests,
        blocked: state.blocked ?? initial_state.blocked,
        time_stamped: state.time_stamped ?? initial_state.time_stamped
    }
}

export default End_User_Friends_State_Reducer