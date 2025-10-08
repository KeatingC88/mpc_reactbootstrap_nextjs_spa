import {
    NULL_END_USER_FRIENDS_STATE,
    UPDATE_END_USER_FRIENDS_PERMISSION_STATE,
    UPDATE_END_USER_FRIENDS_SENT_PERMISSION_STATE,
    UPDATE_END_USER_FRIENDS_RECEIVED_PERMISSION_STATE,
    UPDATE_END_USER_FRIENDS_BLOCKED_PERMISSION_STATE,
    UPDATE_END_USER_FRIENDS_APPROVED_PERMISSION_STATE,
    UPDATE_END_USER_FRIENDS_REPORTED_PERMISSION_STATE
} from '@Constants'

interface End_User_Friends_State {
    approved: BigInt[] | null
    sent_requests: {
        participant_id: BigInt,
        request: boolean,
        block: boolean,
        approve: boolean,
        time_stamp: BigInt
    }[] | null,
    blocked: BigInt[] | null,
    received_requests: {
        participant_id: BigInt,
        request: boolean,
        block: boolean,
        approve: boolean,
        time_stamp: BigInt
    }[] | null,
    reported: BigInt[] | null,
    time_stamped: BigInt | null
}

interface End_User_Friends_Action {
    type: string
    payload?: Partial<End_User_Friends_State>
}

const initial_state: End_User_Friends_State = {
    approved: null,
    sent_requests: null,
    received_requests: null,
    time_stamped: null,
    blocked: null,
    reported: null

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
            case UPDATE_END_USER_FRIENDS_BLOCKED_PERMISSION_STATE:
                return {
                    ...state,
                    blocked: action.payload?.blocked ?? initial_state.blocked,
                }
            case UPDATE_END_USER_FRIENDS_APPROVED_PERMISSION_STATE:
                return {
                    ...state,
                    approved: action.payload?.approved ?? initial_state.approved,
                }
            case UPDATE_END_USER_FRIENDS_REPORTED_PERMISSION_STATE:
                return {
                    ...state,
                    reported: action.payload?.reported ?? initial_state.reported,
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
        reported: state.reported ?? initial_state.reported,
        time_stamped: state.time_stamped ?? initial_state.time_stamped
    }
}

export default End_User_Friends_State_Reducer