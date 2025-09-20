import {
    CREATE_APPLICATION_PROGRESS_BAR_STATUS_VALUE,
    NULL_APPLICATION_PROGRESS_BAR_STATUS_VALUE,
    UPDATE_APPLICATION_PROGRESS_BAR_STATUS_VALUE
} from '@Constants'

interface Application_Loading_Progress_State {
    percentage_value: number
}

interface Application_Loading_Progress_Action {
    type: string
    payload?: {
        percentage_value: number
    }
}

const initial_state: Application_Loading_Progress_State = {
    percentage_value: 0
}

const Application_Loading_Progress_State_Reducer = (
    state: Application_Loading_Progress_State = initial_state,
    action: Application_Loading_Progress_Action
): Application_Loading_Progress_State => {
    if (action.type.indexOf(`APPLICATION_PROGRESS_BAR_STATUS_VALUE`) > -1) {
        switch (action.type) {
            case CREATE_APPLICATION_PROGRESS_BAR_STATUS_VALUE:
                return {
                    ...state,
                    percentage_value: 0
                }
            case UPDATE_APPLICATION_PROGRESS_BAR_STATUS_VALUE:
                return {
                    ...state,
                    percentage_value: action.payload?.percentage_value ?? initial_state.percentage_value
                }
            case NULL_APPLICATION_PROGRESS_BAR_STATUS_VALUE:
                return {
                    ...state,
                    percentage_value: 0
                }
            default:
                break
        }
    }

    return {
        ...state,
        percentage_value: state.percentage_value ?? initial_state.percentage_value
    }
}

export default Application_Loading_Progress_State_Reducer