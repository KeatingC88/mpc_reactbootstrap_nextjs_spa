import {
    UPDATE_APPLICATION_NOTIFICATION_STATE,
    NULL_APPLICATION_NOTIFICATION_STATE,
} from '@Constants'

interface Application_Notification_State {
    [key: string]: any
}

interface Action {
    type: string
    payload?: {
        [key: string]: any
    }
}

const initial_state: Application_Notification_State = {}

const Application_Notification_State_Reducer = (
    state: Application_Notification_State = initial_state,
    action: Action
): Application_Notification_State => {
    if (action.type.indexOf(`APPLICATION_SETTINGS`) > -1) {
        switch (action.type) {
            case UPDATE_APPLICATION_NOTIFICATION_STATE:
                return {
                    ...state
                }
            case NULL_APPLICATION_NOTIFICATION_STATE:
                return {
                    ...state
                }
            default:
                break
        }
    }

    return {
        ...state
    }
}

export default Application_Notification_State_Reducer