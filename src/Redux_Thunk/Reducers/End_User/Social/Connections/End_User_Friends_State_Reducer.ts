import {
    UPDATE_END_USER_FRIENDS_STATE,
    NULL_END_USER_FRIENDS_STATE,
} from '@Constants'

interface End_User_Friends_State {
    friends: number[] | null
}

interface End_User_Friends_Action {
    type: string
    payload?: Partial<End_User_Friends_State>
}

const initial_state: End_User_Friends_State = {
    friends: Array.from({ length: 20 }, () => Math.floor(Math.random() * 100) + 1)
}

const End_User_Friends_State_Reducer = (
    state: End_User_Friends_State = initial_state,
    action: End_User_Friends_Action
): End_User_Friends_State => {

    if (action.type.includes('UPDATE_END_USER_FRIENDS_STATE')) {
        switch (action.type) {
            case UPDATE_END_USER_FRIENDS_STATE:
                return {
                    ...state,
                    friends: action.payload?.friends ?? initial_state.friends,
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
        friends: state.friends ?? initial_state.friends
    }
}

export default End_User_Friends_State_Reducer