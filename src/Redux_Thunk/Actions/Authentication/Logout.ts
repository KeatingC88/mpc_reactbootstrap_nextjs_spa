import {
    USERS_SERVER_ADDRESS, UPDATE_NETWORK_ERROR_STATE, JWT_CLIENT_KEY, JWT_ISSUER_KEY, CLIENT_ADDRESS,
    DEFAULT_APPLICATION_SETTINGS_MAX_BOOTSTRAP_GRID_COLUMNS, DEFAULT_APPLICATION_LANGUAGE_CURRENT_VALUE,
    DEFAULT_APPLICATION_SETTINGS_STATE, DEFAULT_CSS_CUSTOM_DESIGN_STATE, DEFAULT_HOST_ERROR_STATE,
    NULL_END_USER_ACCOUNT_STATE, DEFAULT_NETWORK_ERROR_STATE,
    UPDATE_APPLICATION_WEBSOCKET_CONVERSATIONS_STATE,
    UPDATE_APPLICATION_WEBSOCKET_CONVERSATION_SENT_REQUESTS_STATE,
    UPDATE_APPLICATION_WEBSOCKET_CONVERSATION_SENT_BLOCKS_STATE,
    UPDATE_APPLICATION_WEBSOCKET_CONVERSATION_SENT_APPROVALS_STATE,
    UPDATE_APPLICATION_WEBSOCKET_CONVERSATION_RECEIVED_REQUESTS_STATE,
    UPDATE_APPLICATION_WEBSOCKET_CONVERSATION_RECEIVED_BLOCKS_STATE,
    UPDATE_APPLICATION_WEBSOCKET_CONVERSATION_RECEIVED_APPROVALS_STATE,
    USERS_CACHE_SERVER_ADDRESS
} from '@Constants'

import axios from 'axios'
import { Encrypt } from '@AES/Encryptor'
import { Map_GUI_Values_For_Database_Storage } from '@Redux_Thunk/Actions/Misc'

import type { AppDispatch } from '@Redux_Thunk/Provider'
import type { Current_Redux_State } from '@Redux_Thunk/Combined_Reducers'
import { Get_Device_Information } from '@Redux_Thunk/Actions/Misc'

export const Logout_User_Database = () => async (dispatch: AppDispatch, getState: () => Current_Redux_State) => {

    let state = getState()
    let current_end_user_account_state = state.End_User_Account_State_Reducer
    let current_setting_state = state.Application_Settings_State_Reducer
    let current_language_state = state.Application_Language_State_Reducer

    if (current_end_user_account_state.token) {

        let alignment_values = await Map_GUI_Values_For_Database_Storage({
            alignment: current_setting_state.alignment,
            text_alignment: current_setting_state.text_alignment
        })

        await axios.post(`${USERS_CACHE_SERVER_ADDRESS}/set/user`, {
            token: current_end_user_account_state.token,
            id: Encrypt(`${current_end_user_account_state.id}`),
            online_status: Encrypt(`${current_end_user_account_state.online_status}`),
            custom_lbl: Encrypt(`${current_end_user_account_state.custom_lbl}`),
            name: Encrypt(`${current_end_user_account_state.name}`),
            created_on: Encrypt(`${current_end_user_account_state.created_on}`),
            avatar_url_path: Encrypt(`${current_end_user_account_state.avatar_url_path}`),
            avatar_title: Encrypt(`${current_end_user_account_state.avatar_title}`),
            language_code: Encrypt(`${current_language_state.language}`),
            region_code: Encrypt(`${current_language_state.region}`),
            login_on: Encrypt(`${current_end_user_account_state.login_on}`),
            logout_on: Encrypt(`${current_end_user_account_state.logout_on}`),
            login_type: Encrypt(`EMAIL`),
            account_type: Encrypt(`${current_end_user_account_state.account_type}`),
            email_address: Encrypt(`${current_end_user_account_state.email_address}`),
        })

        await axios.put(`${USERS_SERVER_ADDRESS}/Account/Logout`, {
            token: current_end_user_account_state.token,
            id: await Encrypt(`${current_end_user_account_state.id}`),
            online_status: await Encrypt(`${current_end_user_account_state.online_status}`),
            theme: await Encrypt(`${current_setting_state.theme}`),
            alignment: await Encrypt(`${alignment_values.alignment}`),
            text_alignment: await Encrypt(`${alignment_values.text_alignment}`),
            grid_type: await Encrypt(`${current_setting_state.grid_type}`),
            locked: await Encrypt(`${current_setting_state.nav_lock}`),
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
        }).catch((error) => {
            return new Promise( async (reject) => {
                error.id = `Logout-Failed`
                dispatch({ type: UPDATE_NETWORK_ERROR_STATE, payload: error })
                setTimeout(() => {
                    dispatch({ type: DEFAULT_HOST_ERROR_STATE })
                    dispatch({ type: DEFAULT_NETWORK_ERROR_STATE })
                }, 1)
                dispatch({ type: DEFAULT_APPLICATION_SETTINGS_MAX_BOOTSTRAP_GRID_COLUMNS })
                dispatch({ type: DEFAULT_APPLICATION_LANGUAGE_CURRENT_VALUE })
                dispatch({ type: DEFAULT_APPLICATION_SETTINGS_STATE })
                dispatch({ type: NULL_END_USER_ACCOUNT_STATE })
                dispatch({ type: DEFAULT_CSS_CUSTOM_DESIGN_STATE })
                dispatch({ type: UPDATE_APPLICATION_WEBSOCKET_CONVERSATIONS_STATE, payload: { conversations: {} } })
                dispatch({ type: UPDATE_APPLICATION_WEBSOCKET_CONVERSATION_SENT_REQUESTS_STATE, payload: { conversation_sent_requests: [] } })
                dispatch({ type: UPDATE_APPLICATION_WEBSOCKET_CONVERSATION_SENT_APPROVALS_STATE, payload: { conversation_sent_approvals: [] } })
                dispatch({ type: UPDATE_APPLICATION_WEBSOCKET_CONVERSATION_SENT_BLOCKS_STATE, payload: { conversation_sent_blocks: [] } })
                dispatch({ type: UPDATE_APPLICATION_WEBSOCKET_CONVERSATION_RECEIVED_REQUESTS_STATE, payload: { conversation_received_requests: [] } })
                dispatch({ type: UPDATE_APPLICATION_WEBSOCKET_CONVERSATION_RECEIVED_BLOCKS_STATE, payload: { conversation_received_blocks: [] } })
                dispatch({ type: UPDATE_APPLICATION_WEBSOCKET_CONVERSATION_RECEIVED_APPROVALS_STATE, payload: { conversation_received_approvals: [] } })
                reject(error)
            })
        }).then( async () => {

            return await new Promise(async (resolve) => {
                dispatch({ type: DEFAULT_APPLICATION_SETTINGS_MAX_BOOTSTRAP_GRID_COLUMNS })
                dispatch({ type: DEFAULT_APPLICATION_LANGUAGE_CURRENT_VALUE })
                dispatch({ type: DEFAULT_APPLICATION_SETTINGS_STATE })
                dispatch({ type: NULL_END_USER_ACCOUNT_STATE })
                dispatch({ type: DEFAULT_CSS_CUSTOM_DESIGN_STATE })
                dispatch({ type: UPDATE_APPLICATION_WEBSOCKET_CONVERSATIONS_STATE, payload: { conversations: {} } })
                dispatch({ type: UPDATE_APPLICATION_WEBSOCKET_CONVERSATION_SENT_REQUESTS_STATE, payload: { conversation_sent_requests: [] } })
                dispatch({ type: UPDATE_APPLICATION_WEBSOCKET_CONVERSATION_SENT_APPROVALS_STATE, payload: { conversation_sent_approvals: [] } })
                dispatch({ type: UPDATE_APPLICATION_WEBSOCKET_CONVERSATION_SENT_BLOCKS_STATE, payload: { conversation_sent_blocks: [] } })
                dispatch({ type: UPDATE_APPLICATION_WEBSOCKET_CONVERSATION_RECEIVED_REQUESTS_STATE, payload: { conversation_received_requests: [] } })
                dispatch({ type: UPDATE_APPLICATION_WEBSOCKET_CONVERSATION_RECEIVED_BLOCKS_STATE, payload: { conversation_received_blocks: [] } })
                dispatch({ type: UPDATE_APPLICATION_WEBSOCKET_CONVERSATION_RECEIVED_APPROVALS_STATE, payload: { conversation_received_approvals: [] } })
            })
        })
    }
}