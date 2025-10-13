import {
    NULL_END_USER_REPORTED_USER_STATE,
    UPDATE_END_USER_REPORTED_USER_STATE
} from '@Constants'
interface End_User_Reported_User_State {
    reported: {
        by_other_user_ids: BigInt[],
        user_ids: BigInt[],
    },
    time_stamped: BigInt | null
}
interface End_User_Reported_User_Action {
    type: string
    payload?: Partial<End_User_Reported_User_State>
}

const initial_state: End_User_Reported_User_State = {
    reported: {
        by_other_user_ids: [],
        user_ids: [],
    },
    time_stamped: null
}

const End_User_Reported_User_State_Reducer = (
    state: End_User_Reported_User_State = initial_state,
    action: End_User_Reported_User_Action
): End_User_Reported_User_State => {

    if (action.type.includes('END_USER_REPORTED_USER')) {  
        switch (action.type) {
            case UPDATE_END_USER_REPORTED_USER_STATE:
                return {
                    ...state,
                    reported: action.payload?.reported ?? initial_state.reported,
                    time_stamped: action.payload?.time_stamped ?? initial_state.time_stamped,
                }
            case NULL_END_USER_REPORTED_USER_STATE:
                return {
                    ...initial_state
                }
            default:
                break
        }
    }

    return {
        ...state,
        reported: state.reported ?? initial_state.reported,
        time_stamped: state.time_stamped ?? initial_state.time_stamped
    }
}

export default End_User_Reported_User_State_Reducer