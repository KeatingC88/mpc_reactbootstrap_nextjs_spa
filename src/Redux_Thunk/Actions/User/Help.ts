import {
    UPDATE_NETWORK_ERROR_STATE,
    JWT_ISSUER_KEY,
    JWT_CLIENT_KEY,
    CLIENT_ADDRESS,
    DEFAULT_HOST_ERROR_STATE,
    DEFAULT_NETWORK_ERROR_STATE
} from '@Constants'
import axios from 'axios'

import type { Current_Redux_State } from '@Redux_Thunk/Combined_Reducers'
import type { AppDispatch } from '@Redux_Thunk/Provider'
import { Get_Device_Information } from '@Redux_Thunk/Actions/Misc'

import { Encrypt } from '@AES/Encryptor'

export const Contact_Us_Inquiry = (dto: {
    subject_line: string
    summary: string
}) => async (dispatch: AppDispatch, getState: () => Current_Redux_State) => {

    let state = getState()
    let end_user_account = state.End_User_Account_State_Reducer
    let current_language_state = state.Application_Language_State_Reducer

    if (end_user_account.account_type !== 0)
        await axios.post(`/api/user/help/contact_us`, {
            subject_line: dto.subject_line,
            summary: dto.summary,
            id: `${end_user_account.id}`,
            account_type: `${end_user_account.account_type}`,
            login_type: `${end_user_account.login_type}`,
            language: `${current_language_state.language}`,
            region: `${current_language_state.region}`,
            client_time: `${new Date().getTime() + (new Date().getTimezoneOffset() * 60000)}`,
            location: `${Intl.DateTimeFormat().resolvedOptions().timeZone}`,
            jwt_issuer_key: `${JWT_ISSUER_KEY}`,
            jwt_client_key: `${JWT_CLIENT_KEY}`,
            jwt_client_address: `${CLIENT_ADDRESS}`,
            user_agent: `${Get_Device_Information().userAgent}`,
            orientation: `${Get_Device_Information().orientation_type}`,
            screen_width: `${Get_Device_Information().screen_width}`,
            screen_height: `${Get_Device_Information().screen_height}`,
            color_depth: `${Get_Device_Information().color_depth}`,
            pixel_depth: `${Get_Device_Information().pixel_depth}`,
            window_width: `${Get_Device_Information().window_width}`,
            window_height: `${Get_Device_Information().window_height}`,
            connection_type: `${Get_Device_Information().effectiveType}`,
            down_link: `${Get_Device_Information().downlink}`,
            rtt: `${Get_Device_Information().rtt}`,
            data_saver: `${Get_Device_Information().saveData}`,
            device_ram_gb: `${Get_Device_Information().deviceMemory}`,
        }).catch( async (error) => {
            return await new Promise((reject) => {
                error.id = `Contact-Us-Submission-Failed`
                dispatch({ type: UPDATE_NETWORK_ERROR_STATE, payload: error })
                setTimeout(() => {
                    dispatch({ type: DEFAULT_HOST_ERROR_STATE })
                    dispatch({ type: DEFAULT_NETWORK_ERROR_STATE })
                }, 1)
                reject(error)
            })
        }).then(async(response) => {
            return await new Promise((resolve) => {
                resolve(resolve)
            })
        })
}

export const Comment_Inquiry = (value: string) => async (dispatch: AppDispatch, getState: ()=> Current_Redux_State) => {
    let state = getState()
    let end_user_account = state.End_User_Account_State_Reducer
    let current_language_state = state.Application_Language_State_Reducer

    if (end_user_account.account_type !== 0)
        await axios.post(`/api/user/help/comment_box`, {
            comment: `${value}`,
            id: `${end_user_account.id}`,
            account_type: `${end_user_account.account_type}`,
            login_type: `${end_user_account.login_type}`,
            language: `${current_language_state.language}`,
            region: `${current_language_state.region}`,
            client_time: `${new Date().getTime() + (new Date().getTimezoneOffset() * 60000)}`,
            location: `${Intl.DateTimeFormat().resolvedOptions().timeZone}`,
            jwt_issuer_key: `${JWT_ISSUER_KEY}`,
            jwt_client_key: `${JWT_CLIENT_KEY}`,
            jwt_client_address: `${CLIENT_ADDRESS}`,
            user_agent: `${Get_Device_Information().userAgent}`,
            orientation: `${Get_Device_Information().orientation_type}`,
            screen_width: `${Get_Device_Information().screen_width}`,
            screen_height: `${Get_Device_Information().screen_height}`,
            color_depth: `${Get_Device_Information().color_depth}`,
            pixel_depth: `${Get_Device_Information().pixel_depth}`,
            window_width: `${Get_Device_Information().window_width}`,
            window_height: `${Get_Device_Information().window_height}`,
            connection_type: `${Get_Device_Information().effectiveType}`,
            down_link: `${Get_Device_Information().downlink}`,
            rtt: `${Get_Device_Information().rtt}`,
            data_saver: `${Get_Device_Information().saveData}`,
            device_ram_gb: `${Get_Device_Information().deviceMemory}`,
        }).catch( async (error) => {
            return await new Promise((reject) => {
                error.id = `Comment-Box-Submission-Failed`
                dispatch({ type: UPDATE_NETWORK_ERROR_STATE, payload: error })
                setTimeout(() => {
                    dispatch({ type: DEFAULT_HOST_ERROR_STATE })
                    dispatch({ type: DEFAULT_NETWORK_ERROR_STATE })
                }, 1)
                reject(error)
            })
        }).then(async(response) => {
            return await new Promise((resolve) => {
                resolve(response)
            })
        })
}

export const Send_Discord_Bot_Bug_Inquiry = (dto: {
    bug_location: string
    detail: string
}) => async (dispatch: AppDispatch, getState: () => Current_Redux_State) => {

    let state = getState()
    let end_user_account = state.End_User_Account_State_Reducer
    let current_language_state = state.Application_Language_State_Reducer

    if (end_user_account.account_type !== 0)
        await axios.post(`/api/user/help/discord_bot_bug`, {
            detail: Encrypt(`${dto.detail}`),
            bug_location: Encrypt(`${dto.bug_location}`),
            id: Encrypt(`${end_user_account.id}`),
            account_type: Encrypt(`${end_user_account.account_type}`),
            login_type: Encrypt(`${end_user_account.login_type}`),
            language: Encrypt(`${current_language_state.language}`),
            region: Encrypt(`${current_language_state.region}`),
            client_time: Encrypt(`${new Date().getTime() + (new Date().getTimezoneOffset() * 60000)}`),
            location: Encrypt(`${Intl.DateTimeFormat().resolvedOptions().timeZone}`),
            jwt_issuer_key: Encrypt(`${JWT_ISSUER_KEY}`),
            jwt_client_key: Encrypt(`${JWT_CLIENT_KEY}`),
            jwt_client_address: Encrypt(`${CLIENT_ADDRESS}`),
            user_agent: Encrypt(`${Get_Device_Information().userAgent}`),
            orientation: Encrypt(`${Get_Device_Information().orientation_type}`),
            screen_width: Encrypt(`${Get_Device_Information().screen_width}`),
            screen_height: Encrypt(`${Get_Device_Information().screen_height}`),
            color_depth: Encrypt(`${Get_Device_Information().color_depth}`),
            pixel_depth: Encrypt(`${Get_Device_Information().pixel_depth}`),
            window_width: Encrypt(`${Get_Device_Information().window_width}`),
            window_height: Encrypt(`${Get_Device_Information().window_height}`),
            connection_type: Encrypt(`${Get_Device_Information().effectiveType}`),
            down_link: Encrypt(`${Get_Device_Information().downlink}`),
            rtt: Encrypt(`${Get_Device_Information().rtt}`),
            data_saver: Encrypt(`${Get_Device_Information().saveData}`),
            device_ram_gb: Encrypt(`${Get_Device_Information().deviceMemory}`),
        }).catch(async(error) => {
            return await new Promise((reject) => {
                error.id = `Discord-Bug-Submission-Failed`
                dispatch({ type: UPDATE_NETWORK_ERROR_STATE, payload: error })
                setTimeout(() => {
                    dispatch({ type: DEFAULT_HOST_ERROR_STATE })
                    dispatch({ type: DEFAULT_NETWORK_ERROR_STATE })
                }, 1000)
                reject(error)
            })
        }).then(async(response) => {
            return await new Promise((resolve) => {
                resolve(dto)
            })
        })
}

export const Send_Website_Bug_Inquiry = (dto: {
    url: string
    detail: string
}) => async (dispatch: AppDispatch, getState: () => Current_Redux_State) => {

    let state = getState()
    let end_user_account = state.End_User_Account_State_Reducer
    let current_language_state = getState().Application_Language_State_Reducer

    if (end_user_account.account_type !== 0)
        await axios.post(`/api/user/help/website_bug`, {
            id: Encrypt(`${end_user_account.id}`),
            detail: Encrypt(`${dto.detail}`),
            url: Encrypt(`${dto.url}`),
            account_type: Encrypt(`${end_user_account.account_type}`),
            login_type: Encrypt(`${end_user_account.login_type}`),
            language: Encrypt(`${current_language_state.language}`),
            region: Encrypt(`${current_language_state.region}`),
            client_time: Encrypt(`${new Date().getTime() + (new Date().getTimezoneOffset() * 60000)}`),
            location: Encrypt(`${Intl.DateTimeFormat().resolvedOptions().timeZone}`),
            jwt_issuer_key: Encrypt(`${JWT_ISSUER_KEY}`),
            jwt_client_key: Encrypt(`${JWT_CLIENT_KEY}`),
            jwt_client_address: Encrypt(`${CLIENT_ADDRESS}`),
            user_agent: Encrypt(`${Get_Device_Information().userAgent}`),
            orientation: Encrypt(`${Get_Device_Information().orientation_type}`),
            screen_width: Encrypt(`${Get_Device_Information().screen_width}`),
            screen_height: Encrypt(`${Get_Device_Information().screen_height}`),
            color_depth: Encrypt(`${Get_Device_Information().color_depth}`),
            pixel_depth: Encrypt(`${Get_Device_Information().pixel_depth}`),
            window_width: Encrypt(`${Get_Device_Information().window_width}`),
            window_height: Encrypt(`${Get_Device_Information().window_height}`),
            connection_type: Encrypt(`${Get_Device_Information().effectiveType}`),
            down_link: Encrypt(`${Get_Device_Information().downlink}`),
            rtt: Encrypt(`${Get_Device_Information().rtt}`),
            data_saver: Encrypt(`${Get_Device_Information().saveData}`),
            device_ram_gb: await Encrypt(`${Get_Device_Information().deviceMemory}`),
        }).catch( async (error) => {
            return await new Promise((reject) => {
                error.id = `Website-Bug-Submission-Failed`
                dispatch({ type: UPDATE_NETWORK_ERROR_STATE, payload: error })
                setTimeout(() => {
                    dispatch({ type: DEFAULT_HOST_ERROR_STATE })
                    dispatch({ type: DEFAULT_NETWORK_ERROR_STATE })
                }, 1000)
                reject(error)
            })
        }).then(async (response: any) => {
            return await new Promise((resolve) => {
                resolve(response.status)
            })
        })
}

export const Send_Interal_Broken_Link_Inquiry = (dto: {
    url: string
}) => async (dispatch: AppDispatch, getState: () => Current_Redux_State) => {

    let state = getState()
    let end_user_account = state.End_User_Account_State_Reducer
    let current_language_state = state.Application_Language_State_Reducer

    if (end_user_account.account_type !== 0)
        await axios.post(`/api/user/help/broken_link`, {
            url: `${dto.url}`,
            id: `${end_user_account.id}`,
            account_type: `${end_user_account.account_type}`,
            login_type: `${end_user_account.login_type}`,
            language: `${current_language_state.language}`,
            region: `${current_language_state.region}`,
            client_time: `${new Date().getTime() + (new Date().getTimezoneOffset() * 60000)}`,
            location: `${Intl.DateTimeFormat().resolvedOptions().timeZone}`,
            jwt_issuer_key: `${JWT_ISSUER_KEY}`,
            jwt_client_key: `${JWT_CLIENT_KEY}`,
            jwt_client_address: `${CLIENT_ADDRESS}`,
            user_agent: `${Get_Device_Information().userAgent}`,
            orientation: `${Get_Device_Information().orientation_type}`,
            screen_width: `${Get_Device_Information().screen_width}`,
            screen_height: `${Get_Device_Information().screen_height}`,
            color_depth: `${Get_Device_Information().color_depth}`,
            pixel_depth: `${Get_Device_Information().pixel_depth}`,
            window_width: `${Get_Device_Information().window_width}`,
            window_height: `${Get_Device_Information().window_height}`,
            connection_type: `${Get_Device_Information().effectiveType}`,
            down_link: `${Get_Device_Information().downlink}`,
            rtt: `${Get_Device_Information().rtt}`,
            data_saver: `${Get_Device_Information().saveData}`,
            device_ram_gb: `${Get_Device_Information().deviceMemory}`,
        }).catch( async (error) => {
            return await new Promise((reject) => {
                error.id = `Broken-Link-Submission-Failed`
                dispatch({ type: UPDATE_NETWORK_ERROR_STATE, payload: error })
                setTimeout(() => {
                    dispatch({ type: DEFAULT_HOST_ERROR_STATE })
                    dispatch({ type: DEFAULT_NETWORK_ERROR_STATE })
                }, 1)
                reject(error)
            })
        }).then((response: any) => {
            return new Promise((resolve) => {
                resolve(response.status)
            })
        })
}