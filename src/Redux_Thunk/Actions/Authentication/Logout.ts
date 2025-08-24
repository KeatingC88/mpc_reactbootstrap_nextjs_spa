import {
    JWT_CLIENT_KEY,
    JWT_ISSUER_KEY,
    CLIENT_ADDRESS,
    DEFAULT_APPLICATION_SETTINGS_MAX_BOOTSTRAP_GRID_COLUMNS,
    DEFAULT_APPLICATION_LANGUAGE_CURRENT_VALUE,
    DEFAULT_APPLICATION_SETTINGS_STATE,
    DEFAULT_CSS_CUSTOM_DESIGN_STATE,
    DEFAULT_HOST_ERROR_STATE,
    DEFAULT_NETWORK_ERROR_STATE,
    NULL_END_USER_ACCOUNT_STATE,
    NULL_END_USER_TWITCH_ACCOUNT_STATE,
    UPDATE_NETWORK_ERROR_STATE,
    UPDATE_APPLICATION_WEBSOCKET_CONVERSATIONS_STATE,
    UPDATE_APPLICATION_WEBSOCKET_CONVERSATION_SENT_REQUESTS_STATE,
    UPDATE_APPLICATION_WEBSOCKET_CONVERSATION_SENT_BLOCKS_STATE,
    UPDATE_APPLICATION_WEBSOCKET_CONVERSATION_SENT_APPROVALS_STATE,
    UPDATE_APPLICATION_WEBSOCKET_CONVERSATION_RECEIVED_REQUESTS_STATE,
    UPDATE_APPLICATION_WEBSOCKET_CONVERSATION_RECEIVED_BLOCKS_STATE,
    UPDATE_APPLICATION_WEBSOCKET_CONVERSATION_RECEIVED_APPROVALS_STATE
} from '@Constants'

import axios from 'axios'
import { Map_GUI_Values_For_Database_Storage } from '@Redux_Thunk/Actions/Misc'

import type { AppDispatch } from '@Redux_Thunk/Provider'
import type { Current_Redux_State } from '@Redux_Thunk/Combined_Reducers'
import { Get_Device_Information } from '@Redux_Thunk/Actions/Misc'

export const Logout_User_Database = () => async (dispatch: AppDispatch, getState: () => Current_Redux_State) => {

    let state = getState()
    let current_end_user_account_state = state.End_User_Account_State_Reducer
    let current_setting_state = state.Application_Settings_State_Reducer
    let current_language_state = state.Application_Language_State_Reducer

    let alignment_values = await Map_GUI_Values_For_Database_Storage({
        alignment: current_setting_state.alignment,
        text_alignment: current_setting_state.text_alignment
    })

    if (current_end_user_account_state.id !== null) {

        await axios.put(`/api/authentication/logout`, {
            id: current_end_user_account_state.id,
            online_status: current_end_user_account_state.online_status,
            theme: current_setting_state.theme,
            alignment: alignment_values.alignment,
            text_alignment: alignment_values.text_alignment,
            grid_type: current_setting_state.grid_type,
            locked: current_setting_state.nav_lock,
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

    dispatch({ type: DEFAULT_APPLICATION_SETTINGS_MAX_BOOTSTRAP_GRID_COLUMNS })
    dispatch({ type: DEFAULT_APPLICATION_LANGUAGE_CURRENT_VALUE })
    dispatch({ type: DEFAULT_APPLICATION_SETTINGS_STATE })
    dispatch({ type: NULL_END_USER_ACCOUNT_STATE })
    dispatch({ type: NULL_END_USER_TWITCH_ACCOUNT_STATE })
    dispatch({ type: DEFAULT_CSS_CUSTOM_DESIGN_STATE })
    dispatch({ type: UPDATE_APPLICATION_WEBSOCKET_CONVERSATIONS_STATE, payload: { conversations: {} } })
    dispatch({ type: UPDATE_APPLICATION_WEBSOCKET_CONVERSATION_SENT_REQUESTS_STATE, payload: { conversation_sent_requests: [] } })
    dispatch({ type: UPDATE_APPLICATION_WEBSOCKET_CONVERSATION_SENT_APPROVALS_STATE, payload: { conversation_sent_approvals: [] } })
    dispatch({ type: UPDATE_APPLICATION_WEBSOCKET_CONVERSATION_SENT_BLOCKS_STATE, payload: { conversation_sent_blocks: [] } })
    dispatch({ type: UPDATE_APPLICATION_WEBSOCKET_CONVERSATION_RECEIVED_REQUESTS_STATE, payload: { conversation_received_requests: [] } })
    dispatch({ type: UPDATE_APPLICATION_WEBSOCKET_CONVERSATION_RECEIVED_BLOCKS_STATE, payload: { conversation_received_blocks: [] } })
    dispatch({ type: UPDATE_APPLICATION_WEBSOCKET_CONVERSATION_RECEIVED_APPROVALS_STATE, payload: { conversation_received_approvals: [] } })
}