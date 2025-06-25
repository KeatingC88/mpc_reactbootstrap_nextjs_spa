import {
    USERS_SERVER_ADDRESS,
    DEFAULT_HOST_ERROR_STATE,
    DEFAULT_NETWORK_ERROR_STATE,
    UPDATE_END_USER_ACCOUNT_NAME,
    UPDATE_END_USER_ACCOUNT_AVATAR,
    UPDATE_END_USER_ACCOUNT_AVATAR_TITLE,
    UPDATE_NETWORK_ERROR_STATE,
    UPDATE_APPLICATION_LANGUAGE_CURRENT_VALUE,
    UPDATE_APPLICATION_SETTINGS_FLAG,
    UPDATE_APPLICATION_SETTINGS_NAV_LOCK,
    UPDATE_APPLICATION_SETTINGS_THEME,
    UPDATE_APPLICATION_SETTINGS_ALIGNMENT,
    UPDATE_APPLICATION_SETTINGS_TEXT_ALIGNMENT,
    UPDATE_APPLICATION_SETTINGS_MAX_BOOTSTRAP_GRID_COLUMNS,
    UPDATE_END_USER_ACCOUNT_ONLINE_STATUS,
    UPDATE_END_USER_ACCOUNT_CUSTOM_LABEL,
    JWT_ISSUER_KEY,
    JWT_CLIENT_KEY,
    CLIENT_ADDRESS,
    NULL_END_USER_ACCOUNT_STATE,
    DEFAULT_APPLICATION_SETTINGS_MAX_BOOTSTRAP_GRID_COLUMNS,
    DEFAULT_APPLICATION_LANGUAGE_CURRENT_VALUE,
    DEFAULT_APPLICATION_SETTINGS_STATE,
    DEFAULT_CSS_CUSTOM_DESIGN_STATE,
    UPDATE_CSS_CUSTOM_DESIGN_CARD_HEADER_FONT,
    UPDATE_CSS_CUSTOM_DESIGN_CARD_HEADER_BACKGROUND_COLOR,
    UPDATE_CSS_CUSTOM_DESIGN_CARD_HEADER_FONT_COLOR,
    UPDATE_CSS_CUSTOM_DESIGN_CARD_BODY_FONT,
    UPDATE_CSS_CUSTOM_DESIGN_CARD_BODY_BACKGROUND_COLOR,
    UPDATE_CSS_CUSTOM_DESIGN_CARD_BODY_FONT_COLOR,
    UPDATE_CSS_CUSTOM_DESIGN_CARD_FOOTER_FONT,
    UPDATE_CSS_CUSTOM_DESIGN_CARD_FOOTER_BACKGROUND_COLOR,
    UPDATE_CSS_CUSTOM_DESIGN_CARD_FOOTER_FONT_COLOR,
    UPDATE_CSS_CUSTOM_DESIGN_NAVIGATION_MENU_BACKGROUND_COLOR,
    UPDATE_CSS_CUSTOM_DESIGN_NAVIGATION_MENU_FONT_COLOR,
    UPDATE_CSS_CUSTOM_DESIGN_NAVIGATION_MENU_FONT,
    UPDATE_CSS_CUSTOM_DESIGN_BUTTON_BACKGROUND_COLOR,
    UPDATE_CSS_CUSTOM_DESIGN_BUTTON_FONT_COLOR,
    UPDATE_CSS_CUSTOM_DESIGN_BUTTON_FONT,
    UPDATE_CSS_CUSTOM_DESIGN_CARD_BORDER_COLOR,
} from "@Constants"

import axios from 'axios'

import { Encrypt } from "@AES/Encryptor"

import {
    Get_Device_Information,
    Delay_Execution,
    Map_GUI_Values_For_Database_Storage,
    Get_Nation_Flag_Value
} from '@Redux_Thunk/Actions/Misc'

import type { Current_Redux_State } from '@Redux_Thunk/Combined_Reducers'

import type { AppDispatch } from '@Redux_Thunk/Provider'

export const Change_Application_Card_Border_Color = (value: string) => async (dispatch: AppDispatch, getState: () => Current_Redux_State) => {

    let state = getState()
    let end_user_account = state.End_User_Account_State_Reducer

    if (end_user_account.id !== null &&
        end_user_account.token !== null &&
        end_user_account.account_type !== null) {

        let current_language_state = state.Application_Language_State_Reducer

        await axios.put(`${USERS_SERVER_ADDRESS}/Selected/Card_Border_Color`, {
            card_border_color: await Encrypt(`${value}`),
            token: end_user_account.token,
            id: await Encrypt(`${end_user_account.id}`),
            account_type: await Encrypt(`${end_user_account.account_type}`),
            login_type: await Encrypt(`${end_user_account.login_type}`),
            language: await Encrypt(`${current_language_state.language}`),
            region: await Encrypt(`${current_language_state.region}`),
            client_time: await Encrypt(`${new Date().getTime() + (new Date().getTimezoneOffset() * 60000)}`),
            location: await Encrypt(`${Intl.DateTimeFormat().resolvedOptions().timeZone}`),
            jwt_issuer_key: await Encrypt(`${JWT_ISSUER_KEY}`),
            jwt_client_key: await Encrypt(`${JWT_CLIENT_KEY}`),
            jwt_client_address: await Encrypt(`${CLIENT_ADDRESS}`),
            user_agent: await Encrypt(`${Get_Device_Information().userAgent}`),
            orientation: await Encrypt(`${Get_Device_Information().orientation_type}`),
            screen_width: await Encrypt(`${Get_Device_Information().screen_width}`),
            screen_height: await Encrypt(`${Get_Device_Information().screen_height}`),
            color_depth: await Encrypt(`${Get_Device_Information().color_depth}`),
            pixel_depth: await Encrypt(`${Get_Device_Information().pixel_depth}`),
            window_width: await Encrypt(`${Get_Device_Information().window_width}`),
            window_height: await Encrypt(`${Get_Device_Information().window_height}`),
            connection_type: await Encrypt(`${Get_Device_Information().effectiveType}`),
            down_link: await Encrypt(`${Get_Device_Information().downlink}`),
            rtt: await Encrypt(`${Get_Device_Information().rtt}`),
            data_saver: await Encrypt(`${Get_Device_Information().saveData}`),
            device_ram_gb: await Encrypt(`${Get_Device_Information().deviceMemory}`),
        }).catch(async (error) => {

            return await new Promise((reject) => {
                error.id = `Selected-Card-Border-Color-Failed`
                dispatch({ type: UPDATE_NETWORK_ERROR_STATE, payload: error })
                setTimeout(() => {
                    dispatch({ type: DEFAULT_HOST_ERROR_STATE })
                    dispatch({ type: DEFAULT_NETWORK_ERROR_STATE })
                }, 1000)
                reject(error)
            })

        })

        return await new Promise((resolve) => {
            resolve(value)
            dispatch({ type: UPDATE_CSS_CUSTOM_DESIGN_CARD_BORDER_COLOR, payload: { card_border_color: value } })
        })
    }
}

export const Change_Application_Card_Header_Font = (value: string) => async (dispatch: AppDispatch, getState: () => Current_Redux_State) => {

    let state = getState()
    let end_user_account = state.End_User_Account_State_Reducer

    if (end_user_account.id !== null &&
        end_user_account.token !== null &&
        end_user_account.account_type !== null) {

        let current_language_state = state.Application_Language_State_Reducer

        await axios.put(`${USERS_SERVER_ADDRESS}/Selected/Card_Header_Font`, {
            card_header_font: await Encrypt(`${value}`),
            token: end_user_account.token,
            id: await Encrypt(`${end_user_account.id}`),
            account_type: await Encrypt(`${end_user_account.account_type}`),
            login_type: await Encrypt(`${end_user_account.login_type}`),
            language: await Encrypt(`${current_language_state.language}`),
            region: await Encrypt(`${current_language_state.region}`),
            client_time: await Encrypt(`${new Date().getTime() + (new Date().getTimezoneOffset() * 60000)}`),
            location: await Encrypt(`${Intl.DateTimeFormat().resolvedOptions().timeZone}`),
            jwt_issuer_key: await Encrypt(`${JWT_ISSUER_KEY}`),
            jwt_client_key: await Encrypt(`${JWT_CLIENT_KEY}`),
            jwt_client_address: await Encrypt(`${CLIENT_ADDRESS}`),
            user_agent: await Encrypt(`${Get_Device_Information().userAgent}`),
            orientation: await Encrypt(`${Get_Device_Information().orientation_type}`),
            screen_width: await Encrypt(`${Get_Device_Information().screen_width}`),
            screen_height: await Encrypt(`${Get_Device_Information().screen_height}`),
            color_depth: await Encrypt(`${Get_Device_Information().color_depth}`),
            pixel_depth: await Encrypt(`${Get_Device_Information().pixel_depth}`),
            window_width: await Encrypt(`${Get_Device_Information().window_width}`),
            window_height: await Encrypt(`${Get_Device_Information().window_height}`),
            connection_type: await Encrypt(`${Get_Device_Information().effectiveType}`),
            down_link: await Encrypt(`${Get_Device_Information().downlink}`),
            rtt: await Encrypt(`${Get_Device_Information().rtt}`),
            data_saver: await Encrypt(`${Get_Device_Information().saveData}`),
            device_ram_gb: await Encrypt(`${Get_Device_Information().deviceMemory}`),
        }).catch(async (error) => {

            return await new Promise((reject) => {
                error.id = ``
                dispatch({ type: UPDATE_NETWORK_ERROR_STATE, payload: error })
                setTimeout(() => {
                    dispatch({ type: DEFAULT_HOST_ERROR_STATE })
                    dispatch({ type: DEFAULT_NETWORK_ERROR_STATE })
                }, 1000)
                reject(error)
            })

        })

        return await new Promise((resolve) => {
            resolve(value)
            dispatch({ type: UPDATE_CSS_CUSTOM_DESIGN_CARD_HEADER_FONT, payload: { card_header_font: value } })
        })
    }
}

export const Change_Application_Card_Header_Background_Color = (value: string) => async (dispatch: AppDispatch, getState: () => Current_Redux_State) => {

    let state = getState()
    let end_user_account = state.End_User_Account_State_Reducer

    if (end_user_account.id !== null &&
        end_user_account.token !== null &&
        end_user_account.account_type !== null) {

        let current_language_state = state.Application_Language_State_Reducer

        await axios.put(`${USERS_SERVER_ADDRESS}/Selected/Card_Header_Background_Color`, {
            card_header_background_color: await Encrypt(`${value}`),
            token: end_user_account.token,
            id: await Encrypt(`${end_user_account.id}`),
            account_type: await Encrypt(`${end_user_account.account_type}`),
            login_type: await Encrypt(`${end_user_account.login_type}`),
            language: await Encrypt(`${current_language_state.language}`),
            region: await Encrypt(`${current_language_state.region}`),
            client_time: await Encrypt(`${new Date().getTime() + (new Date().getTimezoneOffset() * 60000)}`),
            location: await Encrypt(`${Intl.DateTimeFormat().resolvedOptions().timeZone}`),
            jwt_issuer_key: await Encrypt(`${JWT_ISSUER_KEY}`),
            jwt_client_key: await Encrypt(`${JWT_CLIENT_KEY}`),
            jwt_client_address: await Encrypt(`${CLIENT_ADDRESS}`),
            user_agent: await Encrypt(`${Get_Device_Information().userAgent}`),
            orientation: await Encrypt(`${Get_Device_Information().orientation_type}`),
            screen_width: await Encrypt(`${Get_Device_Information().screen_width}`),
            screen_height: await Encrypt(`${Get_Device_Information().screen_height}`),
            color_depth: await Encrypt(`${Get_Device_Information().color_depth}`),
            pixel_depth: await Encrypt(`${Get_Device_Information().pixel_depth}`),
            window_width: await Encrypt(`${Get_Device_Information().window_width}`),
            window_height: await Encrypt(`${Get_Device_Information().window_height}`),
            connection_type: await Encrypt(`${Get_Device_Information().effectiveType}`),
            down_link: await Encrypt(`${Get_Device_Information().downlink}`),
            rtt: await Encrypt(`${Get_Device_Information().rtt}`),
            data_saver: await Encrypt(`${Get_Device_Information().saveData}`),
            device_ram_gb: await Encrypt(`${Get_Device_Information().deviceMemory}`),
        }).catch( async (error) => {

            return await new Promise((reject) => {
                error.id = ``
                dispatch({ type: UPDATE_NETWORK_ERROR_STATE, payload: error })
                setTimeout(() => {
                    dispatch({ type: DEFAULT_HOST_ERROR_STATE })
                    dispatch({ type: DEFAULT_NETWORK_ERROR_STATE })
                }, 1000)
                reject(error)
            })

        })

        return await new Promise((resolve) => {
            resolve(value)
            dispatch({ type: UPDATE_CSS_CUSTOM_DESIGN_CARD_HEADER_BACKGROUND_COLOR, payload: { card_header_background_color: value } })
        })
    }
}

export const Change_Application_Card_Header_Font_Color = (value: string) => async (dispatch: AppDispatch, getState: () => Current_Redux_State) => {

    let state = getState()
    let end_user_account = state.End_User_Account_State_Reducer

    if (end_user_account.id !== null &&
        end_user_account.token !== null &&
        end_user_account.account_type !== null) {

        let current_language_state = state.Application_Language_State_Reducer

        await axios.put(`${USERS_SERVER_ADDRESS}/Selected/Card_Header_Font_Color`, {
            card_header_font_color: await Encrypt(`${value}`),
            token: end_user_account.token,
            id: await Encrypt(`${end_user_account.id}`),
            account_type: await Encrypt(`${end_user_account.account_type}`),
            login_type: await Encrypt(`${end_user_account.login_type}`),
            language: await Encrypt(`${current_language_state.language}`),
            region: await Encrypt(`${current_language_state.region}`),
            client_time: await Encrypt(`${new Date().getTime() + (new Date().getTimezoneOffset() * 60000)}`),
            location: await Encrypt(`${Intl.DateTimeFormat().resolvedOptions().timeZone}`),
            jwt_issuer_key: await Encrypt(`${JWT_ISSUER_KEY}`),
            jwt_client_key: await Encrypt(`${JWT_CLIENT_KEY}`),
            jwt_client_address: await Encrypt(`${CLIENT_ADDRESS}`),
            user_agent: await Encrypt(`${Get_Device_Information().userAgent}`),
            orientation: await Encrypt(`${Get_Device_Information().orientation_type}`),
            screen_width: await Encrypt(`${Get_Device_Information().screen_width}`),
            screen_height: await Encrypt(`${Get_Device_Information().screen_height}`),
            color_depth: await Encrypt(`${Get_Device_Information().color_depth}`),
            pixel_depth: await Encrypt(`${Get_Device_Information().pixel_depth}`),
            window_width: await Encrypt(`${Get_Device_Information().window_width}`),
            window_height: await Encrypt(`${Get_Device_Information().window_height}`),
            connection_type: await Encrypt(`${Get_Device_Information().effectiveType}`),
            down_link: await Encrypt(`${Get_Device_Information().downlink}`),
            rtt: await Encrypt(`${Get_Device_Information().rtt}`),
            data_saver: await Encrypt(`${Get_Device_Information().saveData}`),
            device_ram_gb: await Encrypt(`${Get_Device_Information().deviceMemory}`),
        }).catch( async (error) => {

            return await new Promise((reject) => {
                error.id = ``
                dispatch({ type: UPDATE_NETWORK_ERROR_STATE, payload: error })
                setTimeout(() => {
                    dispatch({ type: DEFAULT_HOST_ERROR_STATE })
                    dispatch({ type: DEFAULT_NETWORK_ERROR_STATE })
                }, 1000)
                reject(error)
            })

        })

        return await new Promise((resolve) => {
            resolve(value)
            dispatch({ type: UPDATE_CSS_CUSTOM_DESIGN_CARD_HEADER_FONT_COLOR, payload: { card_header_font_color: value } })
        })
    }
}

export const Change_Application_Card_Body_Font = (value: string) => async (dispatch: AppDispatch, getState: () => Current_Redux_State) => {

    let state = getState()
    let end_user_account = state.End_User_Account_State_Reducer

    if (end_user_account.id !== null &&
        end_user_account.token !== null &&
        end_user_account.account_type !== null) {

        let current_language_state = state.Application_Language_State_Reducer

        await axios.put(`${USERS_SERVER_ADDRESS}/Selected/Card_Body_Font`, {
            card_body_font: await Encrypt(`${value}`),
            token: end_user_account.token,
            id: await Encrypt(`${end_user_account.id}`),
            account_type: await Encrypt(`${end_user_account.account_type}`),
            login_type: await Encrypt(`${end_user_account.login_type}`),
            language: await Encrypt(`${current_language_state.language}`),
            region: await Encrypt(`${current_language_state.region}`),
            client_time: await Encrypt(`${new Date().getTime() + (new Date().getTimezoneOffset() * 60000)}`),
            location: await Encrypt(`${Intl.DateTimeFormat().resolvedOptions().timeZone}`),
            jwt_issuer_key: await Encrypt(`${JWT_ISSUER_KEY}`),
            jwt_client_key: await Encrypt(`${JWT_CLIENT_KEY}`),
            jwt_client_address: await Encrypt(`${CLIENT_ADDRESS}`),
            user_agent: await Encrypt(`${Get_Device_Information().userAgent}`),
            orientation: await Encrypt(`${Get_Device_Information().orientation_type}`),
            screen_width: await Encrypt(`${Get_Device_Information().screen_width}`),
            screen_height: await Encrypt(`${Get_Device_Information().screen_height}`),
            color_depth: await Encrypt(`${Get_Device_Information().color_depth}`),
            pixel_depth: await Encrypt(`${Get_Device_Information().pixel_depth}`),
            window_width: await Encrypt(`${Get_Device_Information().window_width}`),
            window_height: await Encrypt(`${Get_Device_Information().window_height}`),
            connection_type: await Encrypt(`${Get_Device_Information().effectiveType}`),
            down_link: await Encrypt(`${Get_Device_Information().downlink}`),
            rtt: await Encrypt(`${Get_Device_Information().rtt}`),
            data_saver: await Encrypt(`${Get_Device_Information().saveData}`),
            device_ram_gb: await Encrypt(`${Get_Device_Information().deviceMemory}`),
        }).catch( async (error) => {

            return await new Promise((reject) => {
                error.id = ``
                dispatch({ type: UPDATE_NETWORK_ERROR_STATE, payload: error })
                setTimeout(() => {
                    dispatch({ type: DEFAULT_HOST_ERROR_STATE })
                    dispatch({ type: DEFAULT_NETWORK_ERROR_STATE })
                }, 1000)
                reject(error)
            })

        })

        return await new Promise((resolve) => {
            resolve(value)
            dispatch({ type: UPDATE_CSS_CUSTOM_DESIGN_CARD_BODY_FONT, payload: { card_body_font: value } })
        })
    }
}

export const Change_Application_Card_Body_Background_Color = (value: string) => async (dispatch: AppDispatch, getState: () => Current_Redux_State) => {

    let state = getState()
    let end_user_account = state.End_User_Account_State_Reducer


    if (end_user_account.id !== null &&
        end_user_account.token !== null &&
        end_user_account.account_type !== null) {

        let current_language_state = state.Application_Language_State_Reducer

        await axios.put(`${USERS_SERVER_ADDRESS}/Selected/Card_Body_Background_Color`, {
            card_body_background_color: await Encrypt(`${value}`),
            token: end_user_account.token,
            id: await Encrypt(`${end_user_account.id}`),
            account_type: await Encrypt(`${end_user_account.account_type}`),
            login_type: await Encrypt(`${end_user_account.login_type}`),
            language: await Encrypt(`${current_language_state.language}`),
            region: await Encrypt(`${current_language_state.region}`),
            client_time: await Encrypt(`${new Date().getTime() + (new Date().getTimezoneOffset() * 60000)}`),
            location: await Encrypt(`${Intl.DateTimeFormat().resolvedOptions().timeZone}`),
            jwt_issuer_key: await Encrypt(`${JWT_ISSUER_KEY}`),
            jwt_client_key: await Encrypt(`${JWT_CLIENT_KEY}`),
            jwt_client_address: await Encrypt(`${CLIENT_ADDRESS}`),
            user_agent: await Encrypt(`${Get_Device_Information().userAgent}`),
            orientation: await Encrypt(`${Get_Device_Information().orientation_type}`),
            screen_width: await Encrypt(`${Get_Device_Information().screen_width}`),
            screen_height: await Encrypt(`${Get_Device_Information().screen_height}`),
            color_depth: await Encrypt(`${Get_Device_Information().color_depth}`),
            pixel_depth: await Encrypt(`${Get_Device_Information().pixel_depth}`),
            window_width: await Encrypt(`${Get_Device_Information().window_width}`),
            window_height: await Encrypt(`${Get_Device_Information().window_height}`),
            connection_type: await Encrypt(`${Get_Device_Information().effectiveType}`),
            down_link: await Encrypt(`${Get_Device_Information().downlink}`),
            rtt: await Encrypt(`${Get_Device_Information().rtt}`),
            data_saver: await Encrypt(`${Get_Device_Information().saveData}`),
            device_ram_gb: await Encrypt(`${Get_Device_Information().deviceMemory}`),
        }).catch( async (error) => {

            return await new Promise((reject) => {
                error.id = ``
                dispatch({ type: UPDATE_NETWORK_ERROR_STATE, payload: error })
                setTimeout(() => {
                    dispatch({ type: DEFAULT_HOST_ERROR_STATE })
                    dispatch({ type: DEFAULT_NETWORK_ERROR_STATE })
                }, 1000)
                reject(error)
            })

        })

        return await new Promise((resolve) => {
            resolve(value)
            dispatch({ type: UPDATE_CSS_CUSTOM_DESIGN_CARD_BODY_BACKGROUND_COLOR, payload: { card_body_background_color: value } })
        })
    }
}

export const Change_Application_Card_Body_Font_Color = (value: string) => async (dispatch: AppDispatch, getState: () => Current_Redux_State) => {

    let state = getState()
    let end_user_account = state.End_User_Account_State_Reducer

    if (end_user_account.id !== null &&
        end_user_account.token !== null &&
        end_user_account.account_type !== null) {

        let current_language_state = state.Application_Language_State_Reducer

        await axios.put(`${USERS_SERVER_ADDRESS}/Selected/Card_Body_Font_Color`, {
            card_body_font_color: await Encrypt(`${value}`),
            token: end_user_account.token,
            id: await Encrypt(`${end_user_account.id}`),
            account_type: await Encrypt(`${end_user_account.account_type}`),
            login_type: await Encrypt(`${end_user_account.login_type}`),
            language: await Encrypt(`${current_language_state.language}`),
            region: await Encrypt(`${current_language_state.region}`),
            client_time: await Encrypt(`${new Date().getTime() + (new Date().getTimezoneOffset() * 60000)}`),
            location: await Encrypt(`${Intl.DateTimeFormat().resolvedOptions().timeZone}`),
            jwt_issuer_key: await Encrypt(`${JWT_ISSUER_KEY}`),
            jwt_client_key: await Encrypt(`${JWT_CLIENT_KEY}`),
            jwt_client_address: await Encrypt(`${CLIENT_ADDRESS}`),
            user_agent: await Encrypt(`${Get_Device_Information().userAgent}`),
            orientation: await Encrypt(`${Get_Device_Information().orientation_type}`),
            screen_width: await Encrypt(`${Get_Device_Information().screen_width}`),
            screen_height: await Encrypt(`${Get_Device_Information().screen_height}`),
            color_depth: await Encrypt(`${Get_Device_Information().color_depth}`),
            pixel_depth: await Encrypt(`${Get_Device_Information().pixel_depth}`),
            window_width: await Encrypt(`${Get_Device_Information().window_width}`),
            window_height: await Encrypt(`${Get_Device_Information().window_height}`),
            connection_type: await Encrypt(`${Get_Device_Information().effectiveType}`),
            down_link: await Encrypt(`${Get_Device_Information().downlink}`),
            rtt: await Encrypt(`${Get_Device_Information().rtt}`),
            data_saver: await Encrypt(`${Get_Device_Information().saveData}`),
            device_ram_gb: await Encrypt(`${Get_Device_Information().deviceMemory}`),
        }).catch( async (error) => {

            return await new Promise((reject) => {
                error.id = ``
                dispatch({ type: UPDATE_NETWORK_ERROR_STATE, payload: error })
                setTimeout(() => {
                    dispatch({ type: DEFAULT_HOST_ERROR_STATE })
                    dispatch({ type: DEFAULT_NETWORK_ERROR_STATE })
                }, 1000)
                reject(error)
            })

        })

        return await new Promise((resolve) => {
            resolve(value)
            dispatch({ type: UPDATE_CSS_CUSTOM_DESIGN_CARD_BODY_FONT_COLOR, payload: { card_body_font_color: value } })
        })
    }
}

export const Change_Application_Card_Footer_Font = (value: string) => async (dispatch: AppDispatch, getState: () => Current_Redux_State) => {

    let state= getState()
    let end_user_account = state.End_User_Account_State_Reducer


    if (end_user_account.id !== null &&
        end_user_account.token !== null &&
        end_user_account.account_type !== null) {

        let current_language_state = state.Application_Language_State_Reducer

        await axios.put(`${USERS_SERVER_ADDRESS}/Selected/Card_Footer_Font`, {
            card_footer_font: await Encrypt(`${value}`),
            token: end_user_account.token,
            id: await Encrypt(`${end_user_account.id}`),
            account_type: await Encrypt(`${end_user_account.account_type}`),
            login_type: await Encrypt(`${end_user_account.login_type}`),
            language: await Encrypt(`${current_language_state.language}`),
            region: await Encrypt(`${current_language_state.region}`),
            client_time: await Encrypt(`${new Date().getTime() + (new Date().getTimezoneOffset() * 60000)}`),
            location: await Encrypt(`${Intl.DateTimeFormat().resolvedOptions().timeZone}`),
            jwt_issuer_key: await Encrypt(`${JWT_ISSUER_KEY}`),
            jwt_client_key: await Encrypt(`${JWT_CLIENT_KEY}`),
            jwt_client_address: await Encrypt(`${CLIENT_ADDRESS}`),
            user_agent: await Encrypt(`${Get_Device_Information().userAgent}`),
            orientation: await Encrypt(`${Get_Device_Information().orientation_type}`),
            screen_width: await Encrypt(`${Get_Device_Information().screen_width}`),
            screen_height: await Encrypt(`${Get_Device_Information().screen_height}`),
            color_depth: await Encrypt(`${Get_Device_Information().color_depth}`),
            pixel_depth: await Encrypt(`${Get_Device_Information().pixel_depth}`),
            window_width: await Encrypt(`${Get_Device_Information().window_width}`),
            window_height: await Encrypt(`${Get_Device_Information().window_height}`),
            connection_type: await Encrypt(`${Get_Device_Information().effectiveType}`),
            down_link: await Encrypt(`${Get_Device_Information().downlink}`),
            rtt: await Encrypt(`${Get_Device_Information().rtt}`),
            data_saver: await Encrypt(`${Get_Device_Information().saveData}`),
            device_ram_gb: await Encrypt(`${Get_Device_Information().deviceMemory}`),
        }).catch( async (error) => {

            return await new Promise((reject) => {
                error.id = ``
                dispatch({ type: UPDATE_NETWORK_ERROR_STATE, payload: error })
                setTimeout(() => {
                    dispatch({ type: DEFAULT_HOST_ERROR_STATE })
                    dispatch({ type: DEFAULT_NETWORK_ERROR_STATE })
                }, 1000)
                reject(error)
            })

        })

        return await new Promise((resolve) => {
            resolve(value)
            dispatch({ type: UPDATE_CSS_CUSTOM_DESIGN_CARD_FOOTER_FONT, payload: { card_footer_font: value } })
        })
    }
}

export const Change_Application_Card_Footer_Background_Color = (value: string) => async (dispatch: AppDispatch, getState: ()=> Current_Redux_State) => {

    let state = getState()
    let end_user_account = state.End_User_Account_State_Reducer

    if (end_user_account.id !== null &&
        end_user_account.token !== null &&
        end_user_account.account_type !== null) {

        let current_language_state = state.Application_Language_State_Reducer

        await axios.put(`${USERS_SERVER_ADDRESS}/Selected/Card_Footer_Background_Color`, {
            card_footer_background_color: await Encrypt(`${value}`),
            token: end_user_account.token,
            id: await Encrypt(`${end_user_account.id}`),
            account_type: await Encrypt(`${end_user_account.account_type}`),
            login_type: await Encrypt(`${end_user_account.login_type}`),
            language: await Encrypt(`${current_language_state.language}`),
            region: await Encrypt(`${current_language_state.region}`),
            client_time: await Encrypt(`${new Date().getTime() + (new Date().getTimezoneOffset() * 60000)}`),
            location: await Encrypt(`${Intl.DateTimeFormat().resolvedOptions().timeZone}`),
            jwt_issuer_key: await Encrypt(`${JWT_ISSUER_KEY}`),
            jwt_client_key: await Encrypt(`${JWT_CLIENT_KEY}`),
            jwt_client_address: await Encrypt(`${CLIENT_ADDRESS}`),
            user_agent: await Encrypt(`${Get_Device_Information().userAgent}`),
            orientation: await Encrypt(`${Get_Device_Information().orientation_type}`),
            screen_width: await Encrypt(`${Get_Device_Information().screen_width}`),
            screen_height: await Encrypt(`${Get_Device_Information().screen_height}`),
            color_depth: await Encrypt(`${Get_Device_Information().color_depth}`),
            pixel_depth: await Encrypt(`${Get_Device_Information().pixel_depth}`),
            window_width: await Encrypt(`${Get_Device_Information().window_width}`),
            window_height: await Encrypt(`${Get_Device_Information().window_height}`),
            connection_type: await Encrypt(`${Get_Device_Information().effectiveType}`),
            down_link: await Encrypt(`${Get_Device_Information().downlink}`),
            rtt: await Encrypt(`${Get_Device_Information().rtt}`),
            data_saver: await Encrypt(`${Get_Device_Information().saveData}`),
            device_ram_gb: await Encrypt(`${Get_Device_Information().deviceMemory}`),
        }).catch(async (error) => {

            return await new Promise((reject) => {
                error.id = ``
                dispatch({ type: UPDATE_NETWORK_ERROR_STATE, payload: error })
                setTimeout(() => {
                    dispatch({ type: DEFAULT_HOST_ERROR_STATE })
                    dispatch({ type: DEFAULT_NETWORK_ERROR_STATE })
                }, 1000)
                reject(error)
            })
        })

        return await new Promise((resolve) => {
            resolve(value)
            dispatch({ type: UPDATE_CSS_CUSTOM_DESIGN_CARD_FOOTER_BACKGROUND_COLOR, payload: { card_footer_background_color: value } })
        })
    }
}

export const Change_Application_Card_Footer_Font_Color = (value: string) => async (dispatch: AppDispatch, getState: () => Current_Redux_State) => {

    let state = getState()
    let end_user_account = state.End_User_Account_State_Reducer


    if (end_user_account.id !== null &&
        end_user_account.token !== null &&
        end_user_account.account_type !== null) {

        let current_language_state = state.Application_Language_State_Reducer

        await axios.put(`${USERS_SERVER_ADDRESS}/Selected/Card_Footer_Font_Color`, {
            card_footer_Font_color: await Encrypt(`${value}`),
            token: end_user_account.token,
            id: await Encrypt(`${end_user_account.id}`),
            account_type: await Encrypt(`${end_user_account.account_type}`),
            login_type: await Encrypt(`${end_user_account.login_type}`),
            language: await Encrypt(`${current_language_state.language}`),
            region: await Encrypt(`${current_language_state.region}`),
            client_time: await Encrypt(`${new Date().getTime() + (new Date().getTimezoneOffset() * 60000)}`),
            location: await Encrypt(`${Intl.DateTimeFormat().resolvedOptions().timeZone}`),
            jwt_issuer_key: await Encrypt(`${JWT_ISSUER_KEY}`),
            jwt_client_key: await Encrypt(`${JWT_CLIENT_KEY}`),
            jwt_client_address: await Encrypt(`${CLIENT_ADDRESS}`),
            user_agent: await Encrypt(`${Get_Device_Information().userAgent}`),
            orientation: await Encrypt(`${Get_Device_Information().orientation_type}`),
            screen_width: await Encrypt(`${Get_Device_Information().screen_width}`),
            screen_height: await Encrypt(`${Get_Device_Information().screen_height}`),
            color_depth: await Encrypt(`${Get_Device_Information().color_depth}`),
            pixel_depth: await Encrypt(`${Get_Device_Information().pixel_depth}`),
            window_width: await Encrypt(`${Get_Device_Information().window_width}`),
            window_height: await Encrypt(`${Get_Device_Information().window_height}`),
            connection_type: await Encrypt(`${Get_Device_Information().effectiveType}`),
            down_link: await Encrypt(`${Get_Device_Information().downlink}`),
            rtt: await Encrypt(`${Get_Device_Information().rtt}`),
            data_saver: await Encrypt(`${Get_Device_Information().saveData}`),
            device_ram_gb: await Encrypt(`${Get_Device_Information().deviceMemory}`),
        }).catch(async (error) => {

            return await new Promise((reject) => {
                error.id = ``
                dispatch({ type: UPDATE_NETWORK_ERROR_STATE, payload: error })
                setTimeout(() => {
                    dispatch({ type: DEFAULT_HOST_ERROR_STATE })
                    dispatch({ type: DEFAULT_NETWORK_ERROR_STATE })
                }, 1000)
                reject(error)
            })

        })

        return await new Promise((resolve) => {
            resolve(value)
            dispatch({ type: UPDATE_CSS_CUSTOM_DESIGN_CARD_FOOTER_FONT_COLOR, payload: { card_footer_font_color: value } })
        })
    }
}

export const Change_Application_Navigation_Menu_Background_Color = (value: string) => async (dispatch: AppDispatch, getState: () => Current_Redux_State) => {

    let state = getState()
    let end_user_account = state.End_User_Account_State_Reducer

    if (end_user_account.id !== null &&
        end_user_account.token !== null &&
        end_user_account.account_type !== null) {

        let current_language_state = state.Application_Language_State_Reducer

        await axios.put(`${USERS_SERVER_ADDRESS}/Selected/Navigation_Menu_Background_Color`, {
            navigation_menu_background_color: await Encrypt(`${value}`),
            token: end_user_account.token,
            id: await Encrypt(`${end_user_account.id}`),
            account_type: await Encrypt(`${end_user_account.account_type}`),
            login_type: await Encrypt(`${end_user_account.login_type}`),
            language: await Encrypt(`${current_language_state.language}`),
            region: await Encrypt(`${current_language_state.region}`),
            client_time: await Encrypt(`${new Date().getTime() + (new Date().getTimezoneOffset() * 60000)}`),
            location: await Encrypt(`${Intl.DateTimeFormat().resolvedOptions().timeZone}`),
            jwt_issuer_key: await Encrypt(`${JWT_ISSUER_KEY}`),
            jwt_client_key: await Encrypt(`${JWT_CLIENT_KEY}`),
            jwt_client_address: await Encrypt(`${CLIENT_ADDRESS}`),
            user_agent: await Encrypt(`${Get_Device_Information().userAgent}`),
            orientation: await Encrypt(`${Get_Device_Information().orientation_type}`),
            screen_width: await Encrypt(`${Get_Device_Information().screen_width}`),
            screen_height: await Encrypt(`${Get_Device_Information().screen_height}`),
            color_depth: await Encrypt(`${Get_Device_Information().color_depth}`),
            pixel_depth: await Encrypt(`${Get_Device_Information().pixel_depth}`),
            window_width: await Encrypt(`${Get_Device_Information().window_width}`),
            window_height: await Encrypt(`${Get_Device_Information().window_height}`),
            connection_type: await Encrypt(`${Get_Device_Information().effectiveType}`),
            down_link: await Encrypt(`${Get_Device_Information().downlink}`),
            rtt: await Encrypt(`${Get_Device_Information().rtt}`),
            data_saver: await Encrypt(`${Get_Device_Information().saveData}`),
            device_ram_gb: await Encrypt(`${Get_Device_Information().deviceMemory}`),
        }).catch(async (error) => {

            return await new Promise((reject) => {
                error.id = ``
                dispatch({ type: UPDATE_NETWORK_ERROR_STATE, payload: error })
                setTimeout(() => {
                    dispatch({ type: DEFAULT_HOST_ERROR_STATE })
                    dispatch({ type: DEFAULT_NETWORK_ERROR_STATE })
                }, 1000)
                reject(error)
            })

        })

        return await new Promise((resolve) => {
            resolve(value)
            dispatch({ type: UPDATE_CSS_CUSTOM_DESIGN_NAVIGATION_MENU_BACKGROUND_COLOR, payload: { navigation_menu_background_color: value } })
        })
    }
}

export const Change_Application_Navigation_Menu_Font_Color = (value: string) => async (dispatch: AppDispatch, getState: () => Current_Redux_State) => {

    let state = getState()
    let end_user_account = state.End_User_Account_State_Reducer

    if (end_user_account.id !== null &&
        end_user_account.token !== null &&
        end_user_account.account_type !== null) {

        let current_language_state = state.Application_Language_State_Reducer

        await axios.put(`${USERS_SERVER_ADDRESS}/Selected/Navigation_Menu_Font_Color`, {
            navigation_menu_font_color: await Encrypt(`${value}`),
            token: end_user_account.token,
            id: await Encrypt(`${end_user_account.id}`),
            account_type: await Encrypt(`${end_user_account.account_type}`),
            login_type: await Encrypt(`${end_user_account.login_type}`),
            language: await Encrypt(`${current_language_state.language}`),
            region: await Encrypt(`${current_language_state.region}`),
            client_time: await Encrypt(`${new Date().getTime() + (new Date().getTimezoneOffset() * 60000)}`),
            location: await Encrypt(`${Intl.DateTimeFormat().resolvedOptions().timeZone}`),
            jwt_issuer_key: await Encrypt(`${JWT_ISSUER_KEY}`),
            jwt_client_key: await Encrypt(`${JWT_CLIENT_KEY}`),
            jwt_client_address: await Encrypt(`${CLIENT_ADDRESS}`),
            user_agent: await Encrypt(`${Get_Device_Information().userAgent}`),
            orientation: await Encrypt(`${Get_Device_Information().orientation_type}`),
            screen_width: await Encrypt(`${Get_Device_Information().screen_width}`),
            screen_height: await Encrypt(`${Get_Device_Information().screen_height}`),
            color_depth: await Encrypt(`${Get_Device_Information().color_depth}`),
            pixel_depth: await Encrypt(`${Get_Device_Information().pixel_depth}`),
            window_width: await Encrypt(`${Get_Device_Information().window_width}`),
            window_height: await Encrypt(`${Get_Device_Information().window_height}`),
            connection_type: await Encrypt(`${Get_Device_Information().effectiveType}`),
            down_link: await Encrypt(`${Get_Device_Information().downlink}`),
            rtt: await Encrypt(`${Get_Device_Information().rtt}`),
            data_saver: await Encrypt(`${Get_Device_Information().saveData}`),
            device_ram_gb: await Encrypt(`${Get_Device_Information().deviceMemory}`),
        }).catch(async (error) => {

            return await new Promise((reject) => {
                error.id = ``
                dispatch({ type: UPDATE_NETWORK_ERROR_STATE, payload: error })
                setTimeout(() => {
                    dispatch({ type: DEFAULT_HOST_ERROR_STATE })
                    dispatch({ type: DEFAULT_NETWORK_ERROR_STATE })
                }, 1000)
                reject(error)
            })
        })

        return await new Promise((resolve) => {
            resolve(value)
            dispatch({ type: UPDATE_CSS_CUSTOM_DESIGN_NAVIGATION_MENU_FONT_COLOR, payload: { navigation_menu_font_color: value } })
        })
    }
}

export const Change_Application_Navigation_Menu_Font = (value: string) => async (dispatch: AppDispatch, getState: ()=> Current_Redux_State) => {

    let state = getState()
    let end_user_account = state.End_User_Account_State_Reducer

    if (end_user_account.id !== null &&
        end_user_account.token !== null &&
        end_user_account.account_type !== null) {

        let current_language_state = state.Application_Language_State_Reducer

        await axios.put(`${USERS_SERVER_ADDRESS}/Selected/Navigation_Menu_Font`, {
            navigation_menu_font: await Encrypt(`${value}`),
            token: end_user_account.token,
            id: await Encrypt(`${end_user_account.id}`),
            account_type: await Encrypt(`${end_user_account.account_type}`),
            login_type: await Encrypt(`${end_user_account.login_type}`),
            language: await Encrypt(`${current_language_state.language}`),
            region: await Encrypt(`${current_language_state.region}`),
            client_time: await Encrypt(`${new Date().getTime() + (new Date().getTimezoneOffset() * 60000)}`),
            location: await Encrypt(`${Intl.DateTimeFormat().resolvedOptions().timeZone}`),
            jwt_issuer_key: await Encrypt(`${JWT_ISSUER_KEY}`),
            jwt_client_key: await Encrypt(`${JWT_CLIENT_KEY}`),
            jwt_client_address: await Encrypt(`${CLIENT_ADDRESS}`),
            user_agent: await Encrypt(`${Get_Device_Information().userAgent}`),
            orientation: await Encrypt(`${Get_Device_Information().orientation_type}`),
            screen_width: await Encrypt(`${Get_Device_Information().screen_width}`),
            screen_height: await Encrypt(`${Get_Device_Information().screen_height}`),
            color_depth: await Encrypt(`${Get_Device_Information().color_depth}`),
            pixel_depth: await Encrypt(`${Get_Device_Information().pixel_depth}`),
            window_width: await Encrypt(`${Get_Device_Information().window_width}`),
            window_height: await Encrypt(`${Get_Device_Information().window_height}`),
            connection_type: await Encrypt(`${Get_Device_Information().effectiveType}`),
            down_link: await Encrypt(`${Get_Device_Information().downlink}`),
            rtt: await Encrypt(`${Get_Device_Information().rtt}`),
            data_saver: await Encrypt(`${Get_Device_Information().saveData}`),
            device_ram_gb: await Encrypt(`${Get_Device_Information().deviceMemory}`),
        }).catch( async (error) => {

            return await new Promise((reject) => {
                error.id = ``
                dispatch({ type: UPDATE_NETWORK_ERROR_STATE, payload: error })
                setTimeout(() => {
                    dispatch({ type: DEFAULT_HOST_ERROR_STATE })
                    dispatch({ type: DEFAULT_NETWORK_ERROR_STATE })
                }, 1000)
                reject(error)
            })
        })

        return await new Promise((resolve) => {
            resolve(value)
            dispatch({ type: UPDATE_CSS_CUSTOM_DESIGN_NAVIGATION_MENU_FONT, payload: { navigation_menu_font: value } })
        })
    }
}

export const Change_Application_Button_Background_Color = (value: string) => async (dispatch: AppDispatch, getState: ()=> Current_Redux_State) => {

    let state = getState()
    let end_user_account = state.End_User_Account_State_Reducer

    if (end_user_account.id !== null &&
        end_user_account.token !== null &&
        end_user_account.account_type !== null) {

        let current_language_state = state.Application_Language_State_Reducer

        await axios.put(`${USERS_SERVER_ADDRESS}/Selected/Button_Background_Color`, {
            button_background_color: await Encrypt(`${value}`),
            token: end_user_account.token,
            id: await Encrypt(`${end_user_account.id}`),
            account_type: await Encrypt(`${end_user_account.account_type}`),
            login_type: await Encrypt(`${end_user_account.login_type}`),
            language: await Encrypt(`${current_language_state.language}`),
            region: await Encrypt(`${current_language_state.region}`),
            client_time: await Encrypt(`${new Date().getTime() + (new Date().getTimezoneOffset() * 60000)}`),
            location: await Encrypt(`${Intl.DateTimeFormat().resolvedOptions().timeZone}`),
            jwt_issuer_key: await Encrypt(`${JWT_ISSUER_KEY}`),
            jwt_client_key: await Encrypt(`${JWT_CLIENT_KEY}`),
            jwt_client_address: await Encrypt(`${CLIENT_ADDRESS}`),
            user_agent: await Encrypt(`${Get_Device_Information().userAgent}`),
            orientation: await Encrypt(`${Get_Device_Information().orientation_type}`),
            screen_width: await Encrypt(`${Get_Device_Information().screen_width}`),
            screen_height: await Encrypt(`${Get_Device_Information().screen_height}`),
            color_depth: await Encrypt(`${Get_Device_Information().color_depth}`),
            pixel_depth: await Encrypt(`${Get_Device_Information().pixel_depth}`),
            window_width: await Encrypt(`${Get_Device_Information().window_width}`),
            window_height: await Encrypt(`${Get_Device_Information().window_height}`),
            connection_type: await Encrypt(`${Get_Device_Information().effectiveType}`),
            down_link: await Encrypt(`${Get_Device_Information().downlink}`),
            rtt: await Encrypt(`${Get_Device_Information().rtt}`),
            data_saver: await Encrypt(`${Get_Device_Information().saveData}`),
            device_ram_gb: await Encrypt(`${Get_Device_Information().deviceMemory}`),
        }).catch(async (error) => {

            return await new Promise((reject) => {
                error.id = ``
                dispatch({ type: UPDATE_NETWORK_ERROR_STATE, payload: error })
                setTimeout(() => {
                    dispatch({ type: DEFAULT_HOST_ERROR_STATE })
                    dispatch({ type: DEFAULT_NETWORK_ERROR_STATE })
                }, 1000)
                reject(error)
            })

        })

        return await new Promise((resolve) => {
            resolve(value)
            dispatch({ type: UPDATE_CSS_CUSTOM_DESIGN_BUTTON_BACKGROUND_COLOR, payload: { button_background_color: value } })
        })
    }
}

export const Change_Application_Button_Font_Color = (value: string) => async (dispatch: AppDispatch, getState: () => Current_Redux_State) => {

    let state = getState()
    let end_user_account = getState().End_User_Account_State_Reducer

    if (end_user_account.id !== null &&
        end_user_account.token !== null &&
        end_user_account.account_type !== null) {

        let current_language_state = state.Application_Language_State_Reducer

        await axios.put(`${USERS_SERVER_ADDRESS}/Selected/button_font_color`, {
            button_font_color: await Encrypt(`${value}`),
            token: end_user_account.token,
            id: await Encrypt(`${end_user_account.id}`),
            account_type: await Encrypt(`${end_user_account.account_type}`),
            login_type: await Encrypt(`${end_user_account.login_type}`),
            language: await Encrypt(`${current_language_state.language}`),
            region: await Encrypt(`${current_language_state.region}`),
            client_time: await Encrypt(`${new Date().getTime() + (new Date().getTimezoneOffset() * 60000)}`),
            location: await Encrypt(`${Intl.DateTimeFormat().resolvedOptions().timeZone}`),
            jwt_issuer_key: await Encrypt(`${JWT_ISSUER_KEY}`),
            jwt_client_key: await Encrypt(`${JWT_CLIENT_KEY}`),
            jwt_client_address: await Encrypt(`${CLIENT_ADDRESS}`),
            user_agent: await Encrypt(`${Get_Device_Information().userAgent}`),
            orientation: await Encrypt(`${Get_Device_Information().orientation_type}`),
            screen_width: await Encrypt(`${Get_Device_Information().screen_width}`),
            screen_height: await Encrypt(`${Get_Device_Information().screen_height}`),
            color_depth: await Encrypt(`${Get_Device_Information().color_depth}`),
            pixel_depth: await Encrypt(`${Get_Device_Information().pixel_depth}`),
            window_width: await Encrypt(`${Get_Device_Information().window_width}`),
            window_height: await Encrypt(`${Get_Device_Information().window_height}`),
            connection_type: await Encrypt(`${Get_Device_Information().effectiveType}`),
            down_link: await Encrypt(`${Get_Device_Information().downlink}`),
            rtt: await Encrypt(`${Get_Device_Information().rtt}`),
            data_saver: await Encrypt(`${Get_Device_Information().saveData}`),
            device_ram_gb: await Encrypt(`${Get_Device_Information().deviceMemory}`),
        }).catch(async (error) => {

            return await new Promise((reject) => {
                error.id = ``
                dispatch({ type: UPDATE_NETWORK_ERROR_STATE, payload: error })
                setTimeout(() => {
                    dispatch({ type: DEFAULT_HOST_ERROR_STATE })
                    dispatch({ type: DEFAULT_NETWORK_ERROR_STATE })
                }, 1000)
                reject(error)
            })

        })

        return await new Promise((resolve) => {
            resolve(value)
            dispatch({ type: UPDATE_CSS_CUSTOM_DESIGN_BUTTON_FONT_COLOR, payload: { button_font_color: value } })
        })
    }
}

export const Change_Application_Button_Font = (value: string) => async (dispatch: AppDispatch, getState: ()=> Current_Redux_State) => {

    let state = getState()
    let end_user_account = state.End_User_Account_State_Reducer

    if (end_user_account.id !== null &&
        end_user_account.token !== null &&
        end_user_account.account_type !== null) {

        let current_language_state = state.Application_Language_State_Reducer

        await axios.put(`${USERS_SERVER_ADDRESS}/Selected/Button_Font`, {
            button_font: await Encrypt(`${value}`),
            token: end_user_account.token,
            id: await Encrypt(`${end_user_account.id}`),
            account_type: await Encrypt(`${end_user_account.account_type}`),
            login_type: await Encrypt(`${end_user_account.login_type}`),
            language: await Encrypt(`${current_language_state.language}`),
            region: await Encrypt(`${current_language_state.region}`),
            client_time: await Encrypt(`${new Date().getTime() + (new Date().getTimezoneOffset() * 60000)}`),
            location: await Encrypt(`${Intl.DateTimeFormat().resolvedOptions().timeZone}`),
            jwt_issuer_key: await Encrypt(`${JWT_ISSUER_KEY}`),
            jwt_client_key: await Encrypt(`${JWT_CLIENT_KEY}`),
            jwt_client_address: await Encrypt(`${CLIENT_ADDRESS}`),
            user_agent: await Encrypt(`${Get_Device_Information().userAgent}`),
            orientation: await Encrypt(`${Get_Device_Information().orientation_type}`),
            screen_width: await Encrypt(`${Get_Device_Information().screen_width}`),
            screen_height: await Encrypt(`${Get_Device_Information().screen_height}`),
            color_depth: await Encrypt(`${Get_Device_Information().color_depth}`),
            pixel_depth: await Encrypt(`${Get_Device_Information().pixel_depth}`),
            window_width: await Encrypt(`${Get_Device_Information().window_width}`),
            window_height: await Encrypt(`${Get_Device_Information().window_height}`),
            connection_type: await Encrypt(`${Get_Device_Information().effectiveType}`),
            down_link: await Encrypt(`${Get_Device_Information().downlink}`),
            rtt: await Encrypt(`${Get_Device_Information().rtt}`),
            data_saver: await Encrypt(`${Get_Device_Information().saveData}`),
            device_ram_gb: await Encrypt(`${Get_Device_Information().deviceMemory}`),
        }).catch( async (error) => {

            return await new Promise((reject) => {
                error.id = ``
                dispatch({ type: UPDATE_NETWORK_ERROR_STATE, payload: error })
                setTimeout(() => {
                    dispatch({ type: DEFAULT_HOST_ERROR_STATE })
                    dispatch({ type: DEFAULT_NETWORK_ERROR_STATE })
                }, 1000)
                reject(error)
            })

        })

        return await new Promise((resolve) => {
            resolve(value)
            dispatch({ type: UPDATE_CSS_CUSTOM_DESIGN_BUTTON_FONT, payload: { button_font: value } })
        })
    }
}

export const Change_Application_Theme_Default_Settings = () => async (dispatch: AppDispatch, getState: () => Current_Redux_State) => {

    let state = getState()
    let end_user_account = state.End_User_Account_State_Reducer

    if (end_user_account.id !== null &&
        end_user_account.token !== null &&
        end_user_account.account_type !== null) {

        let current_language_state = state.Application_Language_State_Reducer

        await axios.put(`${USERS_SERVER_ADDRESS}/Selected/Theme_Default_Settings`, {//.... check back end
            token: end_user_account.token,
            id: await Encrypt(`${end_user_account.id}`),
            account_type: await Encrypt(`${end_user_account.account_type}`),
            login_type: await Encrypt(`${end_user_account.login_type}`),
            language: await Encrypt(`${current_language_state.language}`),
            region: await Encrypt(`${current_language_state.region}`),
            client_time: await Encrypt(`${new Date().getTime() + (new Date().getTimezoneOffset() * 60000)}`),
            location: await Encrypt(`${Intl.DateTimeFormat().resolvedOptions().timeZone}`),
            jwt_issuer_key: await Encrypt(`${JWT_ISSUER_KEY}`),
            jwt_client_key: await Encrypt(`${JWT_CLIENT_KEY}`),
            jwt_client_address: await Encrypt(`${CLIENT_ADDRESS}`),
            user_agent: await Encrypt(`${Get_Device_Information().userAgent}`),
            orientation: await Encrypt(`${Get_Device_Information().orientation_type}`),
            screen_width: await Encrypt(`${Get_Device_Information().screen_width}`),
            screen_height: await Encrypt(`${Get_Device_Information().screen_height}`),
            color_depth: await Encrypt(`${Get_Device_Information().color_depth}`),
            pixel_depth: await Encrypt(`${Get_Device_Information().pixel_depth}`),
            window_width: await Encrypt(`${Get_Device_Information().window_width}`),
            window_height: await Encrypt(`${Get_Device_Information().window_height}`),
            connection_type: await Encrypt(`${Get_Device_Information().effectiveType}`),
            down_link: await Encrypt(`${Get_Device_Information().downlink}`),
            rtt: await Encrypt(`${Get_Device_Information().rtt}`),
            data_saver: await Encrypt(`${Get_Device_Information().saveData}`),
            device_ram_gb: await Encrypt(`${Get_Device_Information().deviceMemory}`),
        }).catch(async (error) => {

            return await new Promise((reject) => {
                error.id = ``
                dispatch({ type: UPDATE_NETWORK_ERROR_STATE, payload: error })
                setTimeout(() => {
                    dispatch({ type: DEFAULT_HOST_ERROR_STATE })
                    dispatch({ type: DEFAULT_NETWORK_ERROR_STATE })
                }, 1000)
                reject(error)
            })

        })

        return await new Promise((resolve) => {
            dispatch({ type: DEFAULT_CSS_CUSTOM_DESIGN_STATE })
            resolve(true)
        })
    }
}

export const Alternate_Application_Grid_Value = (value: number) => async (dispatch: AppDispatch, getState: () => Current_Redux_State) => {

    let state = getState()
    let end_user_account = state.End_User_Account_State_Reducer

    if (end_user_account.id !== null &&
        end_user_account.token !== null &&
        end_user_account.account_type !== null) {

        let current_language_state = state.Application_Language_State_Reducer

        await axios.put(`${USERS_SERVER_ADDRESS}/Selected/Grid`, {
            grid: await Encrypt(`${value}`),
            token: end_user_account.token,
            id: await Encrypt(`${end_user_account.id}`),
            account_type: await Encrypt(`${end_user_account.account_type}`),
            login_type: await Encrypt(`${end_user_account.login_type}`),
            language: await Encrypt(`${current_language_state.language}`),
            region: await Encrypt(`${current_language_state.region}`),
            client_time: await Encrypt(`${new Date().getTime() + (new Date().getTimezoneOffset() * 60000)}`),
            location: await Encrypt(`${Intl.DateTimeFormat().resolvedOptions().timeZone}`),
            jwt_issuer_key: await Encrypt(`${JWT_ISSUER_KEY}`),
            jwt_client_key: await Encrypt(`${JWT_CLIENT_KEY}`),
            jwt_client_address: await Encrypt(`${CLIENT_ADDRESS}`),
            user_agent: await Encrypt(`${Get_Device_Information().userAgent}`),
            orientation: await Encrypt(`${Get_Device_Information().orientation_type}`),
            screen_width: await Encrypt(`${Get_Device_Information().screen_width}`),
            screen_height: await Encrypt(`${Get_Device_Information().screen_height}`),
            color_depth: await Encrypt(`${Get_Device_Information().color_depth}`),
            pixel_depth: await Encrypt(`${Get_Device_Information().pixel_depth}`),
            window_width: await Encrypt(`${Get_Device_Information().window_width}`),
            window_height: await Encrypt(`${Get_Device_Information().window_height}`),
            connection_type: await Encrypt(`${Get_Device_Information().effectiveType}`),
            down_link: await Encrypt(`${Get_Device_Information().downlink}`),
            rtt: await Encrypt(`${Get_Device_Information().rtt}`),
            data_saver: await Encrypt(`${Get_Device_Information().saveData}`),
            device_ram_gb: await Encrypt(`${Get_Device_Information().deviceMemory}`),
        }).catch( async (error) => {

            return await new Promise((reject) => {
                error.id = `Selected-Grid-Failed`
                dispatch({ type: UPDATE_NETWORK_ERROR_STATE, payload: error })
                setTimeout(() => {
                    dispatch({ type: DEFAULT_HOST_ERROR_STATE })
                    dispatch({ type: DEFAULT_NETWORK_ERROR_STATE })
                }, 1000)
                reject(error)
            })

        })
    }

    return await new Promise((resolve) => {
        dispatch({ type: UPDATE_APPLICATION_SETTINGS_MAX_BOOTSTRAP_GRID_COLUMNS, payload: { grid_type: value } })
        resolve(value)
    })
}

export const Alternate_Application_Display_Alignment_Value = (value: string | number) => async (dispatch: AppDispatch, getState: () => Current_Redux_State) => {

    let state = getState()
    let end_user_account = state.End_User_Account_State_Reducer

    if (end_user_account.id !== null &&
        end_user_account.token !== null &&
        end_user_account.account_type !== null) {

        let alignment_values = await Map_GUI_Values_For_Database_Storage({
            alignment: value,
            text_alignment: value
        })

        let current_language_state = state.Application_Language_State_Reducer

        await axios.put(`${USERS_SERVER_ADDRESS}/Selected/Alignment`, {
            alignment: await Encrypt(`${alignment_values.alignment}`),
            token: end_user_account.token,
            id: await Encrypt(`${end_user_account.id}`),
            account_type: await Encrypt(`${end_user_account.account_type}`),
            login_type: await Encrypt(`${end_user_account.login_type}`),
            language: await Encrypt(`${current_language_state.language}`),
            region: await Encrypt(`${current_language_state.region}`),
            client_time: await Encrypt(`${new Date().getTime() + (new Date().getTimezoneOffset() * 60000)}`),
            location: await Encrypt(`${Intl.DateTimeFormat().resolvedOptions().timeZone}`),
            jwt_issuer_key: await Encrypt(`${JWT_ISSUER_KEY}`),
            jwt_client_key: await Encrypt(`${JWT_CLIENT_KEY}`),
            jwt_client_address: await Encrypt(`${CLIENT_ADDRESS}`),
            user_agent: await Encrypt(`${Get_Device_Information().userAgent}`),
            orientation: await Encrypt(`${Get_Device_Information().orientation_type}`),
            screen_width: await Encrypt(`${Get_Device_Information().screen_width}`),
            screen_height: await Encrypt(`${Get_Device_Information().screen_height}`),
            color_depth: await Encrypt(`${Get_Device_Information().color_depth}`),
            pixel_depth: await Encrypt(`${Get_Device_Information().pixel_depth}`),
            window_width: await Encrypt(`${Get_Device_Information().window_width}`),
            window_height: await Encrypt(`${Get_Device_Information().window_height}`),
            connection_type: await Encrypt(`${Get_Device_Information().effectiveType}`),
            down_link: await Encrypt(`${Get_Device_Information().downlink}`),
            rtt: await Encrypt(`${Get_Device_Information().rtt}`),
            data_saver: await Encrypt(`${Get_Device_Information().saveData}`),
            device_ram_gb: await Encrypt(`${Get_Device_Information().deviceMemory}`),
        }).catch(async (error) => {

            return await new Promise((reject) => {
                error.id = `Selected-Alignment-Failed`
                dispatch({ type: UPDATE_NETWORK_ERROR_STATE, payload: error })
                setTimeout(() => {
                    dispatch({ type: DEFAULT_HOST_ERROR_STATE })
                    dispatch({ type: DEFAULT_NETWORK_ERROR_STATE })
                }, 1000)
                reject(error)
            })

        })
    }

    switch (value) {
        case 0:
            value = `justify-content-start`
            break
        case 1:
            value = `justify-content-center`
            break
        case 2:
            value = `justify-content-end`
            break
        default:
    }

    return await new Promise((resolve) => {
        dispatch({ type: UPDATE_APPLICATION_SETTINGS_MAX_BOOTSTRAP_GRID_COLUMNS, payload: { grid_type: 1 } })
        dispatch({ type: UPDATE_APPLICATION_SETTINGS_ALIGNMENT, payload: { alignment: value } })
        resolve(value)
    })
}

export const Alternate_Application_Display_Text_Alignment_Value = (value: string) => async (dispatch: AppDispatch, getState: () => Current_Redux_State) => {

    let state = getState()
    let end_user_account = state.End_User_Account_State_Reducer

    if (end_user_account.id !== null &&
        end_user_account.token !== null &&
        end_user_account.account_type !== null) {

        let dto = {}

        Object.assign(dto, {
            text_alignment: value
        })

        let current_language_state = state.Application_Language_State_Reducer

        await axios.put(`${USERS_SERVER_ADDRESS}/Selected/Text_Alignment`, {
            text_alignment: await Encrypt(`${value}`),
            token: end_user_account.token,
            id: await Encrypt(`${end_user_account.id}`),
            account_type: await Encrypt(`${end_user_account.account_type}`),
            login_type: await Encrypt(`${end_user_account.login_type}`),
            language: await Encrypt(`${current_language_state.language}`),
            region: await Encrypt(`${current_language_state.region}`),
            client_time: await Encrypt(`${new Date().getTime() + (new Date().getTimezoneOffset() * 60000)}`),
            location: await Encrypt(`${Intl.DateTimeFormat().resolvedOptions().timeZone}`),
            jwt_issuer_key: await Encrypt(`${JWT_ISSUER_KEY}`),
            jwt_client_key: await Encrypt(`${JWT_CLIENT_KEY}`),
            jwt_client_address: await Encrypt(`${CLIENT_ADDRESS}`),
            user_agent: await Encrypt(`${Get_Device_Information().userAgent}`),
            orientation: await Encrypt(`${Get_Device_Information().orientation_type}`),
            screen_width: await Encrypt(`${Get_Device_Information().screen_width}`),
            screen_height: await Encrypt(`${Get_Device_Information().screen_height}`),
            color_depth: await Encrypt(`${Get_Device_Information().color_depth}`),
            pixel_depth: await Encrypt(`${Get_Device_Information().pixel_depth}`),
            window_width: await Encrypt(`${Get_Device_Information().window_width}`),
            window_height: await Encrypt(`${Get_Device_Information().window_height}`), 
            connection_type: await Encrypt(`${Get_Device_Information().effectiveType}`),
            down_link: await Encrypt(`${Get_Device_Information().downlink}`),
            rtt: await Encrypt(`${Get_Device_Information().rtt}`),
            data_saver: await Encrypt(`${Get_Device_Information().saveData}`),
            device_ram_gb: await Encrypt(`${Get_Device_Information().deviceMemory}`),
        }).catch(async (error) => {

            return await new Promise((reject) => {
                error.id = `Selected-Text-Alignment-Failed`
                dispatch({ type: UPDATE_NETWORK_ERROR_STATE, payload: error })
                setTimeout(() => {
                    dispatch({ type: DEFAULT_HOST_ERROR_STATE })
                    dispatch({ type: DEFAULT_NETWORK_ERROR_STATE })
                }, 1000)
                reject(error)
            })

        })
    }

    switch (parseInt(value)) {
        case 0:
            value = `text-start`
            break
        case 1:
            value = `text-center`
            break
        case 2:
            value = `text-end`
            break
        default:
    }

    return await new Promise(() => {
        dispatch({ type: UPDATE_APPLICATION_SETTINGS_TEXT_ALIGNMENT, payload: { text_alignment: value } })
    })
}

export const Alternate_Application_Theme_Value = (value: number) => async (dispatch: AppDispatch, getState: ()=> Current_Redux_State) => {

    let state = getState()
    let end_user_account = state.End_User_Account_State_Reducer
    let current_language_state = state.Application_Language_State_Reducer

    if (end_user_account.id !== null &&
        end_user_account.token !== null &&
        end_user_account.account_type !== null) {

        await axios.put(`${USERS_SERVER_ADDRESS}/Selected/Theme`, {
            theme: await Encrypt(`${value}`),
            token: end_user_account.token,
            id: await Encrypt(`${end_user_account.id}`),
            account_type: await Encrypt(`${end_user_account.account_type}`),
            login_type: await Encrypt(`${end_user_account.login_type}`),
            language: await Encrypt(`${current_language_state.language}`),
            region: await Encrypt(`${current_language_state.region}`),
            client_time: await Encrypt(`${new Date().getTime() + (new Date().getTimezoneOffset() * 60000)}`),
            location: await Encrypt(`${Intl.DateTimeFormat().resolvedOptions().timeZone}`),
            jwt_issuer_key: await Encrypt(`${JWT_ISSUER_KEY}`),
            jwt_client_key: await Encrypt(`${JWT_CLIENT_KEY}`),
            jwt_client_address: await Encrypt(`${CLIENT_ADDRESS}`),
            user_agent: await Encrypt(`${Get_Device_Information().userAgent}`),
            orientation: await Encrypt(`${Get_Device_Information().orientation_type}`),
            screen_width: await Encrypt(`${Get_Device_Information().screen_width}`),
            screen_height: await Encrypt(`${Get_Device_Information().screen_height}`),
            color_depth: await Encrypt(`${Get_Device_Information().color_depth}`),
            pixel_depth: await Encrypt(`${Get_Device_Information().pixel_depth}`),
            window_width: await Encrypt(`${Get_Device_Information().window_width}`),
            window_height: await Encrypt(`${Get_Device_Information().window_height}`),
            connection_type: await Encrypt(`${Get_Device_Information().effectiveType}`),
            down_link: await Encrypt(`${Get_Device_Information().downlink}`),
            rtt: await Encrypt(`${Get_Device_Information().rtt}`),
            data_saver: await Encrypt(`${Get_Device_Information().saveData}`),
            device_ram_gb: await Encrypt(`${Get_Device_Information().deviceMemory}`),
        }).catch( async (error) => {

            return await new Promise((reject) => {
                error.id = `Selected-Theme-Failed`
                dispatch({ type: UPDATE_NETWORK_ERROR_STATE, payload: error })
                setTimeout(() => {
                    dispatch({ type: DEFAULT_HOST_ERROR_STATE })
                    dispatch({ type: DEFAULT_NETWORK_ERROR_STATE })
                }, 1000)
                reject(error)
            })

        })

    }

    switch (value) {
        case 0:
            document.body.setAttribute('data-theme', 'Light-Theme')
            break
        case 1:
            document.body.setAttribute('data-theme', 'Night-Theme')
            break
/*        case 2:
            document.body.setAttribute(`data-theme`, `User-Theme`)*/
    }

    return await new Promise(() => {
        dispatch({ type: UPDATE_APPLICATION_SETTINGS_THEME, payload: { theme: value } })
    })
}

export const Change_Application_Language = (value: string) => async (dispatch: AppDispatch, getState: () => Current_Redux_State) => {

    let state = getState()
    let end_user_account = state.End_User_Account_State_Reducer

    if (end_user_account.id !== null &&
        end_user_account.token !== null &&
        end_user_account.account_type !== null) {

        let current_language_state = state.Application_Language_State_Reducer

        let dto = {
            language: null,
            region: null
        }

        Object.assign(dto, {
            language: value.split(`-`)[0],
            region: value.split(`-`)[1],
        })

        await axios.put(`${USERS_SERVER_ADDRESS}/Selected/Language`, {
            token: end_user_account.token,
            id: await Encrypt(`${end_user_account.id}`),
            account_type: await Encrypt(`${end_user_account.account_type}`),
            login_type: await Encrypt(`${end_user_account.login_type}`),
            language: await Encrypt(`${dto.language}`),
            region: await Encrypt(`${dto.region}`),
            client_time: await Encrypt(`${new Date().getTime() + (new Date().getTimezoneOffset() * 60000)}`),
            location: await Encrypt(`${Intl.DateTimeFormat().resolvedOptions().timeZone}`),
            jwt_issuer_key: await Encrypt(`${JWT_ISSUER_KEY}`),
            jwt_client_key: await Encrypt(`${JWT_CLIENT_KEY}`),
            jwt_client_address: await Encrypt(`${CLIENT_ADDRESS}`),
            user_agent: await Encrypt(`${Get_Device_Information().userAgent}`),
            orientation: await Encrypt(`${Get_Device_Information().orientation_type}`),
            screen_width: await Encrypt(`${Get_Device_Information().screen_width}`),
            screen_height: await Encrypt(`${Get_Device_Information().screen_height}`),
            color_depth: await Encrypt(`${Get_Device_Information().color_depth}`),
            pixel_depth: await Encrypt(`${Get_Device_Information().pixel_depth}`),
            window_width: await Encrypt(`${Get_Device_Information().window_width}`),
            window_height: await Encrypt(`${Get_Device_Information().window_height}`),
            connection_type: await Encrypt(`${Get_Device_Information().effectiveType}`),
            down_link: await Encrypt(`${Get_Device_Information().downlink}`),
            rtt: await Encrypt(`${Get_Device_Information().rtt}`),
            data_saver: await Encrypt(`${Get_Device_Information().saveData}`),
            device_ram_gb: await Encrypt(`${Get_Device_Information().deviceMemory}`),
        }).catch(async (error) => {
            return await new Promise((reject) => {
                error.id = `Selected-Language-Failed`
                dispatch({ type: UPDATE_NETWORK_ERROR_STATE, payload: error })
                setTimeout(() => {
                    dispatch({ type: DEFAULT_HOST_ERROR_STATE })
                    dispatch({ type: DEFAULT_NETWORK_ERROR_STATE })
                }, 1000)
                reject(error.id)
            })
        })
    }

    return await new Promise((resolve) => {
        resolve(value)
        dispatch({ type: UPDATE_APPLICATION_LANGUAGE_CURRENT_VALUE, payload: { current_language: value } })
    })
}

export const Change_Application_Flag = (value: string) => async (dispatch: AppDispatch) => {
    return await new Promise((resolve) => {
        dispatch({ type: UPDATE_APPLICATION_SETTINGS_FLAG, payload: { flag: Get_Nation_Flag_Value(value) } })
        resolve(value)
    })
}
export interface Change_Password_DTO {
    id: BigInt | null
    language: string
    region: string
    token: string | null
    password: string
    new_password: string
}

export const Change_Password = (dto: Change_Password_DTO) => async (dispatch: AppDispatch, getState: () => Current_Redux_State) => {
    
    let end_user_account = getState().End_User_Account_State_Reducer

    await axios.put(`${USERS_SERVER_ADDRESS}/Selected/Password`, {
        password: await Encrypt(dto.password),
        new_password: await Encrypt(dto.new_password),
        token: end_user_account.token,
        id: await Encrypt(`${end_user_account.id}`),
        account_type: await Encrypt(`${end_user_account.account_type}`),
        login_type: await Encrypt(`${end_user_account.login_type}`),
        language: await Encrypt(`${dto.language}`),
        region: await Encrypt(`${dto.region}`),
        client_time: await Encrypt(`${new Date().getTime() + (new Date().getTimezoneOffset() * 60000)}`),
        location: await Encrypt(`${Intl.DateTimeFormat().resolvedOptions().timeZone}`),
        jwt_issuer_key: await Encrypt(`${JWT_ISSUER_KEY}`),
        jwt_client_key: await Encrypt(`${JWT_CLIENT_KEY}`),
        jwt_client_address: await Encrypt(`${CLIENT_ADDRESS}`),
        user_agent: await Encrypt(`${Get_Device_Information().userAgent}`),
        orientation: await Encrypt(`${Get_Device_Information().orientation_type}`),
        screen_width: await Encrypt(`${Get_Device_Information().screen_width}`),
        screen_height: await Encrypt(`${Get_Device_Information().screen_height}`),
        color_depth: await Encrypt(`${Get_Device_Information().color_depth}`),
        pixel_depth: await Encrypt(`${Get_Device_Information().pixel_depth}`),
        window_width: await Encrypt(`${Get_Device_Information().window_width}`),
        window_height: await Encrypt(`${Get_Device_Information().window_height}`),
        connection_type: await Encrypt(`${Get_Device_Information().effectiveType}`),
        down_link: await Encrypt(`${Get_Device_Information().downlink}`),
        rtt: await Encrypt(`${Get_Device_Information().rtt}`),
        data_saver: await Encrypt(`${Get_Device_Information().saveData}`),
        device_ram_gb: await Encrypt(`${Get_Device_Information().deviceMemory}`),
    }).catch( async (error) => {
        return await new Promise(() => {
            error.id = `Selected-Password-Failed`
            dispatch({ type: UPDATE_NETWORK_ERROR_STATE, payload: error })
            setTimeout(() => {
                dispatch({ type: DEFAULT_HOST_ERROR_STATE })
                dispatch({ type: DEFAULT_NETWORK_ERROR_STATE })
            }, 1000)
        })
    })
}
export interface Delete_User_DTO {
    target_user: BigInt | null
    password: string
}

export const Delete_User = (dto: Delete_User_DTO) => async (dispatch: AppDispatch, getState: () => Current_Redux_State) => {

    let state = getState()
    let end_user_account = state.End_User_Account_State_Reducer

    if (end_user_account.id !== null &&
        end_user_account.token !== null &&
        end_user_account.account_type !== null) {

        let current_language_state = state.Application_Language_State_Reducer

        await axios.post(`${USERS_SERVER_ADDRESS}/Delete/User`, {
            target_user: await Encrypt(`${dto.target_user}`),
            password: await Encrypt(`${dto.password}`),
            token: end_user_account.token,
            id: await Encrypt(`${end_user_account.id}`),
            account_type: await Encrypt(`${end_user_account.account_type}`),
            login_type: await Encrypt(`${end_user_account.login_type}`),
            language: await Encrypt(`${current_language_state.language}`),
            region: await Encrypt(`${current_language_state.region}`),
            client_time: await Encrypt(`${new Date().getTime() + (new Date().getTimezoneOffset() * 60000)}`),
            location: await Encrypt(`${Intl.DateTimeFormat().resolvedOptions().timeZone}`),
            jwt_issuer_key: await Encrypt(`${JWT_ISSUER_KEY}`),
            jwt_client_key: await Encrypt(`${JWT_CLIENT_KEY}`),
            jwt_client_address: await Encrypt(`${CLIENT_ADDRESS}`),
            user_agent: await Encrypt(`${Get_Device_Information().userAgent}`),
            orientation: await Encrypt(`${Get_Device_Information().orientation_type}`),
            screen_width: await Encrypt(`${Get_Device_Information().screen_width}`),
            screen_height: await Encrypt(`${Get_Device_Information().screen_height}`),
            color_depth: await Encrypt(`${Get_Device_Information().color_depth}`),
            pixel_depth: await Encrypt(`${Get_Device_Information().pixel_depth}`),
            window_width: await Encrypt(`${Get_Device_Information().window_width}`),
            window_height: await Encrypt(`${Get_Device_Information().window_height}`),
            connection_type: await Encrypt(`${Get_Device_Information().effectiveType}`),
            down_link: await Encrypt(`${Get_Device_Information().downlink}`),
            rtt: await Encrypt(`${Get_Device_Information().rtt}`),
            data_saver: await Encrypt(`${Get_Device_Information().saveData}`),
            device_ram_gb: await Encrypt(`${Get_Device_Information().deviceMemory}`),
        }).catch( async (error) => {
            return await new Promise(async (reject) => {
                error.id = `Delete-User-Failed`
                dispatch({ type: UPDATE_NETWORK_ERROR_STATE, payload: error })
                setTimeout(() => {
                    dispatch({ type: DEFAULT_HOST_ERROR_STATE })
                    dispatch({ type: DEFAULT_NETWORK_ERROR_STATE })
                }, 1000)
                reject(error)
            })
        }).then( async () => {
            return await new Promise( async (resolve) => {
                dispatch({ type: DEFAULT_APPLICATION_SETTINGS_MAX_BOOTSTRAP_GRID_COLUMNS })
                dispatch({ type: DEFAULT_APPLICATION_LANGUAGE_CURRENT_VALUE })
                dispatch({ type: DEFAULT_APPLICATION_SETTINGS_STATE })
                dispatch({ type: NULL_END_USER_ACCOUNT_STATE })
                dispatch({ type: DEFAULT_CSS_CUSTOM_DESIGN_STATE })
            })
        })
    }
}

export const Lock_Navigation_Bar_Toggler = (value: boolean) => async (dispatch: AppDispatch, getState: () => Current_Redux_State) => {

    let state = getState()
    let end_user_account = state.End_User_Account_State_Reducer

    if (end_user_account.id !== null &&
        end_user_account.token !== null &&
        end_user_account.account_type !== null) {

        let current_language_state = state.Application_Language_State_Reducer

        await axios.put(`${USERS_SERVER_ADDRESS}/Selected/NavLock`, {
            locked: await Encrypt(`${value}`),
            token: end_user_account.token,
            id: await Encrypt(`${end_user_account.id}`),
            account_type: await Encrypt(`${end_user_account.account_type}`),
            login_type: await Encrypt(`${end_user_account.login_type}`),
            language: await Encrypt(`${current_language_state.language}`),
            region: await Encrypt(`${current_language_state.region}`),
            client_time: await Encrypt(`${new Date().getTime() + (new Date().getTimezoneOffset() * 60000)}`),
            location: await Encrypt(`${Intl.DateTimeFormat().resolvedOptions().timeZone}`),
            jwt_issuer_key: await Encrypt(`${JWT_ISSUER_KEY}`),
            jwt_client_key: await Encrypt(`${JWT_CLIENT_KEY}`),
            jwt_client_address: await Encrypt(`${CLIENT_ADDRESS}`),
            user_agent: await Encrypt(`${Get_Device_Information().userAgent}`),
            orientation: await Encrypt(`${Get_Device_Information().orientation_type}`),
            screen_width: await Encrypt(`${Get_Device_Information().screen_width}`),
            screen_height: await Encrypt(`${Get_Device_Information().screen_height}`),
            color_depth: await Encrypt(`${Get_Device_Information().color_depth}`),
            pixel_depth: await Encrypt(`${Get_Device_Information().pixel_depth}`),
            window_width: await Encrypt(`${Get_Device_Information().window_width}`),
            window_height: await Encrypt(`${Get_Device_Information().window_height}`),
            connection_type: await Encrypt(`${Get_Device_Information().effectiveType}`),
            down_link: await Encrypt(`${Get_Device_Information().downlink}`),
            rtt: await Encrypt(`${Get_Device_Information().rtt}`),
            data_saver: await Encrypt(`${Get_Device_Information().saveData}`),
            device_ram_gb: await Encrypt(`${Get_Device_Information().deviceMemory}`),
        }).catch(async (error) => {

            return await new Promise((reject) => {
                error.id = `Selected-NavLock-Failed`
                dispatch({ type: UPDATE_NETWORK_ERROR_STATE, payload: error })
                setTimeout(() => {
                    dispatch({ type: DEFAULT_HOST_ERROR_STATE })
                    dispatch({ type: DEFAULT_NETWORK_ERROR_STATE })
                }, 1000)
                reject(error)
            })

        })
    }

    return await new Promise((resolve) => {
        dispatch({ type: UPDATE_APPLICATION_SETTINGS_NAV_LOCK, payload: { nav_lock: value } })
        resolve(value)
    })
}

export const Update_Display_Name = (value: string) => async (dispatch: AppDispatch, getState: () => Current_Redux_State) => {

    let state = getState()
    let end_user_account = state.End_User_Account_State_Reducer

    if (end_user_account.id !== null &&
        end_user_account.token !== null &&
        end_user_account.account_type !== null) {

        let current_language_state = state.Application_Language_State_Reducer
        
        await axios.put(`${USERS_SERVER_ADDRESS}/Selected/Name`, {
            name: await Encrypt(`${value}`),
            token: end_user_account.token,
            id: await Encrypt(`${end_user_account.id}`),
            account_type: await Encrypt(`${end_user_account.account_type}`),
            login_type: await Encrypt(`${end_user_account.login_type}`),
            language: await Encrypt(`${current_language_state.language}`),
            region: await Encrypt(`${current_language_state.region}`),
            client_time: await Encrypt(`${new Date().getTime() + (new Date().getTimezoneOffset() * 60000)}`),
            location: await Encrypt(`${Intl.DateTimeFormat().resolvedOptions().timeZone}`),
            jwt_issuer_key: await Encrypt(`${JWT_ISSUER_KEY}`),
            jwt_client_key: await Encrypt(`${JWT_CLIENT_KEY}`),
            jwt_client_address: await Encrypt(`${CLIENT_ADDRESS}`),
            user_agent: await Encrypt(`${Get_Device_Information().userAgent}`),
            orientation: await Encrypt(`${Get_Device_Information().orientation_type}`),
            screen_width: await Encrypt(`${Get_Device_Information().screen_width}`),
            screen_height: await Encrypt(`${Get_Device_Information().screen_height}`),
            color_depth: await Encrypt(`${Get_Device_Information().color_depth}`),
            pixel_depth: await Encrypt(`${Get_Device_Information().pixel_depth}`),
            window_width: await Encrypt(`${Get_Device_Information().window_width}`),
            window_height: await Encrypt(`${Get_Device_Information().window_height}`),
            connection_type: await Encrypt(`${Get_Device_Information().effectiveType}`),
            down_link: await Encrypt(`${Get_Device_Information().downlink}`),
            rtt: await Encrypt(`${Get_Device_Information().rtt}`),
            data_saver: await Encrypt(`${Get_Device_Information().saveData}`),
            device_ram_gb: await Encrypt(`${Get_Device_Information().deviceMemory}`),
        }).catch( async (error) => {
            return await new Promise(async (reject) => {
                error.id = `Selected-DisplayName-Failed`
                dispatch({ type: UPDATE_NETWORK_ERROR_STATE, payload: error })
                setTimeout(() => {
                    dispatch({ type: DEFAULT_HOST_ERROR_STATE })
                    dispatch({ type: DEFAULT_NETWORK_ERROR_STATE })
                }, 1000)
                reject(error)
            })
        })
    }

    return await new Promise((resolve) => {
        dispatch({ type: UPDATE_END_USER_ACCOUNT_NAME, payload: { name: `${value}#${(end_user_account && end_user_account.name) ? end_user_account.name.split(`#`)[1] : `error` }` } })
        resolve(value)
    })
}

export const Update_End_User_Avatar = (value: string) => async (dispatch: AppDispatch, getState: () => Current_Redux_State) => {

    let state = getState()
    let end_user_account = state.End_User_Account_State_Reducer

    if (end_user_account.id !== null &&
        end_user_account.token !== null &&
        end_user_account.account_type !== null) {

        let current_language_state = state.Application_Language_State_Reducer

        await axios.put(`${USERS_SERVER_ADDRESS}/Selected/Avatar`, {
            avatar_url_path: await Encrypt(`${value}`),
            token: end_user_account.token,
            id: await Encrypt(`${end_user_account.id}`),
            account_type: await Encrypt(`${end_user_account.account_type}`),
            login_type: await Encrypt(`${end_user_account.login_type}`),
            language: await Encrypt(`${current_language_state.language}`),
            region: await Encrypt(`${current_language_state.region}`),
            client_time: await Encrypt(`${new Date().getTime() + (new Date().getTimezoneOffset() * 60000)}`),
            location: await Encrypt(`${Intl.DateTimeFormat().resolvedOptions().timeZone}`),
            jwt_issuer_key: await Encrypt(`${JWT_ISSUER_KEY}`),
            jwt_client_key: await Encrypt(`${JWT_CLIENT_KEY}`),
            jwt_client_address: await Encrypt(`${CLIENT_ADDRESS}`),
            user_agent: await Encrypt(`${Get_Device_Information().userAgent}`),
            orientation: await Encrypt(`${Get_Device_Information().orientation_type}`),
            screen_width: await Encrypt(`${Get_Device_Information().screen_width}`),
            screen_height: await Encrypt(`${Get_Device_Information().screen_height}`),
            color_depth: await Encrypt(`${Get_Device_Information().color_depth}`),
            pixel_depth: await Encrypt(`${Get_Device_Information().pixel_depth}`),
            window_width: await Encrypt(`${Get_Device_Information().window_width}`),
            window_height: await Encrypt(`${Get_Device_Information().window_height}`),
            connection_type: await Encrypt(`${Get_Device_Information().effectiveType}`),
            down_link: await Encrypt(`${Get_Device_Information().downlink}`),
            rtt: await Encrypt(`${Get_Device_Information().rtt}`),
            data_saver: await Encrypt(`${Get_Device_Information().saveData}`),
            device_ram_gb: await Encrypt(`${Get_Device_Information().deviceMemory}`),
        }).catch(async (error) => {
            return await new Promise((reject) => {
                error.id = `Selected-Avatar-Failed`
                dispatch({ type: UPDATE_NETWORK_ERROR_STATE, payload: error })
                setTimeout(() => {
                    dispatch({ type: DEFAULT_HOST_ERROR_STATE })
                    dispatch({ type: DEFAULT_NETWORK_ERROR_STATE })
                }, 1000)
                reject(error)
            })
        })
    }

    return await new Promise((resolve) => {
        dispatch({
            type: UPDATE_END_USER_ACCOUNT_AVATAR, payload: {
                avatar_url_path: value
            }
        })
        resolve(value)
    })
}

export const Update_End_User_Avatar_Title = (value: string) => async (dispatch: AppDispatch, getState: () => Current_Redux_State) => {

    let state = getState()
    let end_user_account = state.End_User_Account_State_Reducer

    if (end_user_account.id !== null &&
        end_user_account.token !== null &&
        end_user_account.account_type !== null) {

        let current_language_state = state.Application_Language_State_Reducer

        await axios.put(`${USERS_SERVER_ADDRESS}/Selected/Avatar_Title`, {
            avatar_title: await Encrypt(`${value}`),
            token: end_user_account.token,
            id: await Encrypt(`${end_user_account.id}`),
            account_type: await Encrypt(`${end_user_account.account_type}`),
            login_type: await Encrypt(`${end_user_account.login_type}`),
            language: await Encrypt(`${current_language_state.language}`),
            region: await Encrypt(`${current_language_state.region}`),
            client_time: await Encrypt(`${new Date().getTime() + (new Date().getTimezoneOffset() * 60000)}`),
            location: await Encrypt(`${Intl.DateTimeFormat().resolvedOptions().timeZone}`),
            jwt_issuer_key: await Encrypt(`${JWT_ISSUER_KEY}`),
            jwt_client_key: await Encrypt(`${JWT_CLIENT_KEY}`),
            jwt_client_address: await Encrypt(`${CLIENT_ADDRESS}`),
            user_agent: await Encrypt(`${Get_Device_Information().userAgent}`),
            orientation: await Encrypt(`${Get_Device_Information().orientation_type}`),
            screen_width: await Encrypt(`${Get_Device_Information().screen_width}`),
            screen_height: await Encrypt(`${Get_Device_Information().screen_height}`),
            color_depth: await Encrypt(`${Get_Device_Information().color_depth}`),
            pixel_depth: await Encrypt(`${Get_Device_Information().pixel_depth}`),
            window_width: await Encrypt(`${Get_Device_Information().window_width}`),
            window_height: await Encrypt(`${Get_Device_Information().window_height}`),
            connection_type: await Encrypt(`${Get_Device_Information().effectiveType}`),
            down_link: await Encrypt(`${Get_Device_Information().downlink}`),
            rtt: await Encrypt(`${Get_Device_Information().rtt}`),
            data_saver: await Encrypt(`${Get_Device_Information().saveData}`),
            device_ram_gb: await Encrypt(`${Get_Device_Information().deviceMemory}`),
        }).catch(async (error) => {
            return await new Promise((reject) => {
                error.id = `Selected-Avatar-Failed`
                dispatch({ type: UPDATE_NETWORK_ERROR_STATE, payload: error })
                setTimeout(() => {
                    dispatch({ type: DEFAULT_HOST_ERROR_STATE })
                    dispatch({ type: DEFAULT_NETWORK_ERROR_STATE })
                }, 1000)
                reject(error)
            })
        })
    }

    return await new Promise((resolve) => {
        dispatch({ type: UPDATE_END_USER_ACCOUNT_AVATAR_TITLE, payload: { avatar_title: value } })
        resolve(value)
    })
}

export const Update_End_User_Selected_Status = (value: number) => async (dispatch: AppDispatch, getState: ()=> Current_Redux_State) => {
    let end_user_account = getState().End_User_Account_State_Reducer

    if (end_user_account.id !== null &&
        end_user_account.token !== null &&
        end_user_account.account_type !== null
    ) {

        let current_language_state = getState().Application_Language_State_Reducer

        await axios.put(`${USERS_SERVER_ADDRESS}/Selected/Status`, {
            online_status: await Encrypt(`${value}`),
            token: end_user_account.token,
            id: await Encrypt(`${end_user_account.id}`),
            account_type: await Encrypt(`${end_user_account.account_type}`),
            login_type: await Encrypt(`${end_user_account.login_type}`),
            language: await Encrypt(`${current_language_state.language}`),
            region: await Encrypt(`${current_language_state.region}`),
            client_time: await Encrypt(`${new Date().getTime() + (new Date().getTimezoneOffset() * 60000)}`),
            location: await Encrypt(`${Intl.DateTimeFormat().resolvedOptions().timeZone}`),
            jwt_issuer_key: await Encrypt(`${JWT_ISSUER_KEY}`),
            jwt_client_key: await Encrypt(`${JWT_CLIENT_KEY}`),
            jwt_client_address: await Encrypt(`${CLIENT_ADDRESS}`),
            user_agent: await Encrypt(`${Get_Device_Information().userAgent}`),
            orientation: await Encrypt(`${Get_Device_Information().orientation_type}`),
            screen_width: await Encrypt(`${Get_Device_Information().screen_width}`),
            screen_height: await Encrypt(`${Get_Device_Information().screen_height}`),
            color_depth: await Encrypt(`${Get_Device_Information().color_depth}`),
            pixel_depth: await Encrypt(`${Get_Device_Information().pixel_depth}`),
            window_width: await Encrypt(`${Get_Device_Information().window_width}`),
            window_height: await Encrypt(`${Get_Device_Information().window_height}`),
            connection_type: await Encrypt(`${Get_Device_Information().effectiveType}`),
            down_link: await Encrypt(`${Get_Device_Information().downlink}`),
            rtt: await Encrypt(`${Get_Device_Information().rtt}`),
            data_saver: await Encrypt(`${Get_Device_Information().saveData}`),
            device_ram_gb: await Encrypt(`${Get_Device_Information().deviceMemory}`),
        }).catch(async (error) => {
            return await new Promise((reject) => {
                error.id = `Selected-Status-Failed`
                dispatch({ type: UPDATE_NETWORK_ERROR_STATE, payload: error })
                setTimeout(() => {
                    dispatch({ type: DEFAULT_HOST_ERROR_STATE })
                    dispatch({ type: DEFAULT_NETWORK_ERROR_STATE })
                }, 1000)
            })
        })
    }

    return await new Promise((resolve) => {
        dispatch({
            type: UPDATE_END_USER_ACCOUNT_ONLINE_STATUS, payload: {
                online_status: value
            }
        })
        resolve(value)
    })
}

export const Update_End_User_Selected_Custom_Label = (value: string | null) => async (dispatch: AppDispatch, getState: () => Current_Redux_State) => {

    let state = getState()
    let end_user_account = state.End_User_Account_State_Reducer

    if (end_user_account.id !== null &&
        end_user_account.token !== null &&
        end_user_account.account_type !== null) {

        let current_language_state = state.Application_Language_State_Reducer

        await axios.put(`${USERS_SERVER_ADDRESS}/Selected/Custom_Label`, {
            custom_lbl: await Encrypt(`${value}`),
            token: end_user_account.token,
            id: await Encrypt(`${end_user_account.id}`),
            account_type: await Encrypt(`${end_user_account.account_type}`),
            login_type: await Encrypt(`${end_user_account.login_type}`),
            language: await Encrypt(`${current_language_state.language}`),
            region: await Encrypt(`${current_language_state.region}`),
            client_time: await Encrypt(`${new Date().getTime() + (new Date().getTimezoneOffset() * 60000)}`),
            location: await Encrypt(`${Intl.DateTimeFormat().resolvedOptions().timeZone}`),
            jwt_issuer_key: await Encrypt(`${JWT_ISSUER_KEY}`),
            jwt_client_key: await Encrypt(`${JWT_CLIENT_KEY}`),
            jwt_client_address: await Encrypt(`${CLIENT_ADDRESS}`),
            user_agent: await Encrypt(`${Get_Device_Information().userAgent}`),
            orientation: await Encrypt(`${Get_Device_Information().orientation_type}`),
            screen_width: await Encrypt(`${Get_Device_Information().screen_width}`),
            screen_height: await Encrypt(`${Get_Device_Information().screen_height}`),
            color_depth: await Encrypt(`${Get_Device_Information().color_depth}`),
            pixel_depth: await Encrypt(`${Get_Device_Information().pixel_depth}`),
            window_width: await Encrypt(`${Get_Device_Information().window_width}`),
            window_height: await Encrypt(`${Get_Device_Information().window_height}`),
            connection_type: await Encrypt(`${Get_Device_Information().effectiveType}`),
            down_link: await Encrypt(`${Get_Device_Information().downlink}`),
            rtt: await Encrypt(`${Get_Device_Information().rtt}`),
            data_saver: await Encrypt(`${Get_Device_Information().saveData}`),
            device_ram_gb: await Encrypt(`${Get_Device_Information().deviceMemory}`),
        }).catch( async (error) => {
            return await new Promise((reject) => {
                error.id = `Selected-Status-Failed`
                dispatch({ type: UPDATE_NETWORK_ERROR_STATE, payload: error })
                setTimeout(() => {
                    dispatch({ type: DEFAULT_HOST_ERROR_STATE })
                    dispatch({ type: DEFAULT_NETWORK_ERROR_STATE })
                }, 1000)
            })
        })

    }

    return await new Promise((resolve) => {
        dispatch({ type: UPDATE_END_USER_ACCOUNT_CUSTOM_LABEL, payload: { custom_lbl: value } })
        resolve(value)
    })
}