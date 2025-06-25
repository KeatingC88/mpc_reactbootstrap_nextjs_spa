import {
    UPDATE_APPLICATION_SETTINGS_STATE,
    DEFAULT_APPLICATION_SETTINGS_STATE,
    UPDATE_APPLICATION_SETTINGS_DATE,
    UPDATE_APPLICATION_SETTINGS_GLOBAL_TIME,
    UPDATE_APPLICATION_SETTINGS_LOCAL_TIME,
    UPDATE_APPLICATION_SETTINGS_FLAG,
    UPDATE_APPLICATION_SETTINGS_THEME,
    UPDATE_APPLICATION_SETTINGS_TEXT_ALIGNMENT,
    UPDATE_APPLICATION_SETTINGS_NAV_LOCK,
    UPDATE_APPLICATION_SETTINGS_ALIGNMENT,
    UPDATE_APPLICATION_SETTINGS_LOCATION,
    UPDATE_APPLICATION_SETTINGS_MAX_BOOTSTRAP_GRID_COLUMNS,
    UPDATE_APPLICATION_SETTINGS_NAV_SHOW
} from '@Constants' 

import USAFlag from '@Image/NavigationMenu/NationFlags/usa.png'

interface Application_Settings_State {
    theme: number
    alignment: string
    text_alignment: string
    flag: string
    nav_lock: boolean
    grid_type: number
    local_time: number
    gmt_time: number
    location: string
    date: string
    navbar_css_display_value: string
}

interface Application_Settings_Action {
    type: string
    payload?: Partial<Application_Settings_State> & {
        flag?: string
        theme?: number
        alignment?: string
        text_alignment?: string
        nav_lock?: boolean
        grid_type?: string
        navbar_css_display_value?: string
    }
}

const initial_state = {
    grid_type: 1,
    theme: 0,
    flag: USAFlag.src,
    alignment: `justify-content-center`,
    text_alignment: `text-center`,
    nav_lock: false,
    gmt_time: new Date().getTime(),
    local_time: new Date().getTime() + (new Date().getTimezoneOffset() * 60000),
    location: Intl.DateTimeFormat().resolvedOptions().timeZone,
    date: new Date().toLocaleDateString(),
    navbar_css_display_value: ``,
} as Application_Settings_State


type media_query_event_like = MediaQueryList | MediaQueryListEvent

export const set_theme_setting_for_reducer_on_page_load = (
    event: media_query_event_like
): void => {

    if (typeof window === 'undefined') return

    const media_query = window.matchMedia('(prefers-color-scheme: dark)')
    const media_is_supported = media_query.media !== 'not all'
    const prefers_dark_mode = event.matches

    switch (true) {
        case !media_is_supported:
            initial_state.theme = 0

            setTimeout(() => {
                document.body.setAttribute('data-theme', 'Light-Theme')
            }, 500)
            break
        case media_is_supported && !prefers_dark_mode:
            initial_state.theme = 0
            
            setTimeout(() => {
                document.body.setAttribute('data-theme', 'Light-Theme')
            }, 500)
            break
        case media_is_supported && prefers_dark_mode:
            initial_state.theme = 1
            
            setTimeout(() => {
                document.body.setAttribute('data-theme', 'Night-Theme')
            }, 500)
            break
        default:
            initial_state.theme = 0

            setTimeout(() => {
                document.body.setAttribute('data-theme', 'Light-Theme')
            }, 500)
    }

}

setTimeout(() => {
    if (typeof window !== 'undefined') {

        const os_application_color_theme_setting = window.matchMedia('(prefers-color-scheme: dark)')

        set_theme_setting_for_reducer_on_page_load(os_application_color_theme_setting)

        os_application_color_theme_setting.addEventListener(
            'change',
            set_theme_setting_for_reducer_on_page_load
        )
    }
}, 1)

export const Application_Settings_State_Reducer = (
    state: Application_Settings_State = initial_state,
    action: Application_Settings_Action
): Application_Settings_State => {
    if (action.type.indexOf("APPLICATION_SETTINGS") > -1) {

        switch (action.type) {
            case DEFAULT_APPLICATION_SETTINGS_STATE:
                return {
                    ...state,
                    theme: initial_state.theme,
                    alignment: initial_state.alignment,
                    text_alignment: initial_state.text_alignment,
                    flag: initial_state.flag,
                    nav_lock: initial_state.nav_lock,
                    grid_type: initial_state.grid_type,
                    local_time: initial_state.local_time,
                    gmt_time: initial_state.gmt_time,
                    location: initial_state.location,
                    date: initial_state.date,
                    navbar_css_display_value: initial_state.navbar_css_display_value
                }

            case UPDATE_APPLICATION_SETTINGS_STATE:
                return {
                    ...state,
                    ...action.payload,
                    date: new Date().toLocaleDateString(),
                    location: Intl.DateTimeFormat().resolvedOptions().timeZone,
                    gmt_time: Date.now(),
                    local_time: Date.now() + new Date().getTimezoneOffset() * 60000
                }

            case UPDATE_APPLICATION_SETTINGS_MAX_BOOTSTRAP_GRID_COLUMNS:
                return {
                    ...state,
                    grid_type: action.payload?.grid_type ?? state.grid_type
                }

            case UPDATE_APPLICATION_SETTINGS_DATE:
                return {
                    ...state,
                    date: new Date().toLocaleDateString()
                }

            case UPDATE_APPLICATION_SETTINGS_LOCATION:
                return {
                    ...state,
                    location: Intl.DateTimeFormat().resolvedOptions().timeZone
                }

            case UPDATE_APPLICATION_SETTINGS_GLOBAL_TIME:
                return {
                    ...state,
                    gmt_time: Date.now()
                }

            case UPDATE_APPLICATION_SETTINGS_LOCAL_TIME:
                return {
                    ...state,
                    local_time: Date.now() + new Date().getTimezoneOffset() * 60000
                }

            case UPDATE_APPLICATION_SETTINGS_FLAG:
                return {
                    ...state,
                    flag: action.payload?.flag ?? state.flag
                }

            case UPDATE_APPLICATION_SETTINGS_THEME:
                return {
                    ...state,
                    theme: action.payload?.theme ?? state.theme
                }

            case UPDATE_APPLICATION_SETTINGS_ALIGNMENT:
                return {
                    ...state,
                    alignment: action.payload?.alignment ?? state.alignment
                }

            case UPDATE_APPLICATION_SETTINGS_TEXT_ALIGNMENT:
                return {
                    ...state,
                    text_alignment: action.payload?.text_alignment ?? state.text_alignment
                }

            case UPDATE_APPLICATION_SETTINGS_NAV_LOCK:
                return {
                    ...state,
                    nav_lock: action.payload?.nav_lock ?? state.nav_lock
                }

            case UPDATE_APPLICATION_SETTINGS_NAV_SHOW:
                return {
                    ...state,
                    navbar_css_display_value: action.payload?.navbar_css_display_value ?? state.navbar_css_display_value
                }
        }
    }

    return {
        ...state,
        theme: state.theme ?? initial_state.theme,
        flag: state.flag ?? initial_state.flag,
        nav_lock: state.nav_lock ?? initial_state.nav_lock,
        text_alignment: state.text_alignment ?? initial_state.text_alignment,
        alignment: state.alignment ?? initial_state.alignment,
        navbar_css_display_value: state.navbar_css_display_value ?? initial_state.navbar_css_display_value,
        grid_type: state.grid_type ?? initial_state.grid_type
    }
}

export default Application_Settings_State_Reducer