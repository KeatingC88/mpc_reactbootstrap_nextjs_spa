import { UPDATE_APPLICATION_MOBILE_STATE } from "@Constants"

let mediaQuery: MediaQueryList | null = null
let is_mobile_mode = false

if (typeof window !== "undefined") {
    mediaQuery = window.matchMedia("(max-width: 600px)")
}

const handleScreenChange = (e: MediaQueryListEvent | MediaQueryList): boolean => {
    const isMobile = e.matches
    return isMobile
}

if (mediaQuery) {
    is_mobile_mode = handleScreenChange(mediaQuery)
    mediaQuery.addEventListener("change", handleScreenChange)
}

interface Application_Notification_State {
    mobile_mode: boolean | null
    [key: string]: any
}

interface Application_Notification_Action {
    type: string
    payload?: {
        mobile_mode: boolean
    }
}

const initial_state: Application_Notification_State = {
    mobile_mode: is_mobile_mode
}

const Application_Notification_State_Reducer = (
    state: Application_Notification_State = initial_state,
    action: Application_Notification_Action): Application_Notification_State => {

    if (action.type.indexOf(`UPDATE_APPLICATION_MOBILE_STATE`) > -1) {

        switch (action.type) {
            case UPDATE_APPLICATION_MOBILE_STATE:
                return {
                    ...state,
                    mobile_mode: action.payload?.mobile_mode ?? initial_state.mobile_mode
                }
            default:
                break
        }
    }


    return {
        ...state,
        mobile_mode: state.mobile_mode ?? initial_state.mobile_mode,
    }
}

export default Application_Notification_State_Reducer
