import {
    USERS_SERVER_ADDRESS, UPDATE_NETWORK_ERROR_STATE,
    JWT_ISSUER_KEY,
    JWT_CLIENT_KEY,
    CLIENT_ADDRESS,
    DEFAULT_HOST_ERROR_STATE,
    DEFAULT_NETWORK_ERROR_STATE
} from '@Constants'
import axios from 'axios'

import type { Current_Redux_State } from '@Redux_Thunk/Combined_Reducers'
import type { AppDispatch } from '@Redux_Thunk/Provider'
import { Get_Device_Information, Delay_Execution, Map_GUI_Values_For_Database_Storage } from '@Redux_Thunk/Actions/Misc'

import { Encrypt } from '@AES/Encryptor'
import { Decrypt } from '@AES/Decryptor'
import { JWT_Decoder } from '@JWT/Decoder'

export const Contact_Us_Inquiry = (dto: {
    subject_line: string
    summary: string
}) => async (dispatch: AppDispatch, getState: () => Current_Redux_State) => {

    let state = getState()
    let end_user_account = state.End_User_Account_State_Reducer

    if (end_user_account.id !== null &&
        end_user_account.token !== null &&
        end_user_account.account_type !== null) {

        let current_language_state = state.Application_Language_State_Reducer


        await axios.post(`${USERS_SERVER_ADDRESS}/Report/Contact_Us`, {
            subject_line: dto.subject_line,
            summary: dto.summary,
            id: await Encrypt(`${end_user_account.id}`),
            token: end_user_account.token,
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
        }).catch((error) => {
            error.id = `Contact-Us-Submission-Failed`
            dispatch({ type: UPDATE_NETWORK_ERROR_STATE, payload: error })
        })

        return await new Promise((resolve) => {
            resolve(dto)
        })
    }
}

export const Comment_Inquiry = (value: string) => async (dispatch: AppDispatch, getState: ()=> Current_Redux_State) => {

    let state = getState()
    let end_user_account = state.End_User_Account_State_Reducer

    if (end_user_account.id !== null &&
        end_user_account.token !== null &&
        end_user_account.account_type !== null) {

        let current_language_state = state.Application_Language_State_Reducer

        await axios.post(`${USERS_SERVER_ADDRESS}/Report/Comment_Box`, {
            comment: await Encrypt(`${value}`),
            id: await Encrypt(`${end_user_account.id}`),
            token: end_user_account.token,
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
        }).catch((error) => {
            error.id = `Comment-Box-Submission-Failed`
            dispatch({ type: UPDATE_NETWORK_ERROR_STATE, payload: error })
            setTimeout(() => {
                dispatch({ type: DEFAULT_HOST_ERROR_STATE })
                dispatch({ type: DEFAULT_NETWORK_ERROR_STATE })
            }, 1000)
        })

        return await new Promise((resolve) => {
            resolve(value)
        })
    }
}

export const Send_Discord_Bot_Bug_Inquiry = (dto: {
    bug_location: string
    detail: string
}) => async (dispatch: AppDispatch, getState: () => Current_Redux_State) => {

    let state = getState()
    let end_user_account = state.End_User_Account_State_Reducer

    if (end_user_account.id !== null &&
        end_user_account.token !== null &&
        end_user_account.account_type !== null) {


        let current_language_state = state.Application_Language_State_Reducer

        await axios.post(`${USERS_SERVER_ADDRESS}/Report/Discord_Bot_Bug`, {
            detail: await Encrypt(`${dto.detail}`),
            bug_location: await Encrypt(`${dto.bug_location}`),
            id: await Encrypt(`${end_user_account.id}`),
            token: end_user_account.token,
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
        }).catch((error) => {

            error.id = `Discord-Bug-Submission-Failed`
            dispatch({ type: UPDATE_NETWORK_ERROR_STATE, payload: error })
            setTimeout(() => {
                dispatch({ type: DEFAULT_HOST_ERROR_STATE })
                dispatch({ type: DEFAULT_NETWORK_ERROR_STATE })
            }, 1000)

        })

        return await new Promise((resolve, reject) => {
            resolve(dto)
        })
    }
}

export const Send_Website_Bug_Inquiry = (dto: {
    url: string
    detail: string
}) => async (dispatch: AppDispatch, getState: () => Current_Redux_State) => {

    let state = getState()
    let end_user_account = state.End_User_Account_State_Reducer

    if (end_user_account.id !== null &&
        end_user_account.token !== null &&
        end_user_account.account_type !== null) {

        let current_language_state = getState().Application_Language_State_Reducer

        await axios.post(`${USERS_SERVER_ADDRESS}/Report/Website_Bug`, {
            id: await Encrypt(`${end_user_account.id}`),
            detail: await Encrypt(`${dto.detail}`),
            url: await Encrypt(`${dto.url}`),
            token: end_user_account.token,
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
        }).catch((error) => {
            error.id = `Website-Bug-Submission-Failed`
            dispatch({ type: UPDATE_NETWORK_ERROR_STATE, payload: error })
        })

        return new Promise((resolve, reject) => {
            resolve(``)
        })
    }
}

export const Send_Interal_Broken_Link_Inquiry = (dto: {
    url: string
}) => async (dispatch: AppDispatch, getState: () => Current_Redux_State) => {

    let state = getState()
    let end_user_account = state.End_User_Account_State_Reducer

    if (end_user_account.id !== null &&
        end_user_account.token !== null &&
        end_user_account.account_type !== null) {

        let current_language_state = state.Application_Language_State_Reducer

        await axios.post(`${USERS_SERVER_ADDRESS}/Report/Broken_Link`, {
            url: await Encrypt(`${dto.url}`),
            id: await Encrypt(`${end_user_account.id}`),
            token: end_user_account.token,
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
        }).catch((error) => {
            error.id = `Broken-Link-Submission-Failed`
            dispatch({ type: UPDATE_NETWORK_ERROR_STATE, payload: error })
        })

        return new Promise((resolve) => {
            resolve(dto)
        })
    }
}