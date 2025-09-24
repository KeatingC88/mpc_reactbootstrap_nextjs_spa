import {
    UPDATE_END_USER_PROFILE_ACCOUNT_STATE,
    UPDATE_END_USER_PROFILE_ACCOUNT_FIRST_NAME,
    UPDATE_END_USER_PROFILE_ACCOUNT_LAST_NAME,
    UPDATE_END_USER_PROFILE_ACCOUNT_MIDDLE_NAME,
    UPDATE_END_USER_PROFILE_ACCOUNT_MAIDEN_NAME,
    UPDATE_END_USER_PROFILE_ACCOUNT_GENDER,
    UPDATE_END_USER_PROFILE_ACCOUNT_BIRTH_DAY,
    UPDATE_END_USER_PROFILE_ACCOUNT_BIRTH_MONTH,
    UPDATE_END_USER_PROFILE_ACCOUNT_BIRTH_YEAR,
    UPDATE_END_USER_PROFILE_ACCOUNT_ETHNICITY,
    NULL_END_USER_PROFILE_ACCOUNT_STATE,
} from '@Constants'

interface End_User_Relationship_State {
    friends: [BigInt] | null
    colleagues: [BigInt] | null
    coworkers: [BigInt] | null
    managers: [BigInt] | null
    teams: [BigInt] | null
    clans: [BigInt] | null
    events: [BigInt] | null
    video_games: [BigInt] | null
    social_media: [BigInt] | null
}

interface End_User_Relationship_Action {
    type: string
    payload?: Partial<End_User_Relationship_State>
}

const initial_state: End_User_Relationship_State = {
    first_name: null,
    last_name: null,
    middle_name: null,
    maiden_name: null,
    gender: 2,
    birth_month: 0,
    birth_day: 0,
    birth_year: 0,
    ethnicity: null,
}

const End_User_Relationship_State_Reducer = (
    state: End_User_Relationship_State = initial_state,
    action: End_User_Relationship_Action
): End_User_Relationship_State => {
    if (action.type.includes('END_USER_PROFILE_ACCOUNT')) {
        switch (action.type) {
            case UPDATE_END_USER_PROFILE_ACCOUNT_STATE:
                return {
                    ...state,
                    first_name: action.payload?.first_name ?? initial_state.first_name,
                    last_name: action.payload?.last_name ?? initial_state.last_name,
                    middle_name: action.payload?.middle_name ?? initial_state.middle_name,
                    maiden_name: action.payload?.maiden_name ?? initial_state.maiden_name,
                    gender: action.payload?.gender ?? initial_state.gender,
                    birth_month: action.payload?.birth_month ?? initial_state.birth_month,
                    birth_day: action.payload?.birth_day ?? initial_state.birth_day,
                    birth_year: action.payload?.birth_year ?? initial_state.birth_year,
                    ethnicity: action.payload?.ethnicity ?? initial_state.ethnicity,
                }
            case UPDATE_END_USER_PROFILE_ACCOUNT_FIRST_NAME:
                return {
                    ...state,
                    first_name: action.payload?.first_name ?? initial_state.first_name,
                }
            case UPDATE_END_USER_PROFILE_ACCOUNT_LAST_NAME:
                return {
                    ...state,
                    last_name: action.payload?.last_name ?? initial_state.last_name,
                }
            case UPDATE_END_USER_PROFILE_ACCOUNT_MIDDLE_NAME:
                return {
                    ...state,
                    middle_name: action.payload?.middle_name ?? initial_state.middle_name,
                }
            case UPDATE_END_USER_PROFILE_ACCOUNT_MAIDEN_NAME:
                return {
                    ...state,
                    maiden_name: action.payload?.maiden_name ?? initial_state.maiden_name,
                }
            case UPDATE_END_USER_PROFILE_ACCOUNT_GENDER:
                return {
                    ...state,
                    gender: action.payload?.gender ?? initial_state.gender,
                }
            case UPDATE_END_USER_PROFILE_ACCOUNT_BIRTH_MONTH:
                return {
                    ...state,
                    birth_month: action.payload?.birth_month ?? initial_state.birth_month,
                }
            case UPDATE_END_USER_PROFILE_ACCOUNT_BIRTH_DAY:
                return {
                    ...state,
                    birth_day: action.payload?.birth_day ?? initial_state.birth_day,
                }
            case UPDATE_END_USER_PROFILE_ACCOUNT_BIRTH_YEAR:
                return {
                    ...state,
                    birth_year: action.payload?.birth_year ?? initial_state.birth_year,
                }
            case UPDATE_END_USER_PROFILE_ACCOUNT_ETHNICITY:
                return {
                    ...state,
                    ethnicity: action.payload?.ethnicity ?? initial_state.ethnicity,
                }
            case NULL_END_USER_PROFILE_ACCOUNT_STATE:
                return {
                    ...initial_state
                }
            default:
                break
        }
    }

    return {
        ...state,
        first_name: state.first_name ?? initial_state.first_name,
        last_name: state.last_name ?? initial_state.last_name,
        middle_name: state.middle_name ?? initial_state.middle_name,
        maiden_name: state.maiden_name ?? initial_state.maiden_name,
        gender: state.gender ?? initial_state.gender,
        birth_month: state.birth_month ?? initial_state.birth_month,
        birth_day: state.birth_day ?? initial_state.birth_day,
        birth_year: state.birth_year ?? initial_state.birth_year,
        ethnicity: state.ethnicity ?? initial_state.ethnicity,
    }
}

export default End_User_Relationship_State_Reducer