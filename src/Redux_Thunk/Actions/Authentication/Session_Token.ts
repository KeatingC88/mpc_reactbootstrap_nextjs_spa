import {
    UPDATE_NETWORK_ERROR_STATE,
    JWT_CLIENT_KEY,
    JWT_ISSUER_KEY,
    CLIENT_ADDRESS,
    DEFAULT_HOST_ERROR_STATE,
    DEFAULT_NETWORK_ERROR_STATE,
} from '@Constants'

import axios from 'axios'

import type { AppDispatch } from '@Redux_Thunk/Provider'
import type { Current_Redux_State } from '@Redux_Thunk/Combined_Reducers'
import { Get_Device_Information } from '@Redux_Thunk/Actions/Misc'

export const Renew_Session_Token = () => async (dispatch: AppDispatch, getState: () => Current_Redux_State) => {

    let state = getState()
    let current_end_user_account_state = state.End_User_Account_State_Reducer
    let current_language_state = state.Application_Language_State_Reducer

    if (current_end_user_account_state.id !== null) {

        await axios.put(`/api/authentication/renew_token`, {
            id: current_end_user_account_state.id,
            language: current_language_state.language,
            region: current_language_state.region,
            client_time: new Date().getTime() + (new Date().getTimezoneOffset() * 60000),
            location: Intl.DateTimeFormat().resolvedOptions().timeZone,
            jwt_issuer_key: JWT_ISSUER_KEY,
            jwt_client_key: JWT_CLIENT_KEY,
            jwt_client_address: CLIENT_ADDRESS,
            user_agent: Get_Device_Information().userAgent,
            orientation: Get_Device_Information().orientation_type,
            screen_width: Get_Device_Information().screen_width,
            screen_height: Get_Device_Information().screen_height,
            color_depth: Get_Device_Information().color_depth,
            pixel_depth: Get_Device_Information().pixel_depth,
            window_width: Get_Device_Information().window_width,
            window_height: Get_Device_Information().window_height,
            connection_type: Get_Device_Information().effectiveType,
            down_link: Get_Device_Information().downlink,
            rtt: Get_Device_Information().rtt,
            data_saver: Get_Device_Information().saveData,
            device_ram_gb: Get_Device_Information().deviceMemory
        }, {
            withCredentials: true
        }).catch((error) => {
            return new Promise(async (reject) => {
                error.id = `Logout-Failed`
                dispatch({ type: UPDATE_NETWORK_ERROR_STATE, payload: error })
                setTimeout(() => {
                    dispatch({ type: DEFAULT_HOST_ERROR_STATE })
                    dispatch({ type: DEFAULT_NETWORK_ERROR_STATE })
                }, 1)
                reject(error)
            })
        })
    }
}

export const New_Twitch_Session_Token = () => async (dispatch: AppDispatch, getState: () => Current_Redux_State) => {

    let state = getState()
    let current_end_user_account_state = state.End_User_Account_State_Reducer
    let current_language_state = state.Application_Language_State_Reducer
    let current_twitch_state = state.End_User_Twitch_Account_State_Reducer

    if (current_end_user_account_state.id !== null) {

        await axios.put(`/api/authentication/new_token/twitch`, {
            id: current_end_user_account_state.id,
            email_address: current_twitch_state.email_address,
            twtich_id: current_twitch_state.id,
            language: current_language_state.language,
            region: current_language_state.region,
            client_time: new Date().getTime() + (new Date().getTimezoneOffset() * 60000),
            location: Intl.DateTimeFormat().resolvedOptions().timeZone,
            jwt_issuer_key: JWT_ISSUER_KEY,
            jwt_client_key: JWT_CLIENT_KEY,
            jwt_client_address: CLIENT_ADDRESS,
            user_agent: Get_Device_Information().userAgent,
            orientation: Get_Device_Information().orientation_type,
            screen_width: Get_Device_Information().screen_width,
            screen_height: Get_Device_Information().screen_height,
            color_depth: Get_Device_Information().color_depth,
            pixel_depth: Get_Device_Information().pixel_depth,
            window_width: Get_Device_Information().window_width,
            window_height: Get_Device_Information().window_height,
            connection_type: Get_Device_Information().effectiveType,
            down_link: Get_Device_Information().downlink,
            rtt: Get_Device_Information().rtt,
            data_saver: Get_Device_Information().saveData,
            device_ram_gb: Get_Device_Information().deviceMemory
        }, {
            withCredentials: true
        }).catch((error) => {
            return new Promise(async (reject) => {
                error.id = `Logout-Failed`
                dispatch({ type: UPDATE_NETWORK_ERROR_STATE, payload: error })
                setTimeout(() => {
                    dispatch({ type: DEFAULT_HOST_ERROR_STATE })
                    dispatch({ type: DEFAULT_NETWORK_ERROR_STATE })
                }, 1)
                reject(error)
            })
        })
    }
}